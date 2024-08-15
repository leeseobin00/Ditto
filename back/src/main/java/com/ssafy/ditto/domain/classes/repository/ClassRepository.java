package com.ssafy.ditto.domain.classes.repository;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ClassRepository extends JpaRepository<DClass, Integer>, JpaSpecificationExecutor<DClass> {
    @Query("SELECT c FROM DClass c JOIN LikeClass lc ON c.classId = lc.dClass.classId WHERE lc.createdDate > :oneWeekAgo AND c.isDeleted = false GROUP BY c ORDER BY COUNT(lc) DESC")
    List<DClass> findPopularClasses(LocalDateTime oneWeekAgo, Pageable pageable);

    @Query("SELECT c FROM DClass c WHERE c.createdDate > :oneWeekAgo AND c.isDeleted = false ORDER BY c.createdDate DESC")
    List<DClass> findRecentClasses(LocalDateTime oneWeekAgo, Pageable pageable);

    DClass findByClassId(Integer classId);

    Page<DClass> findAllByUserIdAndIsDeletedFalse(User byUserId, Pageable pageable);
}
