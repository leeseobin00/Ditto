package com.ssafy.ditto.domain.classes.service;

import com.ssafy.ditto.domain.category.domain.Category;
import com.ssafy.ditto.domain.category.exception.CategoryNotFoundException;
import com.ssafy.ditto.domain.category.repository.CategoryRepository;
import com.ssafy.ditto.domain.classes.domain.Kit;
import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Step;
import com.ssafy.ditto.domain.classes.dto.ClassRequest;
import com.ssafy.ditto.domain.classes.exception.ClassNotFoundException;
import com.ssafy.ditto.domain.classes.repository.ClassRepository;
import com.ssafy.ditto.domain.classes.repository.KitRepository;
import com.ssafy.ditto.domain.classes.repository.StepRepository;
import com.ssafy.ditto.domain.file.domain.File;
import com.ssafy.ditto.domain.file.exception.FileException;
import com.ssafy.ditto.domain.file.repository.FileRepository;
import com.ssafy.ditto.domain.tag.exception.TagNotFoundException;
import com.ssafy.ditto.domain.tag.repository.TagRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.exception.UserNotFoundException;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.ditto.domain.file.exception.FileErrorCode.FILE_NOT_EXIST;

@Service
@RequiredArgsConstructor
public class ClassServiceImpl implements ClassService {
    private final ClassRepository classRepository;
    private final KitRepository kitRepository;
    private final StepRepository stepRepository;
    private final TagRepository tagRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final FileRepository fileRepository;

    @Override
    @Transactional
    public void createClass(ClassRequest classRequest, Integer fileId) {
        User user = userRepository.findById(classRequest.getUserId()).orElseThrow(UserNotFoundException::new);
        Kit kit = Kit.builder()
                .kitName(classRequest.getKit().getKitName())
                .kitExplanation(classRequest.getKit().getKitExplanation())
                .build();
        kit = kitRepository.save(kit);

        File file = null;
        if (fileId != null) {
            file = fileRepository.findById(fileId).orElseThrow(() -> new FileException(FILE_NOT_EXIST));
        }

        DClass dClass = DClass.builder()
                .className(classRequest.getClassName())
                .userId(user)
                .categoryId(categoryRepository.findById(classRequest.getCategoryId()).orElseThrow(CategoryNotFoundException::new))
                .tagId(tagRepository.findById(classRequest.getTagId()).orElseThrow(TagNotFoundException::new))
                .classPrice(classRequest.getClassPrice())
                .classHour(classRequest.getClassHour().byteValue())
                .classMinute(classRequest.getClassMinute().byteValue())
                .classMin(classRequest.getClassMin().byteValue())
                .classMax(classRequest.getClassMax().byteValue())
                .classExplanation(classRequest.getClassExplanation())
                .kitId(kit)
                .studentSum(0)
                .likeCount(0)
                .reviewCount(0)
                .ratingSum(0)
                .isDeleted(false)
                .fileId(file)
                .build();
        dClass = classRepository.save(dClass);

        DClass finalDClass = dClass;
        List<Step> steps = classRequest.getSteps().stream()
                .map(stepRequest -> Step.builder()
                        .stepNo(stepRequest.getStepNo().byteValue())
                        .stepName(stepRequest.getStepName())
                        .stepDetail(stepRequest.getStepDetail())
                        .fileId(stepRequest.getFileId() != null ? fileRepository.findById(stepRequest.getFileId()).orElse(null) : null)
                        .classId(finalDClass)
                        .build())
                .collect(Collectors.toList());
        stepRepository.saveAll(steps);
    }

    @Override
    @Transactional
    public void updateClass(Integer classId, ClassRequest classRequest, Integer fileId) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        User user = userRepository.findById(classRequest.getUserId()).orElseThrow(UserNotFoundException::new);

        Kit kit = dClass.getKitId();
        kit.setKitName(classRequest.getKit().getKitName());
        kit.setKitExplanation(classRequest.getKit().getKitExplanation());
        kitRepository.save(kit);

        dClass.setClassName(classRequest.getClassName());
        dClass.setUserId(user);
        dClass.setCategoryId(categoryRepository.findById(classRequest.getCategoryId()).orElseThrow(CategoryNotFoundException::new));
        dClass.setTagId(tagRepository.findById(classRequest.getTagId()).orElseThrow(TagNotFoundException::new));
        dClass.setClassPrice(classRequest.getClassPrice());
        dClass.setClassHour(classRequest.getClassHour().byteValue());
        dClass.setClassMinute(classRequest.getClassMinute().byteValue());
        dClass.setClassMax(classRequest.getClassMax().byteValue());
        dClass.setClassExplanation(classRequest.getClassExplanation());

        if (fileId != null) {
            File file = fileRepository.findById(fileId).orElseThrow(() -> new FileException(FILE_NOT_EXIST));
            dClass.setFileId(file);
        }

        List<Step> existingSteps = stepRepository.findAllByClassId(dClass);
        stepRepository.deleteAll(existingSteps);

        List<Step> newSteps = classRequest.getSteps().stream()
                .map(stepRequest -> Step.builder()
                        .stepNo(stepRequest.getStepNo().byteValue())
                        .stepName(stepRequest.getStepName())
                        .stepDetail(stepRequest.getStepDetail())
                        .fileId(stepRequest.getFileId() != null ? fileRepository.findById(stepRequest.getFileId()).orElse(null) : null)
                        .classId(dClass)
                        .build())
                .collect(Collectors.toList());
        stepRepository.saveAll(newSteps);

        classRepository.save(dClass);
    }

    @Override
    public void deleteClass(Integer classId) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        dClass.setIsDeleted(true);
        classRepository.save(dClass);
    }
}
