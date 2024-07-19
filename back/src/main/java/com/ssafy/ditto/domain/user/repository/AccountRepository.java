package com.ssafy.ditto.domain.user.repository;

import com.ssafy.ditto.domain.user.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
}
