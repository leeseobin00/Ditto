package com.ssafy.ditto.domain.liveroom.exception;

import com.ssafy.ditto.global.error.ErrorCode;
import com.ssafy.ditto.global.error.ServiceException;

public class LiveRoomNotFoundException extends ServiceException {
    public LiveRoomNotFoundException() {
        super(ErrorCode.LIVEROOM_NOT_FOUND);
    }
}