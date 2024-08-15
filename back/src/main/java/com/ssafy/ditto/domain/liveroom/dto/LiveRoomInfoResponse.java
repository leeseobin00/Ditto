package com.ssafy.ditto.domain.liveroom.dto;

import com.ssafy.ditto.domain.classes.dto.LectureResponse;
import com.ssafy.ditto.domain.classes.dto.StepDetailResponse;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LiveRoomInfoResponse {
    private String className;
    private LectureResponse lectureResponse;
    private List<StepDetailResponse> stepList;
}
