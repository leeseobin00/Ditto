package com.ssafy.ditto.domain.tag.repository;

import com.ssafy.ditto.domain.tag.domain.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    Tag findByTagName(String tagName);
}
