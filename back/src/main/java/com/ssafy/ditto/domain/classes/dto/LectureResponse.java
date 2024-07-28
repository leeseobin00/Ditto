package com.ssafy.ditto.domain.classes.dto;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.dto.UserResponse;
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
