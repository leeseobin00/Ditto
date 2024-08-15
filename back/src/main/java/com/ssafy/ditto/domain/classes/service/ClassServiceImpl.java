package com.ssafy.ditto.domain.classes.service;

import com.ssafy.ditto.domain.category.exception.CategoryNotFoundException;
import com.ssafy.ditto.domain.category.repository.CategoryRepository;
import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Kit;
import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.domain.Step;
import com.ssafy.ditto.domain.classes.dto.*;
import com.ssafy.ditto.domain.classes.exception.ClassCancelException;
import com.ssafy.ditto.domain.classes.exception.ClassNotFoundException;
import com.ssafy.ditto.domain.classes.repository.ClassRepository;
import com.ssafy.ditto.domain.classes.repository.KitRepository;
import com.ssafy.ditto.domain.classes.repository.LectureRepository;
import com.ssafy.ditto.domain.classes.repository.StepRepository;
import com.ssafy.ditto.domain.file.domain.File;
import com.ssafy.ditto.domain.file.dto.FileResponse;
import com.ssafy.ditto.domain.file.exception.FileException;
import com.ssafy.ditto.domain.file.repository.FileRepository;
import com.ssafy.ditto.domain.tag.dto.TagResponse;
import com.ssafy.ditto.domain.tag.exception.TagNotFoundException;
import com.ssafy.ditto.domain.tag.repository.TagRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.dto.UserResponse;
import com.ssafy.ditto.domain.user.exception.UserNotFoundException;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.ditto.domain.file.exception.FileErrorCode.FILE_NOT_EXIST;

@Component
@Service
@RequiredArgsConstructor
public class ClassServiceImpl implements ClassService {
    private final ClassRepository classRepository;
    private final LectureRepository lectureRepository;
    private final StepRepository stepRepository;
    private final KitRepository kitRepository;
    private final FileRepository fileRepository;
    private final TagRepository tagRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public Integer createClass(ClassRequest classRequest, Integer classFileId, Integer kitFileId) {
        User user = userRepository.findById(classRequest.getUserId()).orElseThrow(UserNotFoundException::new);
        Kit kit = Kit.builder()
                .kitName(classRequest.getKit().getKitName())
                .kitExplanation(classRequest.getKit().getKitExplanation())
                .fileId(kitFileId != null ? fileRepository.findById(kitFileId).orElse(null) : null)
                .build();
        kit = kitRepository.save(kit);

        File classFile = null;
        if (classFileId != null) {
            classFile = fileRepository.findById(classFileId).orElseThrow(() -> new FileException(FILE_NOT_EXIST));
        }

        DClass dClass = DClass.builder()
                .className(classRequest.getClassName())
                .userId(user)
                .categoryId(categoryRepository.findById(classRequest.getCategoryId())
                        .orElseThrow(CategoryNotFoundException::new))
                .tagId(tagRepository.findById(classRequest.getTagId())
                        .orElseThrow(TagNotFoundException::new))
                .classPrice(classRequest.getClassPrice())
                .classHour(classRequest.getClassHour().byteValue())
                .classMinute(classRequest.getClassMinute().byteValue())
                .classMin(classRequest.getClassMin().byteValue())
                .classMax(classRequest.getClassMax().byteValue())
                .classExplanation(classRequest.getClassExplanation())
                .kitId(kit)
                .fileId(classFile)
                .isDeleted(false)
                .studentSum(0)
                .likeCount(0)
                .reviewCount(0)
                .ratingSum(0)
                .build();
        dClass = classRepository.save(dClass);
        return dClass.getClassId();
    }

    @Override
    @Transactional
    public void updateClass(Integer classId, ClassRequest classRequest, Integer classFileId, Integer kitFileId) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        User user = userRepository.findById(classRequest.getUserId()).orElseThrow(UserNotFoundException::new);

        Kit kit = dClass.getKitId();
        kit.setKitName(classRequest.getKit().getKitName());
        kit.setKitExplanation(classRequest.getKit().getKitExplanation());
        if (kitFileId != null) {
            kit.setFileId(fileRepository.findById(kitFileId).orElse(null));
        }
        kitRepository.save(kit);

