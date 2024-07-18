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
@Schema(title = "PostRequest : 게시글 요청 정보", description = "게시글 생성 요청에 필요한 정보를 나타낸다.")
public class PostRequest {

    @Schema(description = "글 제목")
    private String title;
    @Schema(description = "글 내용")
    private String content;
    @Schema(description = "사용자 이름")
    private String username;
    @Schema(description = "사용자 ID")
    private int userId;
    @Schema(description = "게시글 ID")
    private int postId;
    @Schema(description = "게시판 ID")
    private int boardId;
    @Schema(description = "카테고리 ID")
    private int categoryId;
    @Schema(description = "태그 ID")
    private int tagId;
//    @Schema(description = "업로드 파일 정보")
//    private List<FileInfoDto> files;
}
