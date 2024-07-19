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

    private Integer postId;
    private Integer userId;
    private String username;
    private Integer boardId;
    private Integer categoryId;
    private Integer tagId;
    private String title;
    private String content;

//    @Schema(description = "업로드 파일 정보")
//    private List<FileInfoDto> files;
}
