package com.ssafy.ditto.domain.classes.exception;

import com.ssafy.ditto.global.error.ErrorCode;
import com.ssafy.ditto.global.error.ServiceException;

public class StepNotFoundException extends ServiceException {
    public StepNotFoundException() {
        super(ErrorCode.STEP_NOT_FOUND);
    }
}