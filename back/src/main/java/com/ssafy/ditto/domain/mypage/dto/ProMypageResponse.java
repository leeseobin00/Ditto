package com.ssafy.ditto.domain.mypage.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(title = "프로 마이페이지 응답", description = "프로 마이페이지 응답 DTO")
public class ProMypageResponse {
    @Schema(description = "이메일", example = "example@example.com")
    private String email;

    @Schema(description = "닉네임", example = "홍길동")
    private String nickname;

    @Schema(description = "파일 Id", example = "1")
    private Integer fileId;

    @Schema(description = "파일 URL", example = "https://example.com/file")
    private String fileUrl;

    @Schema(description = "계좌 ID", example = "1")
    private Integer accountId;

    @Schema(description = "계좌 번호", example = "123-456-789")
    private String accountNumber;

    @Schema(description = "은행명", example = "국민은행")
    private String bank;

    @Schema(description = "수신자", example = "홍길동")
    private String receiver;
}
