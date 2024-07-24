package com.ssafy.ditto.domain.mypage.repository;

import com.ssafy.ditto.domain.mypage.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
}
