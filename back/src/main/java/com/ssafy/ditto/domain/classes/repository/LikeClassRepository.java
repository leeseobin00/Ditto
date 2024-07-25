package com.ssafy.ditto.domain.classes.repository;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.LikeClass;
import com.ssafy.ditto.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeClassRepository extends JpaRepository<LikeClass, Integer> {
    Optional<LikeClass> findByUserIdAndClassId(User user, DClass dClass);

    void deleteByUserIdAndClassId(User user, DClass dClass);
}
