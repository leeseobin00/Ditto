package com.ssafy.ditto.domain.profile.dto;

import com.ssafy.ditto.domain.post.dto.PostResponse;
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
public class ProfileList {

    private List<ProfileResponse> profiles = new ArrayList<>();
    private Integer currentPage;
    private Integer totalPageCount;
}