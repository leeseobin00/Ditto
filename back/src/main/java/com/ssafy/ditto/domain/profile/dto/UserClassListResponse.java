package com.ssafy.ditto.domain.profile.dto;

import com.ssafy.ditto.domain.classes.dto.ClassListResponse;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserClassListResponse {
    private ClassListResponse classListResponse;
    private Integer currentPage;
    private Integer totalPageCount;
}
