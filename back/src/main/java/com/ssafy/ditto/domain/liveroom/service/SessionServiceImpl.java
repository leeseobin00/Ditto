package com.ssafy.ditto.domain.liveroom.service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.ssafy.ditto.domain.classes.service.LectureService;
import com.ssafy.ditto.domain.liveroom.dto.ConnectionResponse;
import com.ssafy.ditto.domain.liveroom.dto.SessionCreationResponse;
import com.ssafy.ditto.global.error.ErrorCode;
import com.ssafy.ditto.global.error.ServiceException;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@Service
@RequiredArgsConstructor
public class SessionServiceImpl implements SessionService {
    private OpenVidu openVidu;
    private LearningService learningService;
    private LectureService lectureService;
    private LiveRoomService liveRoomService;

    // Collection to pair session names and OpenVidu Session objects
    private Map<Integer, Session> lectureSessions = new ConcurrentHashMap<>();
    // Collection to pair session names and tokens (the inner Map pairs tokens and role associated)
    private Map<String, Map<Integer, ConnectionResponse>> sessionUserToken = new ConcurrentHashMap<>();

    // URL where our OpenVidu server is listening
    private String OPENVIDU_URL;
    // Secret shared with our OpenVidu server
    private String SECRET;

    @Autowired
    public SessionServiceImpl(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl,
                              LearningService learningService,LectureService lectureService,LiveRoomService liveRoomService) {
        this.SECRET = secret;
        this.OPENVIDU_URL = openviduUrl;
        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
        this.learningService = learningService;
        this.lectureService = lectureService;
        this.liveRoomService = liveRoomService;
    }

    @Value("${openvidu.secret}")
    private String secret;

    @Value("${openvidu.url}")
    private String openviduUrl;

    public SessionServiceImpl(LearningService learningService, LectureService lectureService, LiveRoomService liveRoomService) {
        this.openVidu = new OpenVidu(openviduUrl, secret);
        this.learningService = learningService;
        this.lectureService = lectureService;
        this.liveRoomService = liveRoomService;
    }

    @Override
    public SessionCreationResponse createSession(int lectureId, int userId) {
        boolean isValidTeacher = lectureService.isValidTeacher(userId, lectureId);
        if (!isValidTeacher) {
            throw new ServiceException(ErrorCode.FORBIDDEN);
        }

        if (lectureSessions.containsKey(lectureId)) {
            String existingSessionId = lectureSessions.get(lectureId).getSessionId();
            return new SessionCreationResponse(ErrorCode.ALREADY_HAS_SESSION.getHttpStatus(), ErrorCode.ALREADY_HAS_SESSION.getMessage(), existingSessionId);
        } else {
            try {
                Session session = this.openVidu.createSession();
                this.lectureSessions.put(lectureId, session);
                this.sessionUserToken.put(session.getSessionId(), new HashMap<>());

                liveRoomService.setSession(lectureId, session.getSessionId());

                return new SessionCreationResponse(HttpStatus.OK.value(), "라이브 방송 링크가 생성되었습니다.", session.getSessionId());
            } catch (OpenViduJavaClientException e) {
                throw new ServiceException(ErrorCode.OPENVIDU_CLIENT_ERROR, e);
            } catch (OpenViduHttpException e) {
                throw new ServiceException(ErrorCode.OPENVIDU_HTTP_ERROR, e);
            } catch (Exception e) {
                throw new ServiceException(ErrorCode.UNKNOWN_ERROR, e);
            }
        }
    }

    @Override
    public ConnectionResponse getToken(int lectureId, int userId) {
        // 사용자의 역할을 결정
        OpenViduRole role;
        if (learningService.isValidUser(userId, lectureId) || lectureService.isValidTeacher(userId, lectureId)) {
            role = OpenViduRole.MODERATOR;
        } else {
            throw new ServiceException(ErrorCode.INVALID_USER);
        }

        Session session = this.lectureSessions.get(lectureId);
        if (session != null) {
            try {
                // 사용자가 이미 토큰을 가지고 있는지 확인
                Map<Integer, ConnectionResponse> userTokens = this.sessionUserToken.get(session.getSessionId());
                if (userTokens != null && userTokens.containsKey(userId)) {
                    return userTokens.get(userId);
                }

                ConnectionProperties properties = new ConnectionProperties.Builder()
                        .type(ConnectionType.WEBRTC)
                        .role(role)
                        .data("user-data")
                        .build();

                Connection connection = session.createConnection(properties);
                String token = connection.getToken();
                String connectionId = connection.getConnectionId();

                ConnectionResponse resp = new ConnectionResponse();
                resp.setToken(token);
                resp.setConnectionId(connectionId);
                resp.setRole(role);

                this.sessionUserToken.computeIfAbsent(session.getSessionId(), k -> new HashMap<>()).put(userId, resp);

                return resp;
            } catch (OpenViduJavaClientException | OpenViduHttpException e) {
                if (e instanceof OpenViduHttpException && ((OpenViduHttpException) e).getStatus() == 404) {
                    this.lectureSessions.remove(lectureId);
                    this.sessionUserToken.remove(session.getSessionId());
                }
                throw new ServiceException(ErrorCode.OPENVIDU_HTTP_ERROR, e);
            }
        } else {
            throw new ServiceException(ErrorCode.SESSION_NOT_FOUND);
        }
    }

