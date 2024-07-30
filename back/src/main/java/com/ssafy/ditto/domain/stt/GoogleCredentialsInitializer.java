package com.ssafy.ditto.domain.stt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

@Component
public class GoogleCredentialsInitializer implements CommandLineRunner {

    @Value("${google.credentials.json}")
    private String googleCredentialsJson;

    @Override
    public void run(String... args) throws Exception {
        File tempFile = File.createTempFile("google-credentials", ".json");
        try (FileWriter writer = new FileWriter(tempFile)) {
            writer.write(googleCredentialsJson);
        }

        System.setProperty("GOOGLE_APPLICATION_CREDENTIALS", tempFile.getAbsolutePath());
    }
}