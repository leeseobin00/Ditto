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
    private Integer fileId;
    private String uploadFileName;
    private String fileUrl;
    private Integer likeCount;
    private Integer studentSum;
    private Float avgRating;
    private String intro;
    private List<String> tags;

    public ProfileResponse(Integer userId, Integer roleId, String nickname,
                           Integer fileId, String uploadFileName, String fileUrl,
                           Integer likeCount, Integer studentSum, Float avgRating,
                           String intro, List<String> tags) {
        this.userId = userId;
        this.roleId = roleId;
        this.nickname = nickname;
        this.fileId = fileId;
        this.uploadFileName = uploadFileName;
        this.fileUrl = fileUrl;
        this.likeCount = likeCount;
        this.studentSum = studentSum;
        this.avgRating = avgRating;
        this.intro = intro;
        this.tags = tags;
    }

    public ProfileResponse(int userId, String nickname, int fileId, String fileUrl, List<String> tags) {
        this.userId = userId;
        this.nickname = nickname;
        this.fileId = fileId;
        this.fileUrl = fileUrl;
        this.tags = tags;
    }


    public static ProfileResponse of(User user, List<String> tags) {
        return new ProfileResponse(
                user.getUserId(),
                user.getNickname(),
                user.getFileId().getFileId(),
                user.getFileId().getFileUrl(),
                tags
        );
    }
}
