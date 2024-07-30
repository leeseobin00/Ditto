package com.ssafy.ditto.domain.liveroom.controller;

import com.ssafy.ditto.domain.liveroom.service.LearningService;
import com.ssafy.ditto.domain.liveroom.service.LiveRoomService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin(
//        origins = {}, // SSL 이후 설정 필요
//        allowCredentials = "true",
//        allowedHeaders = "*",
//        methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT,RequestMethod.OPTIONS}
//)
@RestController
@RequiredArgsConstructor
@RequestMapping("/live-rooms")
public class LiveRoomController {
    private final LiveRoomService liveRoomService;
    private final LearningService learningService;

    @GetMapping("/{lectureId}")
    public ResponseDto<Integer> getUserCount(@PathVariable int lectureId) {
        int userCount = 0;
        try {
            userCount = liveRoomService.getUserCount(lectureId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseDto.of(200, "라이브 참여 인원 조회가 성공적으로 완료되었습니다.",userCount);
    }

    @GetMapping("/enter/{lectureId}")
    public ResponseDto<String> getSessionName(@PathVariable int lectureId, @RequestParam Integer userId) {
        // 클래스 주최하는 강사인지 확인
        boolean isValidTeacher = learningService.isValidTeacher(userId,lectureId);
        if(isValidTeacher) {
            try {
                String sessionName = liveRoomService.getSessionName(lectureId);
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
        boolean isValidTeacher = learningService.isValidTeacher(userId,lectureId);
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
