package com.ssafy.ditto.domain.post.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class PostRequest {

    private Integer userId;
    private Integer boardId;
    private Integer categoryId;
    private Integer tagId;
    private String title;
    private String content;
}
