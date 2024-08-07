package com.ssafy.ditto.domain.post.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class PostRequest {

    @Schema(description = "사용자 ID", example = "1")
    private Integer userId;

    @Schema(description = "게시판 ID", example = "1")
    private Integer boardId;

    @Schema(description = "카테고리 ID", example = "1")
    private Integer categoryId;

    @Schema(description = "태그 ID", example = "1")
    private Integer tagId;

    @Schema(description = "제목", example = "test_title")
    private String title;

    @Schema(description = "내용", example = "test_content")
    private String content;
}
