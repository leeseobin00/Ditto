package com.ssafy.ditto.domain.post.dto;

import java.util.List;

import com.ssafy.ditto.domain.post.domain.Post;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Schema(title = "PostList : 게시글 목록 정보", description = "게시글 목록과 페이지네이션 정보를 나타낸다.")
public class PostList {

    @Schema(description = "게시글 목록")
    private List<Post> posts;
    @Schema(description = "현재 페이지")
    private int currentPage;
    @Schema(description = "전체 페이지 수")
    private int totalPageCount;
}
