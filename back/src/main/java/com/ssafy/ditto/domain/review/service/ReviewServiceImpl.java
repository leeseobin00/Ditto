package com.ssafy.ditto.domain.review.service;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.exception.ClassNotFoundException;
import com.ssafy.ditto.domain.classes.repository.ClassRepository;
import com.ssafy.ditto.domain.classes.repository.LectureRepository;
import com.ssafy.ditto.domain.review.domain.Review;
import com.ssafy.ditto.domain.review.dto.ReviewDetailResponse;
import com.ssafy.ditto.domain.review.dto.ReviewPageResponse;
import com.ssafy.ditto.domain.review.dto.ReviewRequest;
import com.ssafy.ditto.domain.review.exception.ReviewNotFoundException;
import com.ssafy.ditto.domain.review.repository.ReviewRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.exception.UserNotFoundException;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final ClassRepository classRepository;
    private final UserRepository userRepository;
    private final LectureRepository lectureRepository;

    @Override
    @Transactional
    public void createReview(int classId, ReviewRequest reviewRequest) {
        User user = userRepository.findById(reviewRequest.getUserId()).orElseThrow(UserNotFoundException::new);
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        Lecture lecture = lectureRepository.findByLectureId(reviewRequest.getLectureId());

        Review review = Review.builder()
                .reviewContent(reviewRequest.getReviewContent())
                .rating(reviewRequest.getRating())
                .user(user)
                .dclass(dClass)
                .lecture(lecture)
                .isDeleted(false)
                .build();
        dClass.setRatingSum(dClass.getRatingSum() + reviewRequest.getRating());
        dClass.setReviewCount(dClass.getReviewCount() + 1);
        reviewRepository.save(review);
    }

    @Override
    @Transactional
    public void updateReview(int classId, int reviewId, ReviewRequest reviewRequest) {
        User user = userRepository.findById(reviewRequest.getUserId()).orElseThrow(UserNotFoundException::new);
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        Review review = reviewRepository.findById(reviewId).orElseThrow(ReviewNotFoundException::new);

        dClass.setRatingSum(dClass.getRatingSum() - review.getRating());

        review.setReviewContent(reviewRequest.getReviewContent());
        review.setRating(reviewRequest.getRating());

        dClass.setRatingSum(dClass.getRatingSum() + reviewRequest.getRating());
        reviewRepository.save(review);
    }

    @Override
    @Transactional
    public void deleteReview(int classId, int reviewId) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        Review review = reviewRepository.findById(reviewId).orElseThrow(ReviewNotFoundException::new);

        review.setIsDeleted(true);
        dClass.setRatingSum(dClass.getRatingSum() - review.getRating());
        dClass.setReviewCount(dClass.getReviewCount() - 1);
    }

    @Override
    @Transactional
    public ReviewPageResponse getClassReviews(int classId, Pageable pageable) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);

        Pageable sortedByCreatedDateDesc = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "createdDate"));
        Page<Review> reviewsPage = reviewRepository.findByDclass(dClass, sortedByCreatedDateDesc);

        return ReviewPageResponse.of(
                reviewsPage.stream().map(review -> {
                    User user = userRepository.findById(review.getUser().getUserId())
                            .orElseThrow(UserNotFoundException::new);
                    User teacher = userRepository.findById(dClass.getUserId().getUserId())
                            .orElseThrow(UserNotFoundException::new);
                    return ReviewDetailResponse.of(review, user, teacher);
                }).collect(Collectors.toList()),
                reviewsPage.getNumber() + 1,
                reviewsPage.getTotalPages()
        );
    }
}
