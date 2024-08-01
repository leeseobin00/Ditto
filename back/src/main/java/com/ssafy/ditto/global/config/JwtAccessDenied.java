package com.ssafy.ditto.global.config;

import com.ssafy.ditto.global.error.ErrorCode;
import com.ssafy.ditto.global.jwt.JwtExceptionFilter;
import com.ssafy.ditto.global.jwt.JwtFilter;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAccessDenied implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        // 4. 토큰 인증 후 권한 거부
        ErrorCode errorCode = ErrorCode.FORBIDDEN;
        JwtExceptionFilter.setErrorResponse(HttpStatus.FORBIDDEN, response, errorCode);
    }
}