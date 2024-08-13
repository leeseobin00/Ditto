package com.ssafy.ditto.domain.profile.service;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.liveroom.domain.Learning;
import com.ssafy.ditto.domain.classes.dto.ClassListResponse;
import com.ssafy.ditto.domain.classes.dto.ClassResponse;
import com.ssafy.ditto.domain.classes.repository.ClassRepository;
import com.ssafy.ditto.domain.liveroom.repository.LearningRepository;
import com.ssafy.ditto.domain.file.domain.File;
import com.ssafy.ditto.domain.file.dto.FileResponse;
import com.ssafy.ditto.domain.file.exception.FileException;
import com.ssafy.ditto.domain.file.repository.FileRepository;
import com.ssafy.ditto.domain.file.service.FileService;
import com.ssafy.ditto.domain.post.dto.PostList;
import com.ssafy.ditto.domain.post.repository.PostRepository;
import com.ssafy.ditto.domain.post.service.PostService;
import com.ssafy.ditto.domain.profile.dto.ProfileList;
import com.ssafy.ditto.domain.profile.dto.ProfileResponse;
import com.ssafy.ditto.domain.profile.dto.UserClassListResponse;
import com.ssafy.ditto.domain.profile.repository.LikeUserRepository;
import com.ssafy.ditto.domain.profile.repository.ProfileRepository;
import com.ssafy.ditto.domain.review.domain.Review;
import com.ssafy.ditto.domain.review.dto.ReviewDetailResponse;
import com.ssafy.ditto.domain.review.repository.ReviewRepository;
import com.ssafy.ditto.domain.tag.domain.Tag;
import com.ssafy.ditto.domain.tag.dto.TagResponse;
import com.ssafy.ditto.domain.tag.repository.TagRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.domain.UserTag;
import com.ssafy.ditto.domain.user.dto.UserResponse;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import com.ssafy.ditto.domain.user.repository.UserTagRepository;
import com.ssafy.ditto.global.error.ServiceException;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.stream.Collectors;

import static com.ssafy.ditto.domain.file.exception.FileErrorCode.FILE_NOT_EXIST;
import static com.ssafy.ditto.global.error.ErrorCode.*;

