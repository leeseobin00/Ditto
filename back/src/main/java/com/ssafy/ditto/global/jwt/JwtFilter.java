package com.ssafy.ditto.global.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    public final static String HEADER_NAME="Authorization";
    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = resolveToken(request); // 요청에서 jwt 추출
        //System.out.println(token);
        if (token != null) { // jwt가 존재하면
            jwtProvider.validateToken(token, false); // jwt 검증
            Authentication authentication = this.jwtProvider.getAuthentication(token); // JWT에서 인증 정보 추출
            SecurityContextHolder.getContext().setAuthentication(authentication); // Spring Security 컨텍스트에 인증 정보 설정
        }
        filterChain.doFilter(request, response); // 다음 필터로 요청 전달
    }

    // 요청 헤더에서 jwt를 추출
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(HEADER_NAME);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}