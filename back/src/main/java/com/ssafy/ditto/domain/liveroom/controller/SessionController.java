package com.ssafy.ditto.domain.liveroom.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.service.LectureService;
import com.ssafy.ditto.domain.liveroom.dto.ConnectionResponse;
import com.ssafy.ditto.domain.liveroom.service.LearningService;
import com.ssafy.ditto.domain.liveroom.service.LiveRoomService;
import com.ssafy.ditto.global.dto.ResponseDto;
import io.openvidu.java.client.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestController
@RequestMapping("/sessions")
public class SessionController {
	public static final Logger logger = LoggerFactory.getLogger(SessionController.class);

	// OpenVidu object as entrypoint of the SDK
	private OpenVidu openVidu;
	private LearningService learningService;
	private LectureService lectureService;
	private LiveRoomService liveRoomService;

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
							 LearningService learningService,LectureService lectureService,LiveRoomService liveRoomService) {
		this.SECRET = secret;
		this.OPENVIDU_URL = openviduUrl;
		this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
		this.learningService = learningService;
		this.lectureService = lectureService;
		this.liveRoomService = liveRoomService;
	}

	// 생성
	@PostMapping("/{lectureId}")
	public ResponseDto<?> createLiveRoom(@PathVariable int lectureId, @RequestParam Integer userId) {
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

				liveRoomService.setSession(lectureId,session.getSessionId());

				showMap();
				// 세션 정보 출력
				printSessionDetails(session);

				return ResponseDto.of(HttpStatus.OK.value(), "라이브 방송 링크가 생성되었습니다.", session.getSessionId());
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
	public ResponseDto<?> getToken(@PathVariable int lectureId, @RequestParam Integer userId,
								   @RequestBody(required = false) Map<String, Object> params) {
		// 사용자의 역할을 결정
		String roleType;
		if (learningService.isValidUser(userId, lectureId)) {
			roleType = "student";
		} else if (lectureService.isValidTeacher(userId, lectureId)) {
			roleType = "teacher";
		} else {
			logger.warn("유효하지 않은 사용자: userId={}, lectureId={}", userId, lectureId);
			return ResponseDto.of(HttpStatus.FORBIDDEN.value(), "유효하지 않은 사용자입니다.");
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

		// 강의 ID로 세션을 조회
		Session session = this.lectureSessions.get(lectureId);
		if (session != null) {
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

				return ResponseDto.of(HttpStatus.OK.value(), "토큰 생성 성공", token);
			} catch (OpenViduJavaClientException e1) {
				logger.error("OpenViduJavaClientException 발생: {}", e1.getMessage());
				return ResponseDto.of(HttpStatus.INTERNAL_SERVER_ERROR.value(), e1.getMessage());
			} catch (OpenViduHttpException e2) {
				if (404 == e2.getStatus()) {
					logger.warn("유효하지 않은 sessionId: lectureId={}", lectureId);
					this.lectureSessions.remove(lectureId);
					this.sessionUserToken.remove(session.getSessionId());
				}
			}
		} else {
			logger.warn("세션을 찾을 수 없음: lectureId={}", lectureId);
			return ResponseDto.of(HttpStatus.NOT_FOUND.value(), "세션을 찾을 수 없습니다.");
		}

		return ResponseDto.of(HttpStatus.NOT_FOUND.value(), "세션을 찾을 수 없습니다.");
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
	@DeleteMapping("/{lectureId}")
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

	@GetMapping("/fetch/{lectureId}")
	public ResponseDto<?> fetchInfo(@PathVariable int lectureId) {
		Session session = this.lectureSessions.get(lectureId);
		if (session == null) {
			logger.error("세션을 찾을 수 없음: lectureId={}", lectureId);
			return ResponseDto.of(HttpStatus.NOT_FOUND.value(), "세션을 찾을 수 없습니다.");
		}

		return ResponseDto.of(HttpStatus.OK.value(), "세션 정보 가져오기 성공", sessionToMap(session));
	}

	@GetMapping("/fetch")
	public ResponseDto<?> fetchAll() {
		try {
			boolean changed = this.openVidu.fetch();
			return ResponseDto.of(HttpStatus.OK.value(), "모든 세션 정보 가져오기 성공", sessionsToMap());
		} catch (OpenViduJavaClientException | OpenViduHttpException e) {
			logger.error("모든 세션 정보 가져오기 오류: {}", e.getMessage());
			return ResponseDto.of(HttpStatus.INTERNAL_SERVER_ERROR.value(), "모든 세션 정보 가져오기 오류: " + e.getMessage());
		}
	}

//	@DeleteMapping("/force-disconnect")
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
//	@DeleteMapping("/force-unpublish")
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

	private void showMap() {
		System.out.println("------------------------------");
		System.out.println(this.lectureSessions.toString());
		System.out.println(this.sessionUserToken.toString());
		System.out.println("------------------------------");
	}

	private Map<String, Object> sessionToMap(Session session) {
		Map<String, Object> sessionInfo = new HashMap<>();
		sessionInfo.put("sessionId", session.getSessionId());
		sessionInfo.put("customSessionId", session.getProperties().customSessionId());
		sessionInfo.put("isBeingRecorded", session.isBeingRecorded());
		sessionInfo.put("mediaMode", session.getProperties().mediaMode());
		sessionInfo.put("connections", session.getConnections().size());

		Map<String, Object> connectionsInfo = new HashMap<>();
		session.getConnections().forEach(con -> {
			Map<String, Object> connectionInfo = new HashMap<>();
			connectionInfo.put("connectionId", con.getConnectionId());
			connectionInfo.put("role", con.getRole());
			connectionInfo.put("token", con.getToken());
			connectionInfo.put("clientData", con.getClientData());
			connectionInfo.put("serverData", con.getServerData());
			connectionsInfo.put(con.getConnectionId(), connectionInfo);
		});
		sessionInfo.put("connectionsInfo", connectionsInfo);
		return sessionInfo;
	}

	private Map<Integer, Map<String, Object>> sessionsToMap() {
		Map<Integer, Map<String, Object>> allSessions = new HashMap<>();
		this.lectureSessions.values().forEach(session -> {
			allSessions.put(Integer.parseInt(session.getSessionId()), sessionToMap(session));
		});
		return allSessions;
	}

	private void printSessionDetails(Session session) {
		System.out.println("Session Details");
		System.out.println("Session ID: " + session.getSessionId());
		System.out.println("Custom Session ID: " + session.getProperties().customSessionId());
		System.out.println("Recording: " + session.isBeingRecorded());
		System.out.println("Media Mode: " + (session.getProperties().mediaMode() != null ? session.getProperties().mediaMode().name() : "null"));
		System.out.println("Recording Mode: " + (session.getProperties().recordingMode() != null ? session.getProperties().recordingMode().name() : "null"));

		System.out.println("Number of Connections: " + session.getConnections().size());
		session.getConnections().forEach(con -> {
			System.out.println("  Connection ID: " + con.getConnectionId());
			System.out.println("  Role: " + (con.getRole() != null ? con.getRole().name() : "null"));
			System.out.println("  Token: " + (con.getToken() != null ? con.getToken() : "null"));
			System.out.println("  Client Data: " + (con.getClientData() != null ? con.getClientData() : "null"));
			System.out.println("  Server Data: " + (con.getServerData() != null ? con.getServerData() : "null"));
		});
	}
}
