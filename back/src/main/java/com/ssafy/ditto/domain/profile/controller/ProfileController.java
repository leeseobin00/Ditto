package com.ssafy.ditto.domain.profile.controller;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.post.dto.PostList;
import com.ssafy.ditto.domain.profile.dto.ProfileList;
import com.ssafy.ditto.domain.profile.dto.ProfileResponse;
import com.ssafy.ditto.domain.profile.service.ProfileService;
import com.ssafy.ditto.domain.review.domain.Review;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

import static com.ssafy.ditto.global.dto.ResponseMessage.*;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/profiles")
public class ProfileController {
    private final ProfileService profileService;

    @GetMapping
    public ResponseDto<ProfileList> getUserList(@RequestParam Map<String, String> map){
        ProfileList profileList = profileService.searchUser(map);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(),profileList);
    }

    @GetMapping("/{userId}")
    public ResponseDto<ProfileResponse> getProfile(@PathVariable("userId") int userId){
        ProfileResponse profileResp = profileService.getProfile(userId);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(),profileResp);
    }

    @PatchMapping("/image")
    public ResponseDto<String> updateProfileImage(@RequestParam("userId") int userId, @RequestPart(value = "file") MultipartFile file){
        profileService.modifyImage(userId, file);
        return ResponseDto.of(OK.value(), SUCCESS_UPDATE.getMessage(), "프로필 사진 수정 성공");
    }

    @DeleteMapping("/image")
    public ResponseDto<String> deleteProfileImage(@RequestParam("userId") int userId){
        profileService.deleteImage(userId);
        return ResponseDto.of(OK.value(), SUCCESS_DELETE.getMessage(), "프로필 사진 삭제 성공");
    }

    @PatchMapping("/intro")
    public ResponseDto<String> updateProfileIntro(@RequestParam("userId") int userId, @RequestBody String intro){
        String response = profileService.modifyIntro(userId, intro);
        return ResponseDto.of(OK.value(), SUCCESS_UPDATE.getMessage(), response);
    }

    @PatchMapping("/tag")
    public ResponseDto<String> updateProfileTag(@RequestParam("userId") int userId, @RequestBody List<String> tags) {
        String response = profileService.modifyTag(userId, tags);
        return ResponseDto.of(OK.value(), SUCCESS_UPDATE.getMessage(), response);
    }

    @GetMapping("/{userId}/post")
    public ResponseDto<PostList> getUserPost(@PathVariable("userId") int userId, @RequestParam Map<String,String> map){
        PostList postList = profileService.userPost(userId,map);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(),postList);
    }

    @GetMapping("/{userId}/class")
    public ResponseDto<List<DClass>> getUserClass(@PathVariable("userId") int userId){

        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(),null);
    }

    @GetMapping("/{userId}/review")
    public ResponseDto<List<Review>> getUserReview(@PathVariable("userId") int userId){

        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(),null);
    }


    @GetMapping("/{userId}/like")
    public ResponseDto<Boolean> checkLikePost(@PathVariable("userId") int userId, @RequestParam("seekerId") int seekerId){
        Boolean liked = profileService.checkLike(userId,seekerId);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(),liked);
    }

    @PostMapping("/{userId}/like")
    public ResponseDto<String> addLikePost(@PathVariable("userId") int userId, @RequestParam("seekerId") int seekerId){
        String response = profileService.addLike(userId,seekerId);
        return ResponseDto.of(OK.value(), SUCCESS_LIKE.getMessage(),response);
    }

    @DeleteMapping("/{userId}/like")
    public ResponseDto<String> removeLikePost(@PathVariable("userId") int userId, @RequestParam("seekerId") int seekerId){
        String response = profileService.removeLike(userId,seekerId);
        return ResponseDto.of(OK.value(), SUCCESS_UNLIKE.getMessage(),response);
    }
}
