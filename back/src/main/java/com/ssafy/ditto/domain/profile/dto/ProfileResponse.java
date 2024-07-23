package com.ssafy.ditto.domain.profile.dto;

import com.ssafy.ditto.domain.tag.domain.Tag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ProfileResponse {
    private Integer userId;
    private Integer roleId;
    private String nickname;
    private String uploadFileName;
    private String fileUrl;
    private Integer likeCount;
    private Integer studentSum;
    private Float avgRating;
    private String intro;
    private List<Tag> tags;
}
