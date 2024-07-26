package com.ssafy.ditto.domain.mypage.dto;

import com.ssafy.ditto.domain.tag.domain.Tag;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class LikeUserResponse {
    private Integer userId;
    private String nickname;
    private List<Tag> tags;
    private Integer fileId;
    private String fileUrl;
    private Integer likeUserId;
    private LocalDateTime createdDate;
}
