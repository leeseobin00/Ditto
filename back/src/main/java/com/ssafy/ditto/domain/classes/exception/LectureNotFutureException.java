package com.ssafy.ditto.domain.classes.exception;

import com.ssafy.ditto.global.error.ErrorCode;
import com.ssafy.ditto.global.error.ServiceException;

public class LectureNotFutureException extends ServiceException {
    public LectureNotFutureException() {super(ErrorCode.BAD_REQUEST);}
}
