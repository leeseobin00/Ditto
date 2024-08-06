package com.ssafy.ditto.domain.liveroom.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.ditto.domain.classes.domain.Lecture;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "LiveRoom")
public class LiveRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "liveroom_id")
    private Integer liveRoomId;

    @JsonManagedReference
    @OneToMany(mappedBy = "liveRoom")
    private List<Learning> liveUsers = new ArrayList<>();

    @Column(name = "session_id", length = 1000)
    private String sessionId;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "is_finished")
    private Boolean isFinished;

    @Column(name = "open_time")
    private LocalDateTime openTime;

    @Column(name = "max_count")
    private Byte maxCount;

    @Column(name = "current_count")
    private Byte currentCount;

    @OneToOne
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;
}
