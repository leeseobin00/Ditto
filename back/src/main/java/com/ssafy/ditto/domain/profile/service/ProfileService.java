package com.ssafy.ditto.domain.profile.service;

import com.ssafy.ditto.domain.post.dto.PostList;
import com.ssafy.ditto.domain.profile.dto.ProfileResponse;
import com.ssafy.ditto.domain.profile.dto.ProfileList;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ProfileService {
    ProfileList searchUser(Map<String,String> map);
    ProfileResponse getProfile(int userId);

    void modifyImage(int userId, MultipartFile requestFile);
    void deleteImage(int userId);

    String modifyIntro(int userId, String intro);
    String modifyTag(int userId, List<String> tags);

    PostList userPost(int userId, Map<String,String> map);
//    List<DClass> userClass(int userId);
//    List<Review> userReview(int userId);

    String addLike(int likeGetterId, int likeGiverId);
    String removeLike(int likeGetterId, int likeGiverId);
    Boolean checkLike(int likeGetterId, int likeGiverId);
}
