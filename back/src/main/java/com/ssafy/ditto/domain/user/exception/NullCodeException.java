package com.ssafy.ditto.domain.user.exception;

import com.ssafy.ditto.global.error.ErrorCode;
import com.ssafy.ditto.global.error.ServiceException;

public class NullCodeException extends ServiceException {
    public NullCodeException() {
        super(ErrorCode.EMAIL_CODE_NOTEXIST);
    }
}
