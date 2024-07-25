package com.ssafy.ditto.domain.classes.domain;

import com.ssafy.ditto.domain.user.domain.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "like_class")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LikeClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer likeClassId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userId;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private DClass classId;

    private LocalDateTime createdDate;
}