package com.ssafy.ditto.domain.user.repository;

import com.ssafy.ditto.domain.tag.domain.Tag;
import com.ssafy.ditto.domain.user.domain.UserTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTagRepository extends JpaRepository<UserTag, Integer> {
    @Query("SELECT t.tagName FROM UserTag ut " +
            "JOIN ut.tagId t " +
            "WHERE ut.userId.userId = :userId")
    List<Tag> findTagsByUserId(@Param("userId") int userId);
}
