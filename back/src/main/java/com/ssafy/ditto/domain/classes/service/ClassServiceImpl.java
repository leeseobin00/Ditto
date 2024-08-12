package com.ssafy.ditto.domain.classes.service;

import com.ssafy.ditto.domain.classes.domain.Kit;
import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Step;
import com.ssafy.ditto.domain.classes.dto.ClassRequest;
import com.ssafy.ditto.domain.classes.repository.ClassRepository;
import com.ssafy.ditto.domain.classes.repository.KitRepository;
import com.ssafy.ditto.domain.classes.repository.StepRepository;
import com.ssafy.ditto.domain.tag.repository.TagRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClassServiceImpl implements ClassService {
    private final ClassRepository classRepository;
    private final KitRepository kitRepository;
    private final StepRepository stepRepository;
    private final TagRepository tagRepository;

    @Override
    @Transactional
    public void createClass(ClassRequest classRequest) {
        Kit kit = Kit.builder()
                .kitName(classRequest.getKit().getKitName())
                .kitExplanation(classRequest.getKit().getKitExplanation())
                .build();
        kit = kitRepository.save(kit);

        DClass dClass = DClass.builder()
                .className(classRequest.getClassName())
                .userId(classRequest.getUserId())
                .tagId(tagRepository.findById(classRequest.getTagId()).orElse(null))
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
                .build();
        dClass = classRepository.save(dClass);

        DClass finalDClass = dClass;
        List<Step> steps = classRequest.getSteps().stream()
                .map(stepRequest -> Step.builder()
                        .stepNo(stepRequest.getStepNo().byteValue())
                        .stepName(stepRequest.getStepName())
                        .stepDetail(stepRequest.getStepDetail())
                        .fileId(stepRequest.getFileId())
                        .classId(finalDClass)
                        .build())
                .collect(Collectors.toList());
        stepRepository.saveAll(steps);
    }
}