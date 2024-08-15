package com.ssafy.ditto.domain.post.repository;

import com.ssafy.ditto.domain.post.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board,Integer> {

}
