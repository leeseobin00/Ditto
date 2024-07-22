package com.ssafy.ditto.domain.user.service;

import jakarta.mail.MessagingException;

import java.security.NoSuchAlgorithmException;

public interface EmailService {
    String createCode() throws NoSuchAlgorithmException;

    void sendEmail(String email) throws MessagingException, NoSuchAlgorithmException ;
}
