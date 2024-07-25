package com.ssafy.ditto.domain.classes.service;

import com.ssafy.ditto.domain.classes.dto.StepRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface StepService {
    void addSteps(Integer classId, List<StepRequest> stepRequests, List<MultipartFile> stepFiles) throws IOException;

    void updateSteps(Integer classId, List<StepRequest> stepRequests, List<MultipartFile> stepFiles) throws IOException;
}
