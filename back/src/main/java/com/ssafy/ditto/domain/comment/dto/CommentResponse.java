package com.ssafy.ditto.domain.comment.dto;
import com.ssafy.ditto.domain.comment.domain.Comment;
import com.ssafy.ditto.global.shared.BaseTimeEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CommentResponse extends BaseTimeEntity {
    private Integer commentId;
    private Integer parentId;
    private Integer userId;
    private String nickname;
    private Integer fileId;
    private String fileUrl;
    private String content;
    private Byte level;
    private Boolean isDeleted;
    private List<CommentResponse> children = new ArrayList<>();

    public CommentResponse(Integer commentId, Integer parentId, Integer userId,
                           String nickname, Integer fileId, String fileUrl, String content,
                           Byte level, Boolean isDeleted, List<CommentResponse> children) {
        this.commentId = commentId;
        this.parentId = parentId;
        this.userId = userId;
        this.nickname = nickname;
        this.fileId = fileId;
        this.fileUrl = fileUrl;
        this.content = content;
        this.level = level;
        this.isDeleted = isDeleted;
        this.children = children;
    }

    public static CommentResponse of(Comment comment){
        return new CommentResponse(
                comment.getCommentId(),
                comment.getParent() != null ? comment.getParent().getCommentId() : -1,
                comment.getUser().getUserId(),
                comment.getUser().getNickname(),
                comment.getUser().getFileId().getFileId(),
                comment.getUser().getFileId().getFileUrl(),
                comment.getContent(),
                comment.getLevel(),
                comment.getIsDeleted(),
                comment.getChildren().stream().map(CommentResponse::of).collect(Collectors.toList())
        );
    }
}
