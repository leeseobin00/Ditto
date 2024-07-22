package com.ssafy.ditto.domain.post.dto;

import java.util.ArrayList;
import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class PostList {

    @Schema(description = "게시글 목록")
    private List<PostResponse> posts = new ArrayList<>();

    @Schema(description = "현재 페이지")
    private Integer currentPage;

    @Schema(description = "전체 페이지 수")
    private Integer totalPageCount;
}
