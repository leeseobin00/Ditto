package com.ssafy.ditto.domain.profile.dto;

import com.ssafy.ditto.domain.user.domain.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Schema(title = "프로필 응답", description = "프로필 응답 DTO")
public class ProfileResponse {
    @Schema(description = "유저 ID", example = "1")
    private Integer userId;

    @Schema(description = "역할 ID", example = "1")
    private Integer roleId;

    @Schema(description = "닉네임", example = "홍길동")
    private String nickname;

    @Schema(description = "파일 ID", example = "1")
    private Integer fileId;

    @Schema(description = "업로드 파일명", example = "profile.jpg")
    private String uploadFileName;

    @Schema(description = "파일 URL", example = "https://example.com/file")
    private String fileUrl;

    @Schema(description = "좋아요 수", example = "100")
    private Integer likeCount;

    @Schema(description = "학생 수", example = "50")
    private Integer studentSum;

    @Schema(description = "평균 평점", example = "4.5")
    private Float avgRating;

    @Schema(description = "소개", example = "안녕하세요, 홍길동입니다.")
    private String intro;

    @Schema(description = "태그 목록")
    private List<String> tags;

    public ProfileResponse(Integer userId, Integer roleId, String nickname, Integer fileId, String uploadFileName, String fileUrl, Integer likeCount, Integer studentSum, Float avgRating, String intro, List<String> tags) {
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

    public ProfileResponse(int userId, String nickname, int fileId, String fileUrl, List<String> tags, int likeCount) {
        this.userId = userId;
        this.nickname = nickname;
        this.fileId = fileId;
        this.fileUrl = fileUrl;
        this.tags = tags;
        this.likeCount = likeCount;
    }

    public static ProfileResponse of(User user, List<String> tags, int likeCount) {
        return new ProfileResponse(
                user.getUserId(),
                user.getNickname(),
                user.getFileId().getFileId(),
                user.getFileId().getFileUrl(),
                tags,
                likeCount
        );
    }
}
