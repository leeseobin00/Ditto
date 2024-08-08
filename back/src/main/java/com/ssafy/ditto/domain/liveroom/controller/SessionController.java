package com.ssafy.ditto.domain.liveroom.controller;

import java.util.Map;

import com.ssafy.ditto.domain.liveroom.dto.ConnectionResponse;
import com.ssafy.ditto.domain.liveroom.dto.SessionCreationResponse;
import com.ssafy.ditto.domain.liveroom.service.SessionService;
import com.ssafy.ditto.global.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequiredArgsConstructor
@RequestMapping("/sessions")
public class SessionController {
	private final SessionService sessionService;

	@Operation(summary = "라이브 방과 연결된 화상 클래스 세션 생성", description = "라이브 방과 연결된 화상 클래스 세션을 새롭게 생성합니다.")
	@ApiResponses({
			@ApiResponse(responseCode = "201", description = "화상 클래스 세션 생성이 성공적으로 완료되었습니다.")
	})
	@PostMapping("/{lectureId}")
	public ResponseDto<String> createSession(@PathVariable int lectureId, @RequestParam Integer userId) {
		try {
			SessionCreationResponse result = sessionService.createSession(lectureId, userId);
			return ResponseDto.of(result.getStatusCode(), result.getMessage(), result.getSessionId());
		} catch (ResponseStatusException e) {
			return ResponseDto.of(404, e.getReason());
		}
	}

	/*******************/
	/*** Session API ***/
	/*******************/
	@Operation(summary = "수강생과 강사의 입장 토큰 생성", description = "화상 클래스 세션의 입장을 위한 토큰을 새롭게 부여합니다.")
	@ApiResponses({
			@ApiResponse(responseCode = "201", description = "화상 클래스 세션에 입장하기 위한 토큰 생성이 성공적으로 완료되었습니다.")
	})
	@PostMapping("/{lectureId}/get-token")
	public ResponseDto<String> getToken(@PathVariable int lectureId, @RequestParam Integer userId) {
		try {
			ConnectionResponse response = sessionService.getToken(lectureId, userId);
			return ResponseDto.of(HttpStatus.OK.value(), "토큰 생성 성공", response.getToken());
		} catch (ResponseStatusException e) {
			return ResponseDto.of(404, e.getReason());
		}
	}

	@Operation(summary = "수강생과 강사의 입장 토큰 제거", description = "화상 클래스 세션의 입장을 위한 토큰을 제거합니다.")
	@ApiResponses({
			@ApiResponse(responseCode = "200", description = "화상 클래스 세션에 입장하기 위한 토큰 제거가 성공적으로 완료되었습니다.")
	})
	@PostMapping("/{lectureId}/remove-user")
	public ResponseDto<Void> removeUser(@PathVariable int lectureId, @RequestParam Integer userId) {
		try {
			sessionService.removeUser(lectureId, userId);
			return ResponseDto.of(HttpStatus.OK.value(), "사용자가 세션을 떠났습니다.");
		} catch (ResponseStatusException e) {
			return ResponseDto.of(404, e.getReason(), null);
		}
	}

	@Operation(summary = "라이브 방과 연결된 화상 클래스 세션 종료", description = "라이브 방과 연결된 화상 클래스 세션을 종료합니다.")
	@ApiResponses({
			@ApiResponse(responseCode = "200", description = "화상 클래스 세션 종료가 성공적으로 완료되었습니다.")
	})
	@DeleteMapping("/{lectureId}")
	public ResponseDto<Void> closeSession(@PathVariable int lectureId,
										  @RequestBody(required = false) Map<String, Object> params) {
		try {
			sessionService.closeSession(lectureId);
			return ResponseDto.of(HttpStatus.OK.value(), "세션이 정상적으로 종료되었습니다.");
		} catch (ResponseStatusException e) {
			return ResponseDto.of(404, e.getReason(), null);
		}
	}

	@Operation(summary = "특정 화상 클래스 세션의 정보를 조회합니다.", description = "라이브 방과 연결된 화상 클래스 세션의 정보를 조회합니다.")
	@ApiResponses({
			@ApiResponse(responseCode = "200", description = "화상 클래스 세션의 정보 조회가 성공적으로 완료되었습니다.")
	})
	@GetMapping("/fetch/{lectureId}")
	public ResponseDto<?> fetchInfo(@PathVariable int lectureId) {
		try {
			Map<String, Object> sessionInfo = sessionService.fetchInfo(lectureId);
			return ResponseDto.of(HttpStatus.OK.value(), "세션 정보 가져오기 성공", sessionInfo);
		} catch (ResponseStatusException e) {
			return ResponseDto.of(404, e.getReason(), null);
		}
	}

	@Operation(summary = "열린 모든 화상 클래스 세션의 정보를 조회합니다.", description = "라이브 방과 연결된 모든 화상 클래스 세션의 정보를 조회합니다.")
	@ApiResponses({
			@ApiResponse(responseCode = "200", description = "모든 화상 클래스 세션의 정보 조회가 성공적으로 완료되었습니다.")
	})
	@GetMapping("/fetch")
	public ResponseDto<?> fetchAll() {
		Map<Integer, Map<String, Object>> allSessions = sessionService.fetchAll();
		return ResponseDto.of(HttpStatus.OK.value(), "모든 세션 정보 가져오기 성공", allSessions);
	}

	@Operation(summary = "특정 사용자의 세션 연결을 강제 해제합니다.", description = "화상 클래스 세션에 접속 중인 특정 사용자의 세션 연결을 강제 해제합니다.")
	@ApiResponses({
			@ApiResponse(responseCode = "200", description = "세션 연결을 강제 해제가 성공적으로 완료되었습니다.")
	})
	@DeleteMapping("/force-disconnect/{lectureId}")
	public ResponseDto<?> forceDisconnect(@PathVariable int lectureId, @RequestParam Integer userId) {
		try {
			sessionService.forceDisconnect(lectureId, userId);
			return ResponseDto.of(HttpStatus.OK.value(), "연결 강제 해제 성공");
		} catch (ResponseStatusException e) {
			return ResponseDto.of(404, e.getReason(), null);
		}
	}
}
