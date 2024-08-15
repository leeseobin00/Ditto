package com.ssafy.ditto.domain.user.repository;

import com.ssafy.ditto.domain.user.domain.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {
    UserRole findByRoleId(int role);
}
