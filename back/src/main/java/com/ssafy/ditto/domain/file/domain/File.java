package com.ssafy.ditto.domain.file.domain;

import com.ssafy.ditto.global.shared.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "file")
public class File extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id")
    private Integer fileId;

    @Column(name = "upload_file_name", nullable = false)
    private String uploadFileName;

    @Column(name = "store_file_name", nullable = false)
    private String storeFileName;

    @Column(name = "file_url", nullable = false)
    private String fileUrl;

    @Column(name = "file_size", nullable = false)
    private Long fileSize;
}
