package com.ssafy.ditto.domain.post.dto;

import com.ssafy.ditto.domain.file.domain.File;
import com.ssafy.ditto.domain.post.domain.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class PostResponse {
    private Integer postId;
    private Integer userId;
    private String nickname;
    private Integer boardId;
    private String boardName;
    private Integer tagId;
    private String tagName;
    private Integer categoryId;
    private String categoryName;
    private String title;
    private String content;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private Integer viewCount;
    private Boolean isDeleted;
    private Integer likeCount;
    private Integer commentCount;
    private List<File> files;

    public PostResponse(Integer postId, Integer userId, String nickname, Integer boardId, String boardName,
                        Integer tagId, String tagName, Integer categoryId, String categoryName,
                        String title, String content, LocalDateTime createdDate, LocalDateTime modifiedDate,
                        Integer viewCount, Boolean isDeleted,
                        Integer likeCount, Integer commentCount) {
        this.postId=postId;
        this.userId=userId;
        this.nickname = nickname;
        this.boardId=boardId;
        this.boardName=boardName;
        this.tagId=tagId;
        this.tagName=tagName;
        this.categoryId=categoryId;
        this.categoryName=categoryName;
        this.title=title;
        this.content=content;
        this.createdDate=createdDate;
        this.modifiedDate=modifiedDate;
        this.viewCount=viewCount;
        this.isDeleted=isDeleted;
        this.likeCount=likeCount;
        this.commentCount=commentCount;
    }

    public static PostResponse of(Post post){
        return new PostResponse(
                post.getPostId(),
                post.getUser().getUserId(),
                post.getUser().getNickname(),
                post.getBoard().getBoardId(),
                post.getBoard().getBoardName(),
                post.getTag().getTagId(),
                post.getTag().getTagName(),
                post.getCategory().getCategoryId(),
                post.getCategory().getCategoryName(),
                post.getTitle(),
                post.getContent(),
                post.getCreatedDate(),
                post.getModifiedDate(),
                post.getViewCount(),
                post.getIsDeleted(),
                post.getLikeCount(),
                post.getCommentCount()
        );
    }
}
