package com.ssafy.ditto.domain.mypage.dto;

import com.google.type.Decimal;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@Schema(title = "좋아요 클래스 응답", description = "좋아요 클래스 응답 DTO")
public class LikeClassResponse {
    @Schema(description = "클래스 ID", example = "1")
    private Integer classId;

    @Schema(description = "클래스명", example = "클래스 이름입니다.")
    private String className;

    @Schema(description = "클래스 가격", example = "10000")
    private Integer classPrice;

    @Schema(description = "클래스 시간 (시간)", example = "1")
    private Byte classHour;

    @Schema(description = "클래스 시간 (분)", example = "30")
    private Byte classMinute;

    @Schema(description = "좋아요 수", example = "100")
    private Integer likeCount;

    @Schema(description = "리뷰 수", example = "50")
    private Integer reviewCount;

    @Schema(description = "평점 합계", example = "250")
    private Integer ratingSum;

    @Schema(description = "평점", example = "4")
    private Double averageRating;

    @Schema(description = "유저 ID", example = "1")
    private Integer userId;

    @Schema(description = "유저 닉네임", example = "홍길동")
    private String nickname;

    @Schema(description = "태그 ID", example = "1")
    private Integer tagId;

    @Schema(description = "태그명", example = "태그 이름입니다.")
    private String tagName;

    @Schema(description = "파일 ID", example = "1")
    private Integer fileId;

    @Schema(description = "파일 URL", example = "https://example.com/file")
    private String fileUrl;

    @Schema(description = "좋아요 클래스 ID", example = "1")
    private Integer likeClassId;

    @Schema(description = "생성 날짜", example = "2023-01-01T00:00:00")
    private LocalDateTime createdDate;

    @Schema(description = "수정 날짜", example = "2023-01-01T00:00:00")
    private LocalDateTime modifiedDate;
}
