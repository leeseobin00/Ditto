package com.ssafy.ditto.global.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseDto<T> {
    private int code;
    private String message;
    private T data;

    public static <T> ResponseDto<T> of(int code, String message) {
        return new ResponseDto(code, message, null);
    }

    public static <T> ResponseDto<T> of(int code, String message, T dto) {
        return new ResponseDto(code, message, dto);
    }
}