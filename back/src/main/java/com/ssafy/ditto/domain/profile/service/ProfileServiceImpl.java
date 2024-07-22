package com.ssafy.ditto.domain.profile.service;

import com.ssafy.ditto.domain.classes.repository.ClassRepository;
import com.ssafy.ditto.domain.file.repository.FileRepository;
import com.ssafy.ditto.domain.file.service.FileService;
import com.ssafy.ditto.domain.post.domain.Post;
import com.ssafy.ditto.domain.post.dto.PostList;
import com.ssafy.ditto.domain.post.exception.PostException;
import com.ssafy.ditto.domain.post.repository.PostRepository;
import com.ssafy.ditto.domain.profile.dto.ProfileList;
import com.ssafy.ditto.domain.profile.dto.ProfileResponse;
import com.ssafy.ditto.domain.profile.repository.ProfileRepository;
import com.ssafy.ditto.domain.review.repository.ReviewRepository;
import com.ssafy.ditto.domain.tag.domain.Tag;
import com.ssafy.ditto.domain.tag.repository.TagRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.domain.UserTag;
import com.ssafy.ditto.domain.user.repository.UserTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.math.BigDecimal;
import java.math.RoundingMode;

@Component
@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {
    public final ProfileRepository profileRepository;
    public final PostRepository postRepository;
    public final TagRepository tagRepository;
    public final UserTagRepository userTagRepository;
    public final ClassRepository classRepository;
    public final ReviewRepository reviewRepository;
    public final FileService fileService;
    public final FileRepository fileRepository;

    @Override
    public ProfileList searchUser(Map<String, String> map) {
        return null;
    }

    @Override
    public ProfileResponse getProfile(int userId) {
        User user = profileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Tag> tags = tagRepository.findByUserId(userId);

        ProfileResponse profileResponse = new ProfileResponse();
        profileResponse.setUserId(user.getUserId());
        profileResponse.setRoleId(user.getRoleId().getRoleId());
        profileResponse.setNickname(user.getNickname());
        profileResponse.setUploadFileName(user.getFile().getFileName());
        profileResponse.setFileUrl(user.getFile().getFileName());

        int likeCount = profileRepository.countLikesByUserId(userId);
        profileResponse.setLikeCount(likeCount);

        Integer studentSum = profileRepository.getTotalStudentSumByUserId(userId);
        profileResponse.setStudentSum(studentSum != null ? studentSum : 0);

        // Set average rating
        Integer ratingSum = profileRepository.getTotalRatingSumByUserId(userId);
        Integer reviewCount = profileRepository.getTotalReviewCountByUserId(userId);
        float avgRating = 0f;
        if (reviewCount != null && reviewCount > 0) {
            avgRating = ratingSum != null ? (float) ratingSum / reviewCount : 0f;
            avgRating = new BigDecimal(avgRating).setScale(2, RoundingMode.HALF_UP).floatValue();
        }
        profileResponse.setAvgRating(avgRating);

        profileResponse.setIntro(user.getIntro());
        profileResponse.setTags(tags);

        return profileResponse;
    }

    @Override
    public String modifyImage(int userId, MultipartFile requestFile) {
        User user = profileRepository.findById(userId)
                .orElse(null);

        if (user.getFileId() != null) {
            fileService.deleteFile(user.getFileId());
        }

        int fileId = fileService.saveFile(requestFile);
        user.setFileId(fileId);
        profileRepository.save(user);
        return "";
    }

    @Override
    public String deleteImage(int userId) {
        User user = profileRepository.findById(userId)
                .orElse(null);

        if (user.getFileId() != null) {
            fileService.deleteFile(user.getFileId());
            user.setFileId(null);
            profileRepository.save(user);
            return "Image deleted successfully";
        } else {
            return "No image to delete";
        }
    }

    @Override
    public String modifyIntro(int userId, String intro) {
        User user = profileRepository.findById(userId)
                .orElse(null);

//        user.setIntro(intro);
        profileRepository.save(user);
        return "Intro modified successfully";
    }

    @Override
    public String modifyTag(int userId, List<String> tags) {
        User user = profileRepository.findById(userId)
                .orElse(null);
        for (String tagName : tags){
            UserTag userTag = UserTag.builder()
                    .userId(user)
                    .tagId(tagRepository.findByTagName(tagName))
                    .build();

            userTag = userTagRepository.save(userTag);
        }
        return "관심사 수정";
    }

    @Override
    public PostList userPost(int userId) {
        return null;
    }

    @Override
    public String addLike(int likeGetterId, int likeGiverId) {
        User getter = profileRepository.findById(likeGetterId).orElse(null);
        User giver = profileRepository.findById(likeGetterId).orElse(null);
        profileRepository.addLike(likeGetterId,likeGiverId);
        return likeGetterId+"번 유저 "+likeGiverId+"번 유저가 좋아요 누름";
    }

    @Override
    public String removeLike(int likeGetterId, int likeGiverId) {
        User getter = profileRepository.findById(likeGetterId).orElse(null);
        User giver = profileRepository.findById(likeGetterId).orElse(null);
        profileRepository.removeLike(likeGetterId,likeGiverId);
        return likeGetterId+"번 유저 "+likeGiverId+"번 유저가 좋아요 취소";
    }

    @Override
    public Boolean checkLike(int likeGetterId, int likeGiverId) {
        User getter = profileRepository.findById(likeGetterId).orElse(null);
        User giver = profileRepository.findById(likeGetterId).orElse(null);
        int count = profileRepository.checkLike(likeGetterId,likeGiverId);
        return count==1;
    }
}
