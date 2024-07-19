package com.ssafy.ditto.domain.post.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class PostResponse {
    private Integer postId;
    private Integer userId;
    private Integer boardId;
    private Integer tagId;
    private Integer categoryId;
    private String title;
    private String content;
    private Integer viewCount;
    private Boolean isDeleted;
    private Integer likeCount;
    private Integer commentCount;

}
