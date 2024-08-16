package com.ssafy.ditto.domain.file.repository;

import com.ssafy.ditto.domain.file.domain.File;
import com.ssafy.ditto.domain.file.domain.FilePost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FilePostRepository extends JpaRepository<FilePost, Integer>{
    List<FilePost> findByFile(File file);
}
