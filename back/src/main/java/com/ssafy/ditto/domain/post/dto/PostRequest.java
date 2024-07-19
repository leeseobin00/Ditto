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
    private String title;
    private String content;
    private String username;
    private int userId;
    private int postId;
    private int boardId;
    private int categoryId;
    private int tagId;
//    @Schema(description = "업로드 파일 정보")
//    private List<FileInfoDto> files;
}
