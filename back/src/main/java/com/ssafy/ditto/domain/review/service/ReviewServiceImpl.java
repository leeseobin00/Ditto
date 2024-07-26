package com.ssafy.ditto.domain.review.service;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.exception.ClassNotFoundException;
import com.ssafy.ditto.domain.classes.repository.ClassRepository;
import com.ssafy.ditto.domain.classes.repository.LectureRepository;
import com.ssafy.ditto.domain.review.domain.Review;
import com.ssafy.ditto.domain.review.dto.ReviewRequest;
import com.ssafy.ditto.domain.review.repository.ReviewRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.exception.UserNotFoundException;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
                .userId(user)
                .classId(dClass)
                .lectureId(lecture)
                .isDeleted(false)
                .build();
        dClass.setRatingSum(dClass.getRatingSum() + reviewRequest.getRating());
        dClass.setReviewCount(dClass.getReviewCount() + 1);
        reviewRepository.save(review);
    }
}
