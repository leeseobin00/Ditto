package com.ssafy.ditto.domain.profile.service;

import com.ssafy.ditto.domain.classes.dto.ClassListResponse;
import com.ssafy.ditto.domain.post.dto.PostList;
import com.ssafy.ditto.domain.profile.dto.ProfileResponse;
import com.ssafy.ditto.domain.profile.dto.ProfileList;
import com.ssafy.ditto.domain.profile.dto.UserClassListResponse;
import com.ssafy.ditto.domain.review.dto.ReviewDetailResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface ProfileService {
    ProfileList searchUser(Map<String,String> map);
    ProfileResponse getProfile(int userId);

    void modifyImage(int userId, MultipartFile requestFile);
    void deleteImage(int userId);

    String modifyIntro(int userId, Map<String, String> map);
    String modifyTag(int userId, Map<String, String> map);

    PostList userPost(int userId, Map<String,String> map);
    UserClassListResponse userClass(int userId, PageRequest pageRequest);
    UserClassListResponse proClass(int userId, PageRequest pageRequest);
    Page<ReviewDetailResponse> userReview(int userId, PageRequest pageRequest);

    String addLike(int likeGetterId, int likeGiverId);
    String removeLike(int likeGetterId, int likeGiverId);
    Boolean checkLike(int likeGetterId, int likeGiverId);

}