    @Override
    public void removeUser(int lectureId, int userId) {
        Session session = this.lectureSessions.get(lectureId);
        if (session == null) {
            throw new ServiceException(ErrorCode.SESSION_NOT_FOUND);
        }

        Map<Integer, ConnectionResponse> userTokens = this.sessionUserToken.get(session.getSessionId());
        if (userTokens == null || !userTokens.containsKey(userId)) {
            throw new ServiceException(ErrorCode.INVALID_USER);
        }

        String token = userTokens.get(userId).getToken();
        if (token != null) {
            userTokens.remove(userId);
            if (userTokens.isEmpty()) {
                this.lectureSessions.remove(lectureId);
                this.sessionUserToken.remove(session.getSessionId());
            }
        } else {
            throw new ServiceException(ErrorCode.INVALID_TOKEN);
        }
    }

    @Override
    public void closeSession(int lectureId) {
        Session session = this.lectureSessions.get(lectureId);
        if (session == null) {
            return;
        }

        try {
            session.close();
            this.lectureSessions.remove(lectureId);
            this.sessionUserToken.remove(session.getSessionId());
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }

    @Override
    public Map<String, Object> fetchInfo(int lectureId) {
        Session session = this.lectureSessions.get(lectureId);
        if (session == null) {
            throw new ServiceException(ErrorCode.SESSION_NOT_FOUND);
        }
        return sessionToMap(session);
    }

    @Override
    public Map<Integer, Map<String, Object>> fetchAll() {
        return sessionsToMap();
    }

    @Override
    public void forceDisconnect(int lectureId, int userId) {
        Session session = this.lectureSessions.get(lectureId);

        if (session == null) {
            throw new ServiceException(ErrorCode.SESSION_NOT_FOUND);
        }

        String sessionId = session.getSessionId();
        Map<Integer, ConnectionResponse> userConnections = this.sessionUserToken.get(sessionId);
        if (userConnections == null) {
            throw new ServiceException(ErrorCode.INVALID_USER);
        }

        ConnectionResponse connectionResponse = userConnections.get(userId);
        if (connectionResponse == null) {
            throw new ServiceException(ErrorCode.INVALID_USER);
        }

        String connectionId = connectionResponse.getConnectionId();
        if (connectionId == null) {
            throw new ServiceException(ErrorCode.INVALID_TOKEN);
        }

        try {
            session.forceDisconnect(connectionId);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw new ServiceException(ErrorCode.OPENVIDU_CLIENT_ERROR, e);
        }
    }

    private void showMap() {
        System.out.println("------------------------------");
        System.out.println(this.lectureSessions.toString());
        System.out.println(this.sessionUserToken.toString());
        System.out.println("------------------------------");
    }

    private Map<String, Object> sessionToMap(Session session) {
        Map<String, Object> sessionInfo = new HashMap<>();
        sessionInfo.put("sessionId", session.getSessionId());
        sessionInfo.put("customSessionId", session.getProperties().customSessionId());
        sessionInfo.put("isBeingRecorded", session.isBeingRecorded());
        sessionInfo.put("mediaMode", session.getProperties().mediaMode());
        sessionInfo.put("connections", session.getConnections().size());

        Map<String, Object> connectionsInfo = new HashMap<>();
        session.getConnections().forEach(con -> {
            Map<String, Object> connectionInfo = new HashMap<>();
            connectionInfo.put("connectionId", con.getConnectionId());
            connectionInfo.put("role", con.getRole());
            connectionInfo.put("token", con.getToken());
            connectionInfo.put("clientData", con.getClientData());
            connectionInfo.put("serverData", con.getServerData());
            connectionsInfo.put(con.getConnectionId(), connectionInfo);
        });
        sessionInfo.put("connectionsInfo", connectionsInfo);
        return sessionInfo;
    }

    private Map<Integer, Map<String, Object>> sessionsToMap() {
        Map<Integer, Map<String, Object>> allSessions = new HashMap<>();
        this.lectureSessions.forEach((lectureId, session) -> {
            allSessions.put(lectureId, sessionToMap(session));
        });
        return allSessions;
    }

    private void printSessionDetails(Session session) {
        System.out.println("Session Details");
        System.out.println("Session ID: " + session.getSessionId());
        System.out.println("Custom Session ID: " + session.getProperties().customSessionId());
        System.out.println("Recording: " + session.isBeingRecorded());
        System.out.println("Media Mode: " + (session.getProperties().mediaMode() != null ? session.getProperties().mediaMode().name() : "null"));
        System.out.println("Recording Mode: " + (session.getProperties().recordingMode() != null ? session.getProperties().recordingMode().name() : "null"));

        System.out.println("Number of Connections: " + session.getConnections().size());
        session.getConnections().forEach(con -> {
            System.out.println("  Connection ID: " + con.getConnectionId());
            System.out.println("  Role: " + (con.getRole() != null ? con.getRole().name() : "null"));
            System.out.println("  Token: " + (con.getToken() != null ? con.getToken() : "null"));
            System.out.println("  Client Data: " + (con.getClientData() != null ? con.getClientData() : "null"));
            System.out.println("  Server Data: " + (con.getServerData() != null ? con.getServerData() : "null"));
        });
    }
}
