package com.ssafy.ditto.domain.liveroom.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.service.LectureService;
import com.ssafy.ditto.domain.liveroom.dto.ConnectionResponse;
import com.ssafy.ditto.domain.liveroom.dto.RecordResponse;
import com.ssafy.ditto.domain.liveroom.service.LearningService;
import com.ssafy.ditto.global.dto.ResponseDto;
import io.openvidu.java.client.*;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// json
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.stream.JsonReader;
import java.io.FileReader;

// unzip
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;


@RestController
@RequestMapping("/sessions")
public class SessionController {
	public static final Logger logger = LoggerFactory.getLogger(SessionController.class);

	// OpenVidu object as entrypoint of the SDK
	private OpenVidu openVidu;
	private LearningService learningService;
	private LectureService lectureService;

	// Collection to pair session names and OpenVidu Session objects
	private Map<Integer, Session> lectureSessions = new ConcurrentHashMap<>();
	// Collection to pair session names and tokens (the inner Map pairs tokens and role associated)
	private Map<String, Map<Integer, ConnectionResponse>> sessionUserToken = new ConcurrentHashMap<>();
	// Collection to pair session names and recording objects
	private Map<String, Boolean> sessionRecordings = new ConcurrentHashMap<>();

	// URL where our OpenVidu server is listening
	private String OPENVIDU_URL;
	// Secret shared with our OpenVidu server
	private String SECRET;

	@Autowired
	public SessionController(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl,
							 LearningService learningService,LectureService lectureService) {
		this.SECRET = secret;
		this.OPENVIDU_URL = openviduUrl;
		this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
		this.learningService = learningService;
		this.lectureService = lectureService;
	}

	// 생성
	@PostMapping("/{lectureId}")
	public ResponseDto<Void> createLiveRoom(@PathVariable int lectureId, @RequestParam Integer userId) {
		logger.info("*** create 메소드 호출");
		boolean isValidTeacher = lectureService.isValidTeacher(userId,lectureId);
		if (!isValidTeacher) {
			return ResponseDto.of(HttpStatus.FORBIDDEN.value(), "사용자가 교사 역할이 아닙니다.");
		}

		if (lectureSessions.containsKey(lectureId)) {
			// 이미 유효한 세션이 존재하는 경우
			return ResponseDto.of(HttpStatus.OK.value(), "이미 라이브 방송 링크가 생성되어 있습니다.");
		} else {
			try {
				logger.info("*** createSession 메소드 호출");
				Session session = this.openVidu.createSession();
				this.lectureSessions.put(lectureId, session);
				this.sessionUserToken.put(session.getSessionId(), new HashMap<>());

				showMap();

				return ResponseDto.of(HttpStatus.OK.value(), "라이브 방송 링크가 생성되었습니다.");
			} catch (OpenViduJavaClientException e) {
				e.printStackTrace();
				return ResponseDto.of(HttpStatus.INTERNAL_SERVER_ERROR.value(), "OpenVidu 클라이언트 오류 발생: " + e.getMessage());
			} catch (OpenViduHttpException e) {
				e.printStackTrace();
				return ResponseDto.of(HttpStatus.INTERNAL_SERVER_ERROR.value(), "OpenVidu HTTP 오류 발생: " + e.getMessage());
			} catch (Exception e) {
				e.printStackTrace();
				return ResponseDto.of(HttpStatus.INTERNAL_SERVER_ERROR.value(), "세션 생성 중 알 수 없는 오류가 발생했습니다: " + e.getMessage());
			}
		}
	}


