package com.ssafy.ditto.domain.user.repository;

import org.springframework.stereotype.Repository;

import java.util.concurrent.ConcurrentHashMap;

@Repository
public class EmailRepository {
    private final ConcurrentHashMap<String, String> emailAndCode = new ConcurrentHashMap<>();

    // 이메일과 코드 저장
    public void saveCode(String email, String code) {
        emailAndCode.put(email, code);
    }

    // 이메일에 해당하는 코드 삭제
    public Runnable removeCode(String email) {
        return () -> {
            emailAndCode.remove(email);
        };
    }

    // 이메일에 해당하는 코드 검색
    public String getCode(String email) {
        return emailAndCode.get(email);
    }
}
