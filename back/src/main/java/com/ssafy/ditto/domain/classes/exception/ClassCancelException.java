package com.ssafy.ditto.domain.classes.exception;

import com.ssafy.ditto.global.error.ErrorCode;
import com.ssafy.ditto.global.error.ServiceException;

public class ClassCancelException extends ServiceException {
    public ClassCancelException() {
        super(ErrorCode.CANCEL_CLASS);
    }
}