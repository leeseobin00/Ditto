package com.ssafy.ditto.domain.classes.exception;

import com.ssafy.ditto.global.error.ErrorCode;
import com.ssafy.ditto.global.error.ServiceException;

public class LectureDuplicateException extends ServiceException {
    public LectureDuplicateException() { super(ErrorCode.DUPLICATE_LECTURE);}
}
