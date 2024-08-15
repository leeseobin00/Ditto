package com.ssafy.ditto.domain.liveroom.service;

import com.ssafy.ditto.domain.liveroom.dto.ConnectionResponse;
import com.ssafy.ditto.domain.liveroom.dto.SessionCreationResponse;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

public interface SessionService {
    SessionCreationResponse createSession(int lectureId, int userId) throws ResponseStatusException;
    ConnectionResponse getToken(int lectureId, int userId) throws ResponseStatusException;
    void removeUser(int lectureId, int userId) throws ResponseStatusException;
    void closeSession(int lectureId) throws ResponseStatusException;
    Map<String, Object> fetchInfo(int lectureId) throws ResponseStatusException;
    Map<Integer, Map<String, Object>> fetchAll();
    void forceDisconnect(int lectureId, int userId) throws ResponseStatusException;
}
