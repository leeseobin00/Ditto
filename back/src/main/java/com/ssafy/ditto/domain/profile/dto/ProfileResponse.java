package com.ssafy.ditto.domain.profile.dto;

import com.ssafy.ditto.domain.tag.domain.Tag;
import com.ssafy.ditto.domain.user.domain.User;
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

    public ProfileResponse(int userId, String nickname, String fileUrl) {
        this.userId = userId;
        this.nickname = nickname;
        this.fileUrl = fileUrl;
    }


    public static ProfileResponse of(User user) {
        return new ProfileResponse(
                user.getUserId(),
                user.getNickname(),
                user.getFileId().getFileUrl()
        );
    }
}
