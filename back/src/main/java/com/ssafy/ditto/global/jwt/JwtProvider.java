package com.ssafy.ditto.global.jwt;

import com.ssafy.ditto.global.jwt.dto.JwtResponse;
import com.ssafy.ditto.global.jwt.exception.ExpiredTokenException;
import com.ssafy.ditto.global.jwt.exception.InvalidTokenException;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Date;

@Component
public class JwtProvider {
    @Value("${jwt.access_secret}")
    private String accessSecret;

    @Value("${jwt.refresh_secret}")
    private String refreshSecret;

    @Value("${jwt.access_token_expiration}")
    private long accessTokenExpiration;

    @Value("${jwt.refresh_token_expiration}")
    private long refreshTokenExpiration;

    public Claims parseClaims(String token, boolean isRefreshToken) {
        try {
            return Jwts.parser()
                    .setSigningKey(isRefreshToken ? refreshSecret : accessSecret)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw new ExpiredTokenException(e);
        }
    }

    public void validateToken(String token, boolean isRefreshToken) {
        try {
            parseClaims(token, isRefreshToken);
        } catch (SignatureException | UnsupportedJwtException | IllegalArgumentException | MalformedJwtException e) {
            throw new InvalidTokenException();
        } catch (ExpiredJwtException e) {
            throw new ExpiredTokenException();
        }
    }

    public Authentication getAuthentication(String token) {
        Claims claims = parseClaims(token, false);
        String userId = claims.getSubject();
        return new UsernamePasswordAuthenticationToken(userId, null, Collections.emptyList());
    }

    public String createAccessToken(String userId, String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + accessTokenExpiration);

        return Jwts.builder()
                .setSubject(userId) // 유저 아이디
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .claim("email", email)
                .signWith(SignatureAlgorithm.HS512, accessSecret)
                .compact();
    }

    public String createRefreshToken(String userId, String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + refreshTokenExpiration);

        return Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .claim("email", email)
                .signWith(SignatureAlgorithm.HS512, refreshSecret)
                .compact();
    }

    public JwtResponse refreshAccessToken(String refreshToken) {
        validateToken(refreshToken, true);
        Claims claims = parseClaims(refreshToken, true);
        String userId = claims.getSubject();
        String email = claims.get("email", String.class);

        String newAccessToken = createAccessToken(userId, email);
        return new JwtResponse(newAccessToken, refreshToken);
    }
}
