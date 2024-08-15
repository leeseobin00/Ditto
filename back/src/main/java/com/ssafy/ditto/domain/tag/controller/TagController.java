package com.ssafy.ditto.domain.tag.controller;

import com.ssafy.ditto.domain.answer.dto.AnswerResponse;
import com.ssafy.ditto.domain.tag.dto.TagResponse;
import com.ssafy.ditto.domain.tag.service.TagService;
import com.ssafy.ditto.global.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.ssafy.ditto.global.dto.ResponseMessage.SUCCESS_FETCH;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/tags")
@RequiredArgsConstructor
@Tag(name = "Tag", description = "Tag API")
public class TagController {
    private final TagService tagService;

    @Operation(summary = "태그 조회", description = "태그를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "태그가 성공적으로 조회되었습니다.", content = @Content(schema = @Schema(implementation = AnswerResponse.class)))
    @GetMapping
    public ResponseDto<List<TagResponse>> getAllTags() {
        List<TagResponse> tags = tagService.getAllTags();
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), tags);
    }
}
