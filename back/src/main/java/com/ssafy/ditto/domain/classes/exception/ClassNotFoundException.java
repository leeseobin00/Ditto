package com.ssafy.ditto.domain.classes.exception;

import com.ssafy.ditto.global.error.ErrorCode;
import com.ssafy.ditto.global.error.ServiceException;

public class ClassNotFoundException extends ServiceException {
    public ClassNotFoundException() {
        super(ErrorCode.CLASS_NOT_FOUND);
    }
}