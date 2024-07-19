package com.ssafy.ditto.domain.comment.dto;
import com.ssafy.ditto.global.shared.BaseTimeEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CommentResponse extends BaseTimeEntity {
    private int commentId;
    private int parentId;
    private String username;
    private String content;
    private Byte level;
    private Boolean isDeleted;
    private List<CommentResponse> children;
}
