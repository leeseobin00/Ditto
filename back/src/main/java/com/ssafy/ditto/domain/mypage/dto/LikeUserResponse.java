package com.ssafy.ditto.domain.mypage.dto;

import com.ssafy.ditto.domain.tag.domain.Tag;
import com.ssafy.ditto.domain.tag.dto.TagResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@Schema(title = "좋아요 유저 응답", description = "좋아요 유저 응답 DTO")
public class LikeUserResponse {
    @Schema(description = "유저 ID", example = "1")
    private Integer userId;

    @Schema(description = "유저 닉네임", example = "홍길동")
    private String nickname;

    @Schema(description = "태그 목록")
    private List<TagResponse> tags;

    @Schema(description = "파일 ID", example = "1")
    private Integer fileId;

    @Schema(description = "파일 URL", example = "https://example.com/file")
    private String fileUrl;

    @Schema(description = "좋아요 유저 ID", example = "1")
    private Integer likeUserId;

    @Schema(description = "생성 날짜", example = "2023-01-01T00:00:00")
    private LocalDateTime createdDate;
}
