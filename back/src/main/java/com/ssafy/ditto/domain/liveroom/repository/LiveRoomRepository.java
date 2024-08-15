package com.ssafy.ditto.domain.liveroom.repository;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.liveroom.domain.LiveRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LiveRoomRepository extends JpaRepository<LiveRoom,Integer> {

    Optional<LiveRoom> findByLecture(Lecture lecture);
}
