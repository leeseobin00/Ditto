package com.ssafy.ditto.domain.liveroom.service;

public interface LiveRoomService {
    void createLiveRoom(int lectureId);
    void deleteLiveRoom(int lectureId);
    void setSession(int lectureId, String sessionId);
    String getSession(int lectureId) throws Exception;
    Integer enterLiveRoom(int lectureId) throws Exception;
    void leaveLiveRoom(int lectureId) throws Exception;
    Integer getUserCount(int lectureId) throws Exception;
}