@Component
@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {
    public final ProfileRepository profileRepository;
    public final LikeUserRepository likeUserRepository;
    public final PostService postService;
    public final PostRepository postRepository;
    public final TagRepository tagRepository;
    public final UserTagRepository userTagRepository;
    public final LearningRepository learningRepository;
    public final ClassRepository classRepository;
    public final ReviewRepository reviewRepository;
    public final FileService fileService;
    public final FileRepository fileRepository;
    public final UserRepository userRepository;

    @Transactional
    @Override
    public ProfileList searchUser(Map<String, String> map) {
        int curPage = Integer.parseInt(map.getOrDefault("page", "1"));
        int sizePage = Integer.parseInt(map.getOrDefault("size", "5"));
        int start = (curPage - 1) * sizePage;

        Integer categoryId = map.get("categoryId") != null && !map.get("categoryId").isEmpty() ? Integer.parseInt(map.get("categoryId")) : null;
        Integer tagId = map.get("tagId") != null && !map.get("tagId").isEmpty() ? Integer.parseInt(map.get("tagId")) : null;
        Integer role = map.get("role") != null && !map.get("role").isEmpty() ? Integer.parseInt(map.get("role")) : null;
        String keyword = map.get("keyword");

        List<User> users = profileRepository.findUsers(categoryId, tagId, role, keyword);
        int userCount = users.size();
        int pageCount = (userCount - 1) / sizePage + 1;

        List<User> paginatedUsers;
        if (start >= users.size()) {
            paginatedUsers = Collections.emptyList();
        } else {
            int end = Math.min(start + sizePage, users.size());
            paginatedUsers = users.subList(start, end);
        }

        List<ProfileResponse> profileResponses = paginatedUsers.stream()
                .map(user -> {
                    int likeCount = likeUserRepository.countLikesByUserId(user.getUserId());
                    List<UserTag> userTags = userTagRepository.findByUserId(user);
                    List<String> tagNames = new ArrayList<>();
                    for(UserTag ut : userTags){
                        Tag tag = tagRepository.findByTagName(ut.getTagId().getTagName());
                        tagNames.add(tag.getTagName());
                    }
                    return ProfileResponse.of(user, tagNames, likeCount);
                })
                .collect(Collectors.toList());

        ProfileList profileList = new ProfileList();
        profileList.setProfiles(profileResponses);
        profileList.setCurrentPage(curPage);
        profileList.setTotalPageCount(pageCount);

        return profileList;
    }

    @Transactional
    @Override
    public ProfileResponse getProfile(int userId) {
        User user = profileRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // UserTag를 기반으로 Tag 리스트를 가져오기
        List<UserTag> userTags = userTagRepository.findByUserId(user);
        List<String> tagNames = userTags.stream()
                .map(userTag -> userTag.getTagId().getTagName())
                .toList();

        int likeCount = likeUserRepository.countLikesByUserId(userId);

        Integer studentSum = profileRepository.getTotalStudentSumByUserId(user);
        Integer ratingSum = profileRepository.getTotalRatingSumByUserId(user);
        Integer reviewCount = profileRepository.getTotalReviewCountByUserId(user);

        float avgRating = 0f;
        if (reviewCount != null && reviewCount > 0) {
            avgRating = ratingSum != null ? (float) ratingSum / reviewCount : 0f;
            avgRating = new BigDecimal(avgRating).setScale(2, RoundingMode.HALF_UP).floatValue();
        }

        return new ProfileResponse(
                user.getUserId(),
                user.getRoleId().getRoleId(),
                user.getNickname(),
                user.getFileId() != null ? user.getFileId().getFileId() : null,
                user.getFileId() != null ? user.getFileId().getUploadFileName() : null,
                user.getFileId() != null ? user.getFileId().getFileUrl() : null,
                likeCount,
                studentSum != null ? studentSum : 0,
                avgRating,
                user.getIntro(),
                tagNames
        );
    }

    @Override
    public void modifyImage(int userId, MultipartFile requestFile) {
        User user = profileRepository.findById(userId).orElseThrow(() -> new ServiceException(USER_NOT_FOUND));

        int fileId = 1;
        try {
            fileId = fileService.saveFile(requestFile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        File file = fileRepository.findById(fileId).orElseThrow((() -> new FileException(FILE_NOT_EXIST)));
        user.changeFile(file);
        profileRepository.save(user);
    }

    @Override
    public void deleteImage(int userId) {
        User user = profileRepository.findById(userId).orElseThrow(() -> new ServiceException(USER_NOT_FOUND));
        File currentFile = user.getFileId();

        // 기본 프로필 이미지로 변경 위한 코드
        File defaultFile = fileRepository.findById(1).orElseThrow((() -> new FileException(FILE_NOT_EXIST)));
        user.changeFile(defaultFile);
        profileRepository.save(user);

        if (user.getFileId() != null) {
            try {
                fileService.deleteFile(currentFile.getFileId());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public String modifyIntro(int userId, Map<String, String> map) {
        User user = profileRepository.findById(userId).orElseThrow(() -> new ServiceException(USER_NOT_FOUND));
        String intro = map.get("intro");
        user.updateIntro(intro);
        profileRepository.save(user);
        return "소개 한마디 수정";
    }

    @Override
    public String modifyTag(int userId, Map<String, String> map) {
        User user = profileRepository.findById(userId).orElseThrow(() -> new ServiceException(USER_NOT_FOUND));

        List<String> tags = new ArrayList<>();
        for (Map.Entry<String, String> entry : map.entrySet()) {
            tags.add(entry.getValue());
        }

        List<UserTag> userTags = userTagRepository.findByUserId(user);
        userTagRepository.deleteAll(userTags);

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
    public PostList userPost(int userId, Map<String,String> map) {
        User user = profileRepository.findById(userId)
                .orElseThrow(() -> new ServiceException(USER_NOT_FOUND));
        return postService.userPost(userId, map);
    }

    @Override
    @Transactional(readOnly = true)
    public UserClassListResponse userClass(int userId, PageRequest pageRequest) {
        // Learning 엔티티를 통해 DClass를 조회
        List<Learning> learningList = learningRepository.findAll((root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get("student").get("userId"), userId);
        });

        // 중복되지 않은 DClass 객체를 추출하면서 isDeleted = false인 DClass만 필터링
        List<DClass> filteredClassList = learningList.stream()
                .map(Learning::getDClass)
                .filter(dClass -> !dClass.getIsDeleted()) // isDeleted = false 필터링
                .distinct()
                .collect(Collectors.toList());

        // Pagination
        int totalElements = filteredClassList.size();
        int pageSize = pageRequest.getPageSize();
        int totalPages = (int) Math.ceil((double) totalElements / pageSize);
        int start = pageRequest.getPageNumber() * pageSize;
        int end = Math.min(start + pageSize, totalElements);

        List<DClass> paginatedList = filteredClassList.subList(start, end);

        List<ClassResponse> classResponses = paginatedList.stream().map(dClass -> {
            TagResponse tagResponse = TagResponse.builder()
                    .tagId(dClass.getTagId().getTagId())
                    .tagName(dClass.getTagId().getTagName())
                    .categoryId(dClass.getTagId().getCategory().getCategoryId())
                    .build();
            return ClassResponse.builder()
                    .classId(dClass.getClassId())
                    .className(dClass.getClassName())
                    .classPrice(dClass.getClassPrice())
                    .classHour(dClass.getClassHour())
                    .classMinute(dClass.getClassMinute())
                    .classExplanation(dClass.getClassExplanation())
                    .classMin(dClass.getClassMin())
                    .classMax(dClass.getClassMax())
                    .studentSum(dClass.getStudentSum())
                    .createdDate(dClass.getCreatedDate())
                    .modifiedDate(dClass.getModifiedDate())
                    .isDeleted(dClass.getIsDeleted())
                    .likeCount(dClass.getLikeCount())
                    .reviewCount(dClass.getReviewCount())
                    .averageRating((float) (dClass.getRatingSum() / (dClass.getReviewCount() == 0 ? 1 : dClass.getReviewCount())))
                    .userNickname(dClass.getUserId().getNickname())
                    .file(dClass.getFileId() != null ? FileResponse.builder()
                            .fileId(dClass.getFileId().getFileId())
                            .uploadFileName(dClass.getFileId().getUploadFileName())
                            .fileUrl(dClass.getFileId().getFileUrl())
                            .build() : null)
                    .user(UserResponse.of(dClass.getUserId()))
                    .tag(tagResponse)
                    .build();
        }).collect(Collectors.toList());

        return UserClassListResponse.builder()
                .classListResponse(ClassListResponse.builder()
                        .classList(classResponses)
                        .build())
                .currentPage(pageRequest.getPageNumber() + 1)
                .totalPageCount(totalPages)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public UserClassListResponse proClass(int userId, PageRequest pageRequest) {
        // Pageable 객체 생성 (likeCount 기준 내림차순 정렬)
        Pageable pageable = PageRequest.of(pageRequest.getPageNumber(), pageRequest.getPageSize(), Sort.by(Sort.Direction.DESC, "likeCount"));

        // DClass 엔티티를 UserId와 isDeleted=false 조건으로 조회
        Page<DClass> classPage = classRepository.findAllByUserIdAndIsDeletedFalse(userRepository.findByUserId(userId), pageable);

        // 조회된 결과에서 컨텐츠(클래스 목록)만 추출
        List<DClass> classList = classPage.getContent();

        // DClass 리스트를 ClassResponse 리스트로 변환
        List<ClassResponse> classResponses = classList.stream().map(dClass -> {
            TagResponse tagResponse = TagResponse.builder()
                    .tagId(dClass.getTagId().getTagId())
                    .tagName(dClass.getTagId().getTagName())
                    .categoryId(dClass.getTagId().getCategory().getCategoryId())
                    .build();
            return ClassResponse.builder()
                    .classId(dClass.getClassId())
                    .className(dClass.getClassName())
                    .classPrice(dClass.getClassPrice())
                    .classHour(dClass.getClassHour())
                    .classMinute(dClass.getClassMinute())
                    .classExplanation(dClass.getClassExplanation())
                    .classMin(dClass.getClassMin())
                    .classMax(dClass.getClassMax())
                    .studentSum(dClass.getStudentSum())
                    .createdDate(dClass.getCreatedDate())
                    .modifiedDate(dClass.getModifiedDate())
                    .isDeleted(dClass.getIsDeleted())
                    .likeCount(dClass.getLikeCount())
                    .reviewCount(dClass.getReviewCount())
                    .averageRating((float) (dClass.getRatingSum() / (dClass.getReviewCount() == 0 ? 1 : dClass.getReviewCount())))
                    .userNickname(dClass.getUserId().getNickname())
                    .file(dClass.getFileId() != null ? FileResponse.builder()
                            .fileId(dClass.getFileId().getFileId())
                            .uploadFileName(dClass.getFileId().getUploadFileName())
                            .fileUrl(dClass.getFileId().getFileUrl())
                            .build() : null)
                    .user(UserResponse.of(dClass.getUserId()))
                    .tag(tagResponse)
                    .build();
        }).collect(Collectors.toList());

        return UserClassListResponse.builder()
                .classListResponse(ClassListResponse.builder()
                        .classList(classResponses)
                        .build())
                .currentPage(classPage.getNumber() + 1)
                .totalPageCount(classPage.getTotalPages())
                .build();
    }


    @Override
    @Transactional(readOnly = true)
    public Page<ReviewDetailResponse> userReview(int userId, PageRequest pageRequest) {
        Pageable pageable = PageRequest.of(pageRequest.getPageNumber(), pageRequest.getPageSize(), Sort.by(Sort.Order.desc("createdDate")));

        Page<Review> reviewPage = reviewRepository.findAll((root, query, criteriaBuilder) -> {
            Join<Review, DClass> classJoin = root.join("dclass");

            Predicate userCondition = criteriaBuilder.equal(classJoin.get("userId").get("userId"), userId);
            Predicate isDeletedCondition = criteriaBuilder.isFalse(root.get("isDeleted"));

            return criteriaBuilder.and(userCondition, isDeletedCondition);
        }, pageable);

        List<ReviewDetailResponse> reviewResponses = reviewPage.getContent().stream().map(review -> {
            User reviewer = review.getUser();
            User teacher = review.getDclass().getUserId();

            return ReviewDetailResponse.of(review, reviewer, teacher);
        }).collect(Collectors.toList());

        return new PageImpl<>(reviewResponses, pageable, reviewPage.getTotalElements());
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
