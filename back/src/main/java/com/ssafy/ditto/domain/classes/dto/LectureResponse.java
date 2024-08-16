package com.ssafy.ditto.domain.classes.dto;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LectureResponse {

    @Schema(description = "강의 ID", example = "1")
    private Integer lectureId;

    @Schema(description = "년도", example = "2024")
    private Integer year;

    @Schema(description = "월", example = "7")
    private Byte month;

    @Schema(description = "일", example = "9")
    private Byte day;

    @Schema(description = "시", example = "14")
    private Byte hour;

    @Schema(description = "분", example = "30")
    private Byte minute;

    @Schema(description = "수강 인원 수", example = "10")
    private Byte userCount;

    public static LectureResponse of(Lecture lecture) {
        return LectureResponse.builder()
                .lectureId(lecture.getLectureId())
                .year(lecture.getYear())
                .month(lecture.getMonth())
                .day(lecture.getDay())
                .hour(lecture.getHour())
                .minute(lecture.getMinute())
                .userCount(lecture.getUserCount())
                .build();
    }
}
