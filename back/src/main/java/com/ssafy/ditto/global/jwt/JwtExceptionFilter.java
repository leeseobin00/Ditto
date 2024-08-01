package com.ssafy.ditto.global.jwt;

import com.ssafy.ditto.global.error.ErrorCode;
import com.ssafy.ditto.global.jwt.exception.ExpiredTokenException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtExceptionFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        }catch (ExpiredTokenException e){
            System.out.println("ExpiredTokenException catch");
            setErrorResponse(HttpStatus.UNAUTHORIZED, response, ErrorCode.EXPIRED_TOKEN);
        }
    }

    public static void setErrorResponse(HttpStatus httpStatus, HttpServletResponse response , ErrorCode errorcode) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(httpStatus.value());

        String json = String.format("{\"errorCode\": \"%s\", \"message\": \"%s\"}", errorcode.getCode(), errorcode.getMessage());

        response.getWriter().write(json);
    }
}
