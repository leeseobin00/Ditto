package com.ssafy.ditto.domain.post.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class PostRequest {

    private Integer postId;
    private Integer userId;
    private Integer boardId;
    private Integer categoryId;
    private Integer tagId;
    private String title;
    private String content;

    private List<MultipartFile> files;
}
