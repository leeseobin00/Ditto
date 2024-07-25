package com.ssafy.ditto.domain.classes.repository;

import com.ssafy.ditto.domain.classes.domain.DClass;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ClassRepository extends JpaRepository<DClass, Integer>, JpaSpecificationExecutor<DClass> {
    @Query("SELECT c FROM DClass c JOIN LikeClass lc ON c.classId = lc.classId.classId WHERE lc.createdDate > :oneWeekAgo GROUP BY c ORDER BY COUNT(lc) DESC")
    List<DClass> findPopularClasses(LocalDateTime oneWeekAgo, Pageable pageable);

    @Query("SELECT c FROM DClass c WHERE c.createdDate > :oneWeekAgo ORDER BY c.createdDate DESC")
    List<DClass> findRecentClasses(LocalDateTime oneWeekAgo, Pageable pageable);
}
