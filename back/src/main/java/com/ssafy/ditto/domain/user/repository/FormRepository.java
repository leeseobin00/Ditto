package com.ssafy.ditto.domain.user.repository;

import com.ssafy.ditto.domain.user.domain.Form;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormRepository extends JpaRepository<Form, Integer> {

}
