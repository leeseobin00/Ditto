package com.ssafy.ditto.domain.liveroom.repository;

import com.ssafy.ditto.domain.liveroom.domain.LiveRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LiveRoomRepository extends JpaRepository<LiveRoom,Integer> {
}
