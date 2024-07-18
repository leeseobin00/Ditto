package com.ssafy.ditto.global.jwt.exception;

import com.ssafy.ditto.global.error.ErrorCode;
import com.ssafy.ditto.global.error.ServiceException;
import io.jsonwebtoken.ExpiredJwtException;

public class ExpiredTokenException extends ServiceException {
    public ExpiredTokenException() {
        super(ErrorCode.EXPIRED_TOKEN);
    }

    public ExpiredTokenException(ExpiredJwtException e) {
        super(ErrorCode.EXPIRED_TOKEN, e);
    }
}
