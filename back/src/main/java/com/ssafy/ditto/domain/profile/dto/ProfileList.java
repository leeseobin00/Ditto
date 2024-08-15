package com.ssafy.ditto.domain.profile.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Schema(title = "프로필 목록", description = "프로필 목록 DTO")
public class ProfileList {
    @Schema(description = "프로필 목록")
    private List<ProfileResponse> profiles = new ArrayList<>();

    @Schema(description = "현재 페이지", example = "1")
    private Integer currentPage;

    @Schema(description = "총 페이지 수", example = "10")
    private Integer totalPageCount;
}
