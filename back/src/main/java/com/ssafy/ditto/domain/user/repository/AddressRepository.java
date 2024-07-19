package com.ssafy.ditto.domain.user.repository;

import com.ssafy.ditto.domain.user.domain.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
}
