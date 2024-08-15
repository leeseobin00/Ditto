package com.ssafy.ditto.domain.classes.service;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Step;
import com.ssafy.ditto.domain.classes.dto.StepRequest;
import com.ssafy.ditto.domain.classes.exception.ClassNotFoundException;
import com.ssafy.ditto.domain.classes.repository.ClassRepository;
import com.ssafy.ditto.domain.classes.repository.StepRepository;
import com.ssafy.ditto.domain.file.domain.File;
import com.ssafy.ditto.domain.file.exception.FileException;
import com.ssafy.ditto.domain.file.repository.FileRepository;
import com.ssafy.ditto.domain.file.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.ditto.domain.file.exception.FileErrorCode.FILE_NOT_EXIST;

@Component
@Service
@RequiredArgsConstructor
public class StepServiceImpl implements StepService {
    private final StepRepository stepRepository;
    private final ClassRepository classRepository;
    private final FileRepository fileRepository;
    private final FileService fileService;

    @Transactional
    @Override
    public void addSteps(Integer classId, List<StepRequest> stepRequests, List<MultipartFile> stepFiles) throws IOException {
        if (stepRequests.size() != stepFiles.size()) {
            throw new IllegalArgumentException("스텝 정보와 파일의 수가 일치하지 않습니다.");
        }

        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);

        List<Step> steps = stepRequests.stream().map(stepRequest -> Step.builder()
                .stepNo(stepRequest.getStepNo().byteValue())
                .stepName(stepRequest.getStepName())
                .stepDetail(stepRequest.getStepDetail())
                .classId(dClass)
                .build()).collect(Collectors.toList());

        stepRepository.saveAll(steps);

        for (int i = 0; i < steps.size(); i++) {
            Step step = steps.get(i);
            MultipartFile file = stepFiles.get(i);
            Integer fileId = fileService.saveFile(file);
            File savedFile = fileRepository.findById(fileId).orElseThrow(() -> new FileException(FILE_NOT_EXIST));
            step.setFileId(savedFile);
        }

        stepRepository.saveAll(steps);
    }

    @Transactional
    @Override
    public void updateSteps(Integer classId, List<StepRequest> stepRequests, List<MultipartFile> stepFiles) throws IOException {
        if (stepRequests.size() != stepFiles.size()) {
            throw new IllegalArgumentException("스텝 정보와 파일의 수가 일치하지 않습니다.");
        }

        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);

        List<Step> existingSteps = stepRepository.findAllByClassId(dClass);
        stepRepository.deleteAll(existingSteps);

        List<Step> steps = stepRequests.stream().map(stepRequest -> Step.builder()
                .stepNo(stepRequest.getStepNo().byteValue())
                .stepName(stepRequest.getStepName())
                .stepDetail(stepRequest.getStepDetail())
                .classId(dClass)
                .build()).collect(Collectors.toList());

        stepRepository.saveAll(steps);

        for (int i = 0; i < steps.size(); i++) {
            Step step = steps.get(i);
            MultipartFile file = stepFiles.get(i);
            Integer fileId = fileService.saveFile(file);
            File savedFile = fileRepository.findById(fileId).orElseThrow(() -> new FileException(FILE_NOT_EXIST));
            step.setFileId(savedFile);
        }

        stepRepository.saveAll(steps);
    }
}
