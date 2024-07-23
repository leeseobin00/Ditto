package com.ssafy.ditto.domain.classes.exception;

import com.ssafy.ditto.global.error.ErrorCode;
import com.ssafy.ditto.global.error.ServiceException;

public class LectureNotFoundException extends ServiceException {
    public LectureNotFoundException() {
        super(ErrorCode.LECTURE_NOT_FOUND);
    }
}