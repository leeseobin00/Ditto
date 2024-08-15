package com.ssafy.ditto.domain.profile.repository;

import com.ssafy.ditto.domain.profile.domain.LikeUser;
import com.ssafy.ditto.domain.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LikeUserRepository extends JpaRepository<LikeUser,Integer> {
    @Query("SELECT COUNT(lu.likeUserId) FROM LikeUser lu WHERE lu.likeGetter.userId = :userId")
    int countLikesByUserId(@Param("userId") int userId);

    LikeUser findByLikeGiverAndLikeGetter(User likeGiver, User likeGetter);

    void deleteByLikeGiverAndLikeGetter(User likeGiver, User likeGetter);

//    @Query(value =
//            "SELECT u.* " +
//                    "FROM User u " +
//                    "JOIN Like_User lu ON u.user_id = lu.like_getter_id " +
//                    "WHERE lu.like_giver_id = :userId " +
//                    "AND lu.created_date < :dateTime " +
//                    "ORDER BY lu.created_date DESC " +
//                    "LIMIT 4",
//            nativeQuery = true)
//    List<User> getLikeUser(@Param("userId") int userId, @Param("dateTime") LocalDateTime dateTime);

    @EntityGraph(attributePaths = {"likeGetter"})
    @Query("SELECT lu.likeGetter FROM LikeUser lu WHERE lu.likeGiver.id = :userId AND lu.createdDate < :createdDate ORDER BY lu.createdDate DESC")
    Page<User> getLikeUser(@Param("userId") Integer userId, @Param("createdDate") LocalDateTime createdDate, Pageable pageable);
}