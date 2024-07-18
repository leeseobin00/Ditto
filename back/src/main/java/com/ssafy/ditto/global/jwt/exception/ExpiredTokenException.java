package com.ssafy.ditto.global.jwt.exception;


import com.ssafy.ditto.global.error.ErrorCode;
import com.ssafy.ditto.global.error.ServiceException;

public class ExpiredTokenException extends ServiceException {
    public ExpiredTokenException() {
        super(ErrorCode.EXPIRED_TOKEN);
    }
}