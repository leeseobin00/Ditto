package com.ssafy.ditto.domain.mypage.repository;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.mypage.domain.MileageHistory;
import com.ssafy.ditto.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MileageHistoryRepository extends JpaRepository<MileageHistory, Integer> {
    @Query(value = "SELECT * " +
            "FROM Mileage_History m " +
            "WHERE m.user_id = :userId AND m.time < :dateTime " +
            "ORDER BY m.time DESC " +
            "LIMIT 10", nativeQuery = true)
    List<MileageHistory> getMileageHistoryList(@Param("userId") int userId, @Param("dateTime") LocalDateTime dateTime);

    Optional<MileageHistory> findByUserAndLecture(User user, Lecture lecture);
}
