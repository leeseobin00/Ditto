package com.ssafy.ditto.domain.user.exception;

import com.ssafy.ditto.global.error.ErrorCode;
import com.ssafy.ditto.global.error.ServiceException;

public class UserDuplicateException extends ServiceException {
    public UserDuplicateException() {
        super(ErrorCode.DUPLICATE_USER);
    }
}
