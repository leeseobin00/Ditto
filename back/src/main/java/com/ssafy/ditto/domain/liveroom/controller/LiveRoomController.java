package com.ssafy.ditto.domain.liveroom.controller;

import com.ssafy.ditto.domain.classes.service.LectureService;
import com.ssafy.ditto.domain.liveroom.dto.LiveRoomInfoResponse;
import com.ssafy.ditto.domain.liveroom.service.LearningService;
import com.ssafy.ditto.domain.liveroom.service.LiveRoomService;
import com.ssafy.ditto.global.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/live-rooms")
public class LiveRoomController {
    private final LiveRoomService liveRoomService;
    private final LearningService learningService;
    private final LectureService lectureService;

    // lecture 생성 후 별도의 api 호출 필요
    @Operation(summary = "라이브 방 생성", description = "강의가 진행될 라이브 방을 생성합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "라이브 방 생성이 성공적으로 완료되었습니다.")
    })
    @PostMapping("/{lectureId}")
    public ResponseDto<Void> createLiveRoom(@PathVariable int lectureId) {
        liveRoomService.createLiveRoom(lectureId);
        return ResponseDto.of(CREATED.value(), "라이브 방이 생성되었습니다.");
    }

    @Operation(summary = "라이브 방 종료", description = "강의가 진행될 라이브 방을 종료합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "라이브 방 종료가 성공적으로 완료되었습니다.")
    })
    @DeleteMapping("/{lectureId}")
    public ResponseDto<Void> endLiveRoom(@PathVariable int lectureId) {
        liveRoomService.endLiveRoom(lectureId);
        return ResponseDto.of(OK.value(), "라이브 방이 종료되었습니다.");
    }

    @Operation(summary = "라이브 방 정보 조회", description = "강의가 진행될 라이브 방의 정보를 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "라이브 방과 관련된 상세 정보 조회가 성공적으로 완료되었습니다.")
    })
    @GetMapping("/{lectureId}")
    public ResponseDto<LiveRoomInfoResponse> getLectureInfo(@PathVariable int lectureId) {
        LiveRoomInfoResponse liveRoomInfoResponse = liveRoomService.getLiveRoomInfo(lectureId);
        return ResponseDto.of(200, "라이브 방 상세 정보 조회가 성공적으로 완료되었습니다.",liveRoomInfoResponse);
    }

//    @GetMapping("/{lectureId}")
//    public ResponseDto<Integer> getUserCount(@PathVariable int lectureId) {
//        int userCount = 0;
//        try {
//            userCount = liveRoomService.getUserCount(lectureId);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//        return ResponseDto.of(200, "라이브 참여 인원 조회가 성공적으로 완료되었습니다.",userCount);
//    }

    @GetMapping("/enter/{lectureId}")
    public ResponseDto<String> getSessionName(@PathVariable Integer lectureId, @RequestParam Integer userId) {
        // 클래스 주최하는 강사인지 확인
        boolean isValidTeacher = lectureService.isValidTeacher(userId,lectureId);
        if(isValidTeacher) {
            try {
                String sessionName = liveRoomService.getSession(lectureId);
                return ResponseDto.of(200, "라이브 참여 세션명 조회가 성공적으로 완료되었습니다.",sessionName);
            } catch (Exception e) {
                return ResponseDto.of(500, "라이브 종료 오류");
            }
        }
        return ResponseDto.of(403, "접근할 수 없는 페이지입니다.");
    }

    @PutMapping("/enter/{lectureId}")
    public ResponseDto<Void> enterLiveRoom(@PathVariable int lectureId, @RequestParam Integer userId) {
        boolean isValidUser = learningService.isValidUser(userId,lectureId);
        if(isValidUser){
            try {
                Integer userCnt = liveRoomService.enterLiveRoom(lectureId);
                if(userCnt == null) {
                    return ResponseDto.of(200, "라이브 정원이 초과되었습니다.");
                }
                return ResponseDto.of(200, "라이브 참여 완료되었습니다.");
            } catch (Exception e) {
                return ResponseDto.of(500, "라이브 참여 오류");
            }
        }
        return ResponseDto.of(403, "접근할 수 없는 페이지입니다.");
    }

    @PutMapping("/leave/{lectureId}")
    public ResponseDto<Void> leaveLiveRoom(@PathVariable int lectureId, @RequestParam Integer userId) {
        // 클래스 주최하는 강사인지 확인
        boolean isValidTeacher = lectureService.isValidTeacher(userId,lectureId);
        if(isValidTeacher) {
            // 확인 후 클래스 종료
            try {
                liveRoomService.leaveLiveRoom(lectureId); // 선생님의 클래스 종료
                learningService.changeStatus(lectureId); // 수강생들의 상태 변경
                return ResponseDto.of(200, "라이브 종료 완료되었습니다.");
            } catch (Exception e) {
                return ResponseDto.of(500, "라이브 종료 오류");
            }
        }
        return ResponseDto.of(403, "접근할 수 없는 페이지입니다.");
    }
}
