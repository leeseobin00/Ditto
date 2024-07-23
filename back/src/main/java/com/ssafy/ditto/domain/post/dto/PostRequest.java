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

    private Integer userId;
    private Integer boardId;
    private Integer categoryId;
    private Integer tagId;
    private String title;
    private String content;
<<<<<<< HEAD
=======

    private List<MultipartFile> files;
>>>>>>> 1f28d76b38f5c67d876710b4b8c6cb9ce14f6ee5
}
