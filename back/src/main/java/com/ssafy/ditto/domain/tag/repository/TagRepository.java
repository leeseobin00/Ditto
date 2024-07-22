package com.ssafy.ditto.domain.tag.repository;

import com.ssafy.ditto.domain.tag.domain.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    Tag findByTagName(String tagName);
}
