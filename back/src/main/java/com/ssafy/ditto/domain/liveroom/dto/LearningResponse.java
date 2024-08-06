package com.ssafy.ditto.domain.liveroom.dto;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.file.dto.FileResponse;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LearningResponse {
    private Integer classId;
    private String className;
    private FileResponse file;

    private Integer lectureId;
    private Integer year;
    private Byte month;
    private Byte day;
    private Byte hour;
    private Byte minute;

    private Boolean isOpened;

    public static LearningResponse of(DClass dClass, Lecture lecture, Boolean isOpened){
        return LearningResponse.builder()
                .classId(dClass.getClassId())
                .className(dClass.getClassName())
                .file(FileResponse.of(dClass.getFileId()))
                .lectureId(lecture.getLectureId())
                .year(lecture.getYear())
                .month(lecture.getMonth())
                .day(lecture.getDay())
                .hour(lecture.getHour())
                .minute(lecture.getMinute())
                .isOpened(isOpened)
                .build();
    }
}
