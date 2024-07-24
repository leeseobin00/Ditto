package com.ssafy.ditto.domain.stt.service;

import com.google.cloud.speech.v1.*;
import com.google.protobuf.ByteString;
import com.ssafy.ditto.domain.stt.exception.STTException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static com.ssafy.ditto.domain.stt.exception.STTErrorCode.*;

@Component
@Service
@RequiredArgsConstructor
public class STTServiceImpl implements STTService{
    @Override
    public String transcribe(MultipartFile audioFile) throws IOException {
        if(audioFile.isEmpty()) {throw new STTException(AUDIO_NOT_EXIST);}

        byte[] audioBytes = audioFile.getBytes();

        try (SpeechClient speechClient = SpeechClient.create()) {
            ByteString audioData = ByteString.copyFrom(audioBytes);
            RecognitionAudio recognitionAudio = RecognitionAudio.newBuilder()
                    .setContent(audioData)
                    .build();
            RecognitionConfig recognitionConfig =
                    RecognitionConfig.newBuilder()
                            .setEncoding(RecognitionConfig.AudioEncoding.FLAC)
                            .setSampleRateHertz(44100)
                            .setLanguageCode("en-US")
                            .build();

            // 오디오-텍스트 변환 수행
            RecognizeResponse response = speechClient.recognize(recognitionConfig, recognitionAudio);
            List<SpeechRecognitionResult> results = response.getResultsList();

            if (!results.isEmpty()) {
                // 주어진 말 뭉치에 대해 여러 가능한 스크립트를 제공. 0번(가장 가능성 있는)을 사용한다.
                SpeechRecognitionResult result = results.get(0);
                return result.getAlternatives(0).getTranscript();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return "";
    }
}
