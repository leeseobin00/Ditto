package com.ssafy.ditto.domain.file.repository;

import com.ssafy.ditto.domain.file.domain.File;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<File, Integer>{
    @Query(value = "SELECT f.* FROM File f JOIN File_Post fp ON f.file_id = fp.file_id WHERE fp.post_id = :postId", nativeQuery = true)
    List<File> findByPostId(@Param("postId") int postId);

    File findByFileId(int i);
}
