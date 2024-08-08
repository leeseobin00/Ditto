package com.ssafy.ditto.domain.profile.controller;

import com.ssafy.ditto.domain.classes.dto.ClassListResponse;
import com.ssafy.ditto.domain.post.dto.PostList;
import com.ssafy.ditto.domain.profile.dto.ProfileList;
import com.ssafy.ditto.domain.profile.dto.ProfileResponse;
import com.ssafy.ditto.domain.profile.dto.UserClassListResponse;
import com.ssafy.ditto.domain.profile.service.ProfileService;
import com.ssafy.ditto.domain.review.dto.ReviewDetailResponse;
import com.ssafy.ditto.global.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

import static com.ssafy.ditto.global.dto.ResponseMessage.*;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/profiles")
public class ProfileController {
    private final ProfileService profileService;

    @Operation(summary = "유저 목록 조회", description = "유저 목록을 조회합니다.")
    @ApiResponse(responseCode = "200", description = "유저 목록 조회 성공")
    @GetMapping
    public ResponseDto<ProfileList> getUserList(@RequestParam Map<String, String> map) {
        ProfileList profileList = profileService.searchUser(map);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), profileList);
    }

    @Operation(summary = "유저 프로필 조회", description = "유저 프로필을 조회합니다.")
    @ApiResponse(responseCode = "200", description = "유저 프로필 조회 성공")
    @GetMapping("/{userId}")
    public ResponseDto<ProfileResponse> getProfile(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId) {
        ProfileResponse profileResp = profileService.getProfile(userId);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), profileResp);
    }

    @Operation(summary = "프로필 사진 수정", description = "유저의 프로필 사진을 수정합니다.")
    @ApiResponse(responseCode = "200", description = "프로필 사진 수정 성공")
    @PatchMapping("/image")
    public ResponseDto<String> updateProfileImage(@Parameter(description = "유저 ID", example = "1") @RequestParam("userId") int userId, @RequestPart(value = "file") MultipartFile file) {
        profileService.modifyImage(userId, file);
        return ResponseDto.of(OK.value(), SUCCESS_UPDATE.getMessage(), "프로필 사진 수정 성공");
    }

    @Operation(summary = "프로필 사진 삭제", description = "유저의 프로필 사진을 삭제합니다.")
    @ApiResponse(responseCode = "200", description = "프로필 사진 삭제 성공")
    @DeleteMapping("/image")
    public ResponseDto<String> deleteProfileImage(@Parameter(description = "유저 ID", example = "1") @RequestParam("userId") int userId) {
        profileService.deleteImage(userId);
        return ResponseDto.of(OK.value(), SUCCESS_DELETE.getMessage(), "프로필 사진 삭제 성공");
    }

    @Operation(summary = "프로필 소개 수정", description = "유저의 프로필 소개를 수정합니다.")
    @ApiResponse(responseCode = "200", description = "프로필 소개 수정 성공")
    @PatchMapping("/intro")
    public ResponseDto<String> updateProfileIntro(@Parameter(description = "유저 ID", example = "1") @RequestParam("userId") int userId, @RequestBody Map<String, String> map) {
        String response = profileService.modifyIntro(userId, map);
        return ResponseDto.of(OK.value(), SUCCESS_UPDATE.getMessage(), response);
    }

    @Operation(summary = "프로필 태그 수정", description = "유저의 프로필 태그를 수정합니다.")
    @ApiResponse(responseCode = "200", description = "프로필 태그 수정 성공")
    @PatchMapping("/tag")
    public ResponseDto<String> updateProfileTag(@Parameter(description = "유저 ID", example = "1") @RequestParam("userId") int userId, @RequestBody Map<String, String> map) {
        String response = profileService.modifyTag(userId, map);
        return ResponseDto.of(OK.value(), SUCCESS_UPDATE.getMessage(), response);
    }

    @Operation(summary = "유저 게시물 조회", description = "유저의 게시물을 조회합니다.")
    @ApiResponse(responseCode = "200", description = "유저 게시물 조회 성공")
    @GetMapping("/{userId}/post")
    public ResponseDto<PostList> getUserPost(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId, @RequestParam Map<String, String> map) {
        PostList postList = profileService.userPost(userId, map);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), postList);
    }

    @Operation(summary = "유저 클래스 조회", description = "유저의 클래스를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "유저 클래스 조회 성공")
    @GetMapping("/{userId}/class")
    public ResponseDto<UserClassListResponse> getUserClass(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId,
                                                       @Parameter(description = "페이지 번호", example = "1") @RequestParam int page,
                                                       @Parameter(description = "페이지 크기", example = "10") @RequestParam int size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        UserClassListResponse classList = profileService.userClass(userId, pageRequest);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), classList);
    }

    @Operation(summary = "프로 클래스 조회", description = "프로의 클래스를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "프로 클래스 조회 성공")
    @GetMapping("/{userId}/pro-class")
    public ResponseDto<UserClassListResponse> getProClass(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId,
                                                      @Parameter(description = "페이지 번호", example = "1") @RequestParam int page,
                                                      @Parameter(description = "페이지 크기", example = "10") @RequestParam int size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        UserClassListResponse classList = profileService.proClass(userId, pageRequest);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), classList);
    }

    @Operation(summary = "유저 리뷰 조회", description = "유저의 리뷰를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "유저 리뷰 조회 성공")
    @GetMapping("/{userId}/review")
    public ResponseDto<Page<ReviewDetailResponse>> getUserReview(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId,
                                                                 @Parameter(description = "페이지 번호", example = "0") @RequestParam int page,
                                                                 @Parameter(description = "페이지 크기", example = "10") @RequestParam int size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        Page<ReviewDetailResponse> reviewList = profileService.userReview(userId, pageRequest);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), reviewList);
    }

    @Operation(summary = "유저 좋아요 확인", description = "유저에 대한 좋아요 여부를 확인합니다.")
    @ApiResponse(responseCode = "200", description = "유저 좋아요 여부 확인 성공")
    @GetMapping("/{userId}/like")
    public ResponseDto<Boolean> checkLikeUser(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId,
                                              @Parameter(description = "확인할 유저 ID", example = "2") @RequestParam("seekerId") int seekerId) {
        Boolean liked = profileService.checkLike(userId, seekerId);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), liked);
    }

    @Operation(summary = "유저 좋아요 추가", description = "유저에 대한 좋아요를 추가합니다.")
    @ApiResponse(responseCode = "200", description = "유저 좋아요 추가 성공")
    @PostMapping("/{userId}/like")
    public ResponseDto<String> addLikeUser(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId,
                                           @Parameter(description = "좋아요할 유저 ID", example = "2") @RequestParam("seekerId") int seekerId) {
        String response = profileService.addLike(userId, seekerId);
        return ResponseDto.of(OK.value(), SUCCESS_LIKE.getMessage(), response);
    }

    @Operation(summary = "유저 좋아요 삭제", description = "유저에 대한 좋아요를 삭제합니다.")
    @ApiResponse(responseCode = "200", description = "유저 좋아요 삭제 성공")
    @DeleteMapping("/{userId}/like")
    public ResponseDto<String> removeLikeUser(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId,
                                              @Parameter(description = "삭제할 유저 ID", example = "2") @RequestParam("seekerId") int seekerId) {
        String response = profileService.removeLike(userId, seekerId);
        return ResponseDto.of(OK.value(), SUCCESS_UNLIKE.getMessage(), response);
    }
}
