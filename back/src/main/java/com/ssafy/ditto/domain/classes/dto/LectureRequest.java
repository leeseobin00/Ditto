package com.ssafy.ditto.domain.classes.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LectureRequest {
    private Integer year;
    private Byte month;
    private Byte day;
    private Byte hour;
    private Byte minute;
}