	/*******************/
	/*** Session API ***/
	/*******************/
	// 수강 중인 수강생, 주최하는 강사에게 토큰 발급
	@PostMapping("/{lectureId}/get-token")
	public ResponseEntity<?> getToken(@PathVariable int lectureId, @RequestParam Integer userId,
									  @RequestBody(required = false) Map<String, Object> params) {
		// 사용자의 역할을 결정
		String roleType;
		if (learningService.isValidUser(userId, lectureId)) {
			roleType = "student";
		} else if (lectureService.isValidTeacher(userId, lectureId)) {
			roleType = "teacher";
		} else {
			JSONObject responseJson = new JSONObject();
			responseJson.put("error", "유효하지 않은 사용자입니다.");
			logger.warn("유효하지 않은 사용자: userId={}, lectureId={}", userId, lectureId);
			return new ResponseEntity<>(responseJson, HttpStatus.FORBIDDEN);
		}

		OpenViduRole role;
		if ("teacher".equals(roleType)) {
			role = OpenViduRole.MODERATOR;
			logger.info("사용자 역할: 강사 (MODERATOR)");
		} else {
			role = OpenViduRole.SUBSCRIBER;
			logger.info("사용자 역할: 수강생 (SUBSCRIBER)");
		}

		// serverData와 역할을 사용하여 connectionProperties 객체 생성
		ConnectionProperties properties = new ConnectionProperties.Builder()
				.type(ConnectionType.WEBRTC)
				.role(role)
				.data("user-data")
				.build();

		JSONObject responseJson = new JSONObject();

		// 강의 ID로 세션을 조회
		Session session = this.lectureSessions.get(lectureId);
		if (session != null) {
			// 세션이 이미 존재함
			logger.info("기존 세션 존재: lectureId={}", lectureId);
			try {
				// 방금 생성한 connectionProperties로 새 토큰 생성
				String token = session.createConnection(properties).getToken();
				logger.info("토큰 생성 완료: token={}", token);

				ConnectionResponse resp = new ConnectionResponse();
				resp.setToken(token);
				resp.setRole(role);

				// 새 토큰을 저장하는 컬렉션 업데이트
				this.sessionUserToken.get(session.getSessionId()).put(userId, resp);

				// 토큰으로 응답 준비
				responseJson.put("token", token);

				return new ResponseEntity<>(responseJson, HttpStatus.OK);
			} catch (OpenViduJavaClientException e1) {
				logger.error("OpenViduJavaClientException 발생: {}", e1.getMessage());
				// 내부 오류가 발생하면 오류 메시지를 생성하여 클라이언트에게 반환
				return getErrorResponse(e1);
			} catch (OpenViduHttpException e2) {
				if (404 == e2.getStatus()) {
					logger.warn("유효하지 않은 sessionId: lectureId={}", lectureId);
					// 유효하지 않은 sessionId (사용자가 예기치 않게 떠남). 세션 객체가 더 이상 유효하지 않음.
					// 컬렉션을 정리하고 새로운 세션으로 계속 진행
					e2.printStackTrace();
					this.lectureSessions.remove(lectureId);
					this.sessionUserToken.remove(session.getSessionId());
				}
			}
		} else {
			logger.warn("세션을 찾을 수 없음: lectureId={}", lectureId);
			responseJson.put("error", "세션을 찾을 수 없습니다.");
			return new ResponseEntity<>(responseJson, HttpStatus.NOT_FOUND);
		}

		// 세션이 없는 경우
		responseJson.put("error", "세션을 찾을 수 없습니다.");
		return new ResponseEntity<>(responseJson, HttpStatus.NOT_FOUND);
	}


	@PostMapping("/{lectureId}/remove-user")
	public ResponseDto<?> removeUser(@PathVariable int lectureId, @RequestParam Integer userId,
									 @RequestBody(required = false) Map<String, Object> params) throws Exception {

		// 강의 ID로 세션을 조회
		Session session = this.lectureSessions.get(lectureId);
		if (session == null) {
			// 세션이 존재하지 않음
			logger.error("세션이 존재하지 않음: lectureId={}", lectureId);
			return ResponseDto.of(HttpStatus.NOT_FOUND.value(), "세션이 존재하지 않습니다.");
		}

		// 세션 ID로 사용자 토큰 조회
		Map<Integer, ConnectionResponse> userTokens = this.sessionUserToken.get(session.getSessionId());
		if (userTokens == null || !userTokens.containsKey(userId)) {
			// 유효하지 않은 사용자 ID 또는 토큰이 존재하지 않음
			logger.error("유효하지 않은 사용자 ID 또는 토큰이 존재하지 않음: userId={}, sessionId={}", userId, session.getSessionId());
			return ResponseDto.of(HttpStatus.NOT_FOUND.value(), "유효하지 않은 사용자 또는 토큰이 존재하지 않습니다.");
		}

		String token = userTokens.get(userId).getToken();
		// 토큰이 존재하는 경우
		if (token != null) {
			// 사용자가 세션을 떠남
			userTokens.remove(userId);
			if (userTokens.isEmpty()) {
				// 마지막 사용자가 떠남: 세션을 제거해야 함
				this.lectureSessions.remove(lectureId);
				this.sessionUserToken.remove(session.getSessionId());
				logger.info("마지막 사용자가 떠나서 세션이 제거됨: lectureId={}", lectureId);
			}
			logger.info("사용자가 세션을 떠남: userId={}, sessionId={}", userId, session.getSessionId());
			return ResponseDto.of(HttpStatus.OK.value(), "사용자가 세션을 떠났습니다.");
		} else {
			// 토큰이 유효하지 않음
			logger.error("유효하지 않은 토큰: userId={}, sessionId={}", userId, session.getSessionId());
			return ResponseDto.of(HttpStatus.INTERNAL_SERVER_ERROR.value(), "유효하지 않은 토큰입니다.");
		}
	}

