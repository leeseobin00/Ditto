package com.ssafy.ditto.domain.user.repository;

import com.ssafy.ditto.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
    User findByNickname(String nickname);
    User findByUserId(int userId);
    boolean existsByNickname(String nickname);
}
