package com.ssafy.ditto.domain.profile.repository;

import com.ssafy.ditto.domain.profile.domain.LikeUser;
import com.ssafy.ditto.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeUserRepository extends JpaRepository<LikeUser,Integer> {
    @Query("SELECT COUNT(lu.likeUserId) FROM LikeUser lu WHERE lu.likeGetter.userId = :userId")
    int countLikesByUserId(@Param("userId") int userId);
}