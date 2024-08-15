package com.ssafy.ditto.domain.mypage.repository;

import com.ssafy.ditto.domain.mypage.domain.Account;
import com.ssafy.ditto.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    Account findByUser(User user);
}
