package com.ssafy.ditto.domain.mypage.repository;

import com.ssafy.ditto.domain.mypage.domain.Address;
import com.ssafy.ditto.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
    List<Address> findAllByUser(User user);
    Address findByUserAndIsDefault(User user, boolean dfault);
}