        dClass.setClassName(classRequest.getClassName());
        dClass.setUserId(user);
        dClass.setCategoryId(categoryRepository.findById(classRequest.getCategoryId()).orElseThrow(CategoryNotFoundException::new));
        dClass.setTagId(tagRepository.findById(classRequest.getTagId()).orElseThrow(TagNotFoundException::new));
        dClass.setClassPrice(classRequest.getClassPrice());
        dClass.setClassHour(classRequest.getClassHour().byteValue());
        dClass.setClassMinute(classRequest.getClassMinute().byteValue());
        dClass.setClassMin(classRequest.getClassMin().byteValue());
        dClass.setClassMax(classRequest.getClassMax().byteValue());
        dClass.setClassExplanation(classRequest.getClassExplanation());
        if (classFileId != null) {
            dClass.setFileId(fileRepository.findById(classFileId).orElseThrow(() -> new FileException(FILE_NOT_EXIST)));
        }
        classRepository.save(dClass);
    }

    @Override
    public void deleteClass(Integer classId) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        dClass.setIsDeleted(true);
        classRepository.save(dClass);
    }

    @Override
    @Transactional
    public ClassDetailResponse getClassDetail(Integer classId) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        if (dClass.getIsDeleted() == true) {
            throw new ClassCancelException();
        }
        List<Step> steps = stepRepository.findAllByClassId(dClass);
        List<Lecture> lectures = lectureRepository.findAllByClassIdAndIsDeletedFalse(dClass);
        UserResponse userResponse = UserResponse.of(dClass.getUserId());
        TagResponse tagResponse = TagResponse.of(dClass.getTagId());

        return ClassDetailResponse.of(dClass,
                dClass.getFileId() != null ? FileResponse.of(dClass.getFileId()) : null,
                KitDetailResponse.of(dClass.getKitId(), dClass.getKitId().getFileId() != null ? FileResponse.of(dClass.getKitId().getFileId()) : null),
                steps.stream().map(step -> StepDetailResponse.of(step, step.getFileId() != null ? FileResponse.of(step.getFileId()) : null)).collect(Collectors.toList()),
                lectures.stream().map(LectureResponse::of).collect(Collectors.toList()),
                userResponse,
                tagResponse);
    }


    @Override
    @Transactional
    public ClassListResponse getClassList(ClassListRequest request) {
        Sort sort = Sort.by(Sort.Order.desc("createdDate")); // 기본 정렬

        Pageable pageable = PageRequest.of(request.getPage(), request.getSize() != null ? request.getSize() : 12);

        Page<DClass> classPage = classRepository.findAll((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(criteriaBuilder.isFalse(root.get("isDeleted")));
            if (request.getCategoryId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("categoryId").get("categoryId"), request.getCategoryId()));
            }
            if (request.getTagId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("tagId").get("tagId"), request.getTagId()));
            }
            if (request.getSearchBy() != null && request.getKeyword() != null) {
                if (request.getSearchBy().equals("nickname")) {
                    predicates.add(criteriaBuilder.like(root.get("userId").get("nickname"), "%" + request.getKeyword() + "%"));
                } else if (request.getSearchBy().equals("className")) {
                    predicates.add(criteriaBuilder.like(root.get("className"), "%" + request.getKeyword() + "%"));
                }
            }

            if ("averageRating".equals(request.getSortBy())) {
                query.orderBy(criteriaBuilder.desc(
                        criteriaBuilder.quot(root.get("ratingSum"),
                                criteriaBuilder.coalesce(root.get("reviewCount"), 1))
                ));
            } else if ("likeCount".equals(request.getSortBy())) {
                query.orderBy(criteriaBuilder.desc(root.get("likeCount")));
            } else if ("reviewCount".equals(request.getSortBy())) {
                query.orderBy(criteriaBuilder.desc(root.get("reviewCount")));
            } else if ("priceLow".equals(request.getSortBy())) {
                query.orderBy(criteriaBuilder.asc(root.get("classPrice")));
            } else {
                query.orderBy(criteriaBuilder.desc(root.get("createdDate")));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        }, pageable);

        List<DClass> classList = classPage.getContent(); // Page에서 List로 변환

        List<ClassResponse> classResponses = classList.stream()
                .map(ClassResponse::of)
                .collect(Collectors.toList());

        int totalPages = classPage.getTotalPages();

        return ClassListResponse.builder()
                .classList(classResponses)
                .currentPage(request.getPage() + 1)
                .totalPages(totalPages)
                .build();
    }

    @Override
    @Transactional
    public List<ClassResponse> getPopularClasses() {
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusDays(7);
        Pageable pageable = PageRequest.of(0, 8, Sort.by(Sort.Order.desc("likeCount")));
        List<DClass> popularClasses = classRepository.findPopularClasses(oneWeekAgo, pageable).stream()
                .filter(dClass -> !dClass.getIsDeleted())
                .collect(Collectors.toList());

        return popularClasses.stream().map(ClassResponse::of).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<ClassResponse> getLatestClasses() {
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusDays(7);
        Pageable pageable = PageRequest.of(0, 8, Sort.by(Sort.Order.desc("createdDate")));
        List<DClass> recentClasses = classRepository.findRecentClasses(oneWeekAgo, pageable).stream()
                .filter(dClass -> !dClass.getIsDeleted())
                .collect(Collectors.toList());

        return recentClasses.stream().map(ClassResponse::of).collect(Collectors.toList());
    }
}