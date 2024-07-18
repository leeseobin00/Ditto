package com.ssafy.ditto.global.jwt;

import com.ssafy.ditto.global.jwt.exception.ExpiredTokenException;
import com.ssafy.ditto.global.jwt.exception.InvalidTokenException;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class JwtProvider {
    @Value("${jwt.access_secret}")
    private String accessSecret;

    @Value("${jwt.refresh_secret}")
    private String refreshSecret;

    public Claims parseClaims(String token, boolean isRefreshToken) {
        try {
            return Jwts.parser()
                    .setSigningKey(isRefreshToken ? refreshSecret : accessSecret)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}
