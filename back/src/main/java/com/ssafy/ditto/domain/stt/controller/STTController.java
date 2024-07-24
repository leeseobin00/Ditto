package com.ssafy.ditto.domain.stt.controller;

import com.google.common.net.MediaType;
import com.ssafy.ditto.domain.stt.service.STTService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/stt")
public class STTController {
    private STTService sttService;

    
}