	// 세션 종료
	@DeleteMapping("/{lectureId}/close")
	public ResponseDto<Void> closeSession(@PathVariable int lectureId,
										  @RequestBody(required = false) Map<String, Object> params) {
		// 강의 ID로 세션을 조회
		Session session = this.lectureSessions.get(lectureId);

		// 세션이 존재하는 경우
		if (session != null) {
			try {
				logger.info("세션 종료 요청: lectureId={}, sessionId={}", lectureId, session.getSessionId());

				session.close();
				logger.info("세션 종료 완료: lectureId={}, sessionId={}", lectureId, session.getSessionId());

				// 세션과 관련된 데이터 삭제
				this.lectureSessions.remove(lectureId);
				this.sessionUserToken.remove(session.getSessionId());
				this.sessionRecordings.remove(session.getSessionId());

				return ResponseDto.of(HttpStatus.OK.value(), "세션이 정상적으로 종료되었습니다.");
			} catch (Exception e) {
				logger.error("세션 종료 중 오류 발생: lectureId={}, sessionId={}, error={}", lectureId, session.getSessionId(), e.getMessage());
				return ResponseDto.of(HttpStatus.INTERNAL_SERVER_ERROR.value(), "세션 종료 중 오류가 발생했습니다.");
			}
		} else {
			// 세션이 존재하지 않음
			logger.warn("세션을 찾을 수 없음: lectureId={}", lectureId);
			return ResponseDto.of(HttpStatus.NOT_FOUND.value(), "세션을 찾을 수 없습니다.");
		}
	}


//	@PostMapping("/api/fetch-info")
//	public ResponseEntity<JsonObject> fetchInfo(@RequestBody Map<String, Object> sessionName) {
//		try {
//			System.out.println("Fetching session info | {sessionName}=" + sessionName);
//
//			// BODY에서 매개변수 가져오기
//			String session = (String) sessionName.get("sessionName");
//
//			// 세션이 존재하는 경우
//			if (this.lectureSessions.get(session) != null && this.sessionIdUserIdToken.get(session) != null) {
//				Session s = this.lectureSessions.get(session);
//				boolean changed = s.fetch();
//				System.out.println("Any change: " + changed);
//				return new ResponseEntity<>(this.sessionToJson(s), HttpStatus.OK);
//			} else {
//				// 세션이 존재하지 않음
//				System.out.println("Problems in the app server: the SESSION does not exist");
//				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//			}
//		} catch (OpenViduJavaClientException | OpenViduHttpException e) {
//			e.printStackTrace();
//			return getErrorResponse(e);
//		}
//	}
//
//	@GetMapping("/api/fetch-all")
//	public ResponseEntity<?> fetchAll() {
//		try {
//			System.out.println("Fetching all session info");
//			boolean changed = this.openVidu.fetch();
//			System.out.println("Any change: " + changed);
//			JsonArray jsonArray = new JsonArray();
//			for (Session s : this.openVidu.getActiveSessions()) {
//				jsonArray.add(this.sessionToJson(s));
//			}
//			return new ResponseEntity<>(jsonArray, HttpStatus.OK);
//		} catch (OpenViduJavaClientException | OpenViduHttpException e) {
//			e.printStackTrace();
//			return getErrorResponse(e);
//		}
//	}
//
//	@DeleteMapping("/api/force-disconnect")
//	public ResponseEntity<JsonObject> forceDisconnect(@RequestBody Map<String, Object> params) {
//		try {
//			// BODY에서 매개변수 가져오기
//			String session = (String) params.get("sessionName");
//			String connectionId = (String) params.get("connectionId");
//
//			// 세션이 존재하는 경우
//			if (this.lectureSessions.get(session) != null && this.sessionIdUserIdToken.get(session) != null) {
//				Session s = this.lectureSessions.get(session);
//				s.forceDisconnect(connectionId);
//				return new ResponseEntity<>(HttpStatus.OK);
//			} else {
//				// 세션이 존재하지 않음
//				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//			}
//		} catch (OpenViduJavaClientException | OpenViduHttpException e) {
//			e.printStackTrace();
//			return getErrorResponse(e);
//		}
//	}
//
//	@DeleteMapping("/api/force-unpublish")
//	public ResponseEntity<JsonObject> forceUnpublish(@RequestBody Map<String, Object> params) {
//		try {
//			// BODY에서 매개변수 가져오기
//			String session = (String) params.get("sessionName");
//			String streamId = (String) params.get("streamId");
//
//			// 세션이 존재하는 경우
//			if (this.lectureSessions.get(session) != null && this.sessionIdUserIdToken.get(session) != null) {
//				Session s = this.lectureSessions.get(session);
//				s.forceUnpublish(streamId);
//				return new ResponseEntity<>(HttpStatus.OK);
//			} else {
//				// 세션이 존재하지 않음
//				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//			}
//		} catch (OpenViduJavaClientException | OpenViduHttpException e) {
//			e.printStackTrace();
//			return getErrorResponse(e);
//		}
//	}
//
//
//	/*******************/
//	/** Recording API **/
//	/*******************/
//	@PostMapping("/api/recording/start")
//	public ResponseEntity<?> startRecording(@RequestBody Map<String, Object> params) {
//		String sessionId = (String) params.get("session");
//		Recording.OutputMode outputMode = Recording.OutputMode.valueOf((String) params.get("outputMode"));
//		boolean hasAudio = (boolean) params.get("hasAudio");
//		boolean hasVideo = (boolean) params.get("hasVideo");
//
//		RecordingProperties properties = new RecordingProperties.Builder().outputMode(outputMode).hasAudio(hasAudio)
//				.hasVideo(hasVideo).build();
//
//		System.out.println("Starting recording for session " + sessionId + " with properties {outputMode=" + outputMode
//				+ ", hasAudio=" + hasAudio + ", hasVideo=" + hasVideo + "}");
//
//		try {
//			Recording recording = this.openVidu.startRecording(sessionId, properties);
//			// url 확인 출력
//			System.out.println("start recording: " + recording.getUrl());
//			this.sessionRecordings.put(sessionId, true);
//			return new ResponseEntity<>(recording, HttpStatus.OK);
//		} catch (OpenViduJavaClientException | OpenViduHttpException e) {
//			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//		}
//	}
//
//	@PostMapping("/api/recording/stop")
//	public ResponseEntity<?> stopRecording(@RequestBody Map<String, Object> params) throws IOException {
//		String recordingId = (String) params.get("recording");
//		String connectionId = (String) params.get("connectionId");
//
//		System.out.println("Stoping recording | {recordingId}=" + recordingId);
//		System.out.println("Stoping recording | {connectionId}=" + connectionId);
//
//		try {
//			Recording recording = this.openVidu.stopRecording(recordingId);
//			System.out.println("stop recording - url: " + recording.getUrl());
//
//			String sessionId = recording.getSessionId();
//			System.out.println("stop recording - sessionid: " + sessionId);
//
//			// upzip
//			String zipPath = File.separator + "opt" + File.separator + "openvidu" + File.separator + "recordings" + File.separator + sessionId + File.separator + sessionId + ".zip";
//			File zipFile = new File(zipPath);
//			// 압축 해제 위치 = 해제한 파일 위치 -> openvidu에서 제공하는 delete 사용 가능
//			String upzipDir = File.separator + "opt" + File.separator + "openvidu" + File.separator + "recordings" + File.separator + sessionId + File.separator;
//
//			ZipInputStream zis = new ZipInputStream(new FileInputStream(zipPath));
//			ZipEntry ze = zis.getNextEntry();
//
//			while(ze!=null){
//				String entryName = ze.getName();
//				System.out.print("Extracting " + entryName + " -> " + upzipDir + File.separator +  entryName + "...");
//				File f = new File(upzipDir + File.separator +  entryName);
//				//create all folder needed to store in correct relative path.
//				f.getParentFile().mkdirs();
//				FileOutputStream fos = new FileOutputStream(f);
//				int len;
//				byte buffer[] = new byte[1024];
//				while ((len = zis.read(buffer)) > 0) {
//					fos.write(buffer, 0, len);
//				}
//				fos.close();
//				System.out.println("OK!");
//				ze = zis.getNextEntry();
//			}
//			zis.closeEntry();
//			zis.close();
//
//			// 녹화본 정보가 담긴 json 파일 읽기
//			Gson gson = new Gson();
//			String jsonPath = File.separator + "opt" + File.separator + "openvidu" + File.separator + "recordings" + File.separator + sessionId + File.separator + sessionId + ".json";
//			JsonReader recordJson = new JsonReader(new FileReader(jsonPath));
//			JsonObject jsonObject = gson.fromJson(recordJson, JsonObject.class);
//			System.out.println(jsonObject.get("files"));
//
//			// files 읽어서 params와 같은 connectionId를 갖는 name 가져오기
//			JsonArray recordArray = (JsonArray) jsonObject.get("files");
//			String recordName = "";
//			for(int i = 0; i < recordArray.size(); i++) {
//				JsonObject recordFile = (JsonObject) recordArray.get(i);
//				System.out.println("recordFile: " + recordFile);
//				String curConnectionId = recordFile.get("connectionId").toString().replace("\"", "");
//				System.out.println("curConnectionId: " + curConnectionId);
//				System.out.println(connectionId.equals(curConnectionId));
//				if(connectionId.equals(curConnectionId)) {
//					recordName = (String)recordFile.get("name").toString().replace("\"", "");
//					System.out.println(recordName);
//					break;
//				}
//			}
//
//			// 사용자 녹화본 url로 변환
//			String uRecordUrl = "https:" + File.separator + File.separator + "i5a204.p.ssafy.io" + File.separator +
//					"openvidu" + File.separator + "recordings" + File.separator + sessionId + File.separator + recordName;
//			System.out.println("uRecordUrl: " + uRecordUrl);
//
//			RecordResponse url = new RecordResponse(recording, uRecordUrl);
//			this.sessionRecordings.remove(recording.getSessionId());
//
//			return new ResponseEntity<>(url, HttpStatus.OK);
//		} catch (OpenViduJavaClientException | OpenViduHttpException e) {
//			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//		}
//	}
//
//	@GetMapping("/api/recording/get/{recordingId}")
//	public ResponseEntity<?> getRecording(@PathVariable(value = "recordingId") String recordingId) {
//
//		System.out.println("Getting recording | {recordingId}=" + recordingId);
//
//		try {
//			Recording recording = this.openVidu.getRecording(recordingId);
//			// url 확인 출력
//			System.out.println("get recording: " + recording.getUrl());
//			return new ResponseEntity<>(recording, HttpStatus.OK);
//		} catch (OpenViduJavaClientException | OpenViduHttpException e) {
//			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//		}
//	}
//
//	@GetMapping("/api/recording/list")
//	public ResponseEntity<?> listRecordings() {
//
//		System.out.println("Listing recordings");
//
//		try {
//			List<Recording> recordings = this.openVidu.listRecordings();
//
//			return new ResponseEntity<>(recordings, HttpStatus.OK);
//		} catch (OpenViduJavaClientException | OpenViduHttpException e) {
//			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//		}
//	}

