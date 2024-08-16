package com.ssafy.ditto.domain.tag.exception;

import com.ssafy.ditto.global.error.ErrorCode;
import com.ssafy.ditto.global.error.ServiceException;

public class TagNotFoundException extends ServiceException {
    public TagNotFoundException() {
        super(ErrorCode.TAG_NOT_FOUND);
    }
}