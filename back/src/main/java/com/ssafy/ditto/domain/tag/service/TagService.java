package com.ssafy.ditto.domain.tag.service;

import com.ssafy.ditto.domain.tag.dto.TagResponse;

import java.util.List;

public interface TagService {
    List<TagResponse> getAllTags();
}