	private ResponseEntity<JsonObject> getErrorResponse(Exception e) {
		JsonObject json = new JsonObject();
		json.addProperty("cause", e.getCause().toString());
		json.addProperty("error", e.getMessage());
		json.addProperty("exception", e.getClass().getCanonicalName());
		return new ResponseEntity<>(json, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	protected JsonObject sessionToJson(Session session) {
		Gson gson = new Gson();
		JsonObject json = new JsonObject();
		json.addProperty("sessionId", session.getSessionId());
		json.addProperty("customSessionId", session.getProperties().customSessionId());
		json.addProperty("recording", session.isBeingRecorded());
		json.addProperty("mediaMode", session.getProperties().mediaMode().name());
		json.addProperty("recordingMode", session.getProperties().recordingMode().name());
		json.add("defaultRecordingProperties",
				gson.toJsonTree(session.getProperties().defaultRecordingProperties()).getAsJsonObject());
		JsonObject connections = new JsonObject();
		connections.addProperty("numberOfElements", session.getConnections().size());
		JsonArray jsonArrayConnections = new JsonArray();
		session.getConnections().forEach(con -> {
			JsonObject c = new JsonObject();
			c.addProperty("connectionId", con.getConnectionId());
			c.addProperty("role", con.getRole().name());
			c.addProperty("token", con.getToken());
			c.addProperty("clientData", con.getClientData());
			c.addProperty("serverData", con.getServerData());
			JsonArray pubs = new JsonArray();
			con.getPublishers().forEach(p -> {
				pubs.add(gson.toJsonTree(p).getAsJsonObject());
			});
			JsonArray subs = new JsonArray();
			con.getSubscribers().forEach(s -> {
				subs.add(s);
			});
			c.add("publishers", pubs);
			c.add("subscribers", subs);
			jsonArrayConnections.add(c);
		});
		connections.add("content", jsonArrayConnections);
		json.add("connections", connections);
		return json;
	}

	private void showMap() {
		System.out.println("------------------------------");
		System.out.println(this.lectureSessions.toString());
		System.out.println(this.sessionUserToken.toString());
		System.out.println("------------------------------");
	}
}
