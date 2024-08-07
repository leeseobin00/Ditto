package com.ssafy.ditto.domain.comment.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CommentRequest {

    @Schema(description = "사용자 ID", example = "1")
    private Integer userId;

    @Schema(description = "댓글 내용", example = "1")
    private String content;

    @Schema(description = "대댓글의 경우 부모댓글 ID, 원 댓글의 경우 -1", example = "-1")
    private Integer parentId;
}
