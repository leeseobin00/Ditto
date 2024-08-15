package com.ssafy.ditto.domain.answer.exception;

import com.ssafy.ditto.global.error.ErrorCode;
import com.ssafy.ditto.global.error.ServiceException;

public class AnswerNotFoundException extends ServiceException {
    public AnswerNotFoundException() {
        super(ErrorCode.ANSWER_NOT_FOUND);
    }
}