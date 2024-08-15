package com.ssafy.ditto.domain.review.controller;

import com.ssafy.ditto.domain.review.dto.ReviewPageResponse;
import com.ssafy.ditto.domain.review.dto.ReviewRequest;
import com.ssafy.ditto.domain.review.service.ReviewService;
import com.ssafy.ditto.global.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.ditto.global.dto.ResponseMessage.*;
import static org.springframework.http.HttpStatus.OK;

@Tag(name = "Review", description = "Class Review API")
@RestController
@RequestMapping("/classes/{classId}/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @Operation(summary = "리뷰 작성", description = "클래스에 대한 리뷰를 작성합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "리뷰 작성이 성공적으로 완료되었습니다."),
            @ApiResponse(responseCode = "404", description = "사용자 또는 클래스를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseDto<String> createReview(@PathVariable Integer classId, @RequestBody ReviewRequest reviewRequest) {
        reviewService.createReview(classId, reviewRequest);
        return ResponseDto.of(OK.value(), SUCCESS_WRITE.getMessage(), "리뷰 작성이 성공적으로 완료되었습니다.");
    }

    @Operation(summary = "리뷰 수정", description = "기존 리뷰를 수정합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "리뷰 수정이 성공적으로 완료되었습니다."),
            @ApiResponse(responseCode = "404", description = "리뷰를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @PatchMapping(value = "/{reviewId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseDto<String> updateReview(@PathVariable Integer classId, @PathVariable Integer reviewId, @RequestBody ReviewRequest reviewRequest) {
        reviewService.updateReview(classId, reviewId, reviewRequest);
        return ResponseDto.of(OK.value(), SUCCESS_UPDATE.getMessage(), "리뷰 수정이 성공적으로 완료되었습니다.");
    }

    @Operation(summary = "리뷰 삭제", description = "기존 리뷰를 삭제합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "리뷰 삭제가 성공적으로 완료되었습니다."),
            @ApiResponse(responseCode = "404", description = "리뷰를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @DeleteMapping("/{reviewId}")
    public ResponseDto<String> deleteReview(@PathVariable Integer classId, @PathVariable Integer reviewId) {
        reviewService.deleteReview(classId, reviewId);
        return ResponseDto.of(OK.value(), SUCCESS_DELETE.getMessage(), "리뷰 삭제가 성공적으로 완료되었습니다.");
    }

    @Operation(summary = "리뷰 목록 조회", description = "클래스에 대한 리뷰 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "리뷰 목록 조회가 성공적으로 완료되었습니다.")
    })
    @GetMapping
    public ResponseDto<ReviewPageResponse> getClassReviews(@PathVariable Integer classId,
                                                           @RequestParam int page) {
        Pageable pageable = PageRequest.of(page - 1, 3);
        ReviewPageResponse response = reviewService.getClassReviews(classId, pageable);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), response);
    }
}
