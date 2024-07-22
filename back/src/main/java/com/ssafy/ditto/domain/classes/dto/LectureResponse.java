package com.ssafy.ditto.domain.classes.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LectureResponse {
    private Integer lectureId;
    private Integer year;
    private Byte month;
    private Byte day;
    private Byte hour;
    private Byte minute;
    private Byte userCount;
}
