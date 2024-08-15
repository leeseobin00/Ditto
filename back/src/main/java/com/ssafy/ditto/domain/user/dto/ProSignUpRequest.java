package com.ssafy.ditto.domain.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@Schema(title = "POST : 강사 회원 가입", description = "강사 유저가 회원가입한다.")
public class ProSignUpRequest {

    @Schema(description = "이메일 주소", example = "example@example.com")
    private String email;

    @Schema(description = "비밀번호", example = "password123")
    private String password;

    @Schema(description = "닉네임", example = "SSAFY")
    private String nickname;

    @Schema(description = "역할 ID", example = "2")
    private Integer role;

    @Schema(description = "이름", example = "이강사")
    private String name;

    @Schema(description = "전화번호", example = "010-1234-5678")
    private String phoneNumber;

    @Schema(description = "시작 날짜", example = "2023-01-01T00:00:00")
    private LocalDateTime startDate;

    @Schema(description = "최소 활동 시간", example = "5")
    private Byte minActive;

    @Schema(description = "경험", example = "5 년 근무한 경험이 있습니다. ")
    private String experience;

    @Schema(description = "코멘트", example = "뜨개질 학과를 졸업했습니다.")
    private String comment;

    @Schema(description = "이용약관 동의 여부", example = "true")
    private Boolean agreeTOS;

    @Schema(description = "개인정보 처리방침 동의 여부", example = "true")
    private Boolean agreePICU;

    @Schema(description = "관심 태그 목록", example = "[\"뜨개질\", \"양초\"]")
    private List<String> tagName;
}
