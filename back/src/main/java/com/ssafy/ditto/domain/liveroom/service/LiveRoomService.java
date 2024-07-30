package com.ssafy.ditto.domain.liveroom.service;

public interface LiveRoomService {
    void createLiveRoom(String liveSessionName, int lectureId);
    Integer enterLiveRoom(int lectureId) throws Exception;
    void leaveLiveRoom(int lectureId) throws Exception;
    int getUserCount(int lectureId);
}
