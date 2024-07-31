package com.ssafy.ditto.domain.tag.service;

import com.ssafy.ditto.domain.tag.dto.TagResponse;
import com.ssafy.ditto.domain.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {
    private final TagRepository tagRepository;

    @Override
    public List<TagResponse> getAllTags() {
        return tagRepository.findAll().stream()
                .map(tag -> TagResponse.builder()
                        .tagId(tag.getTagId())
                        .tagName(tag.getTagName())
                        .categoryId(tag.getCategory().getCategoryId())
                        .build())
                .collect(Collectors.toList());
    }
}
