package com.ssafy.ditto.domain.user.service;

import com.ssafy.ditto.domain.user.dto.EmailCodeRequest;
import com.ssafy.ditto.domain.user.exception.NullCodeException;
import com.ssafy.ditto.domain.user.repository.EmailRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService{

    private final JavaMailSender javaMailSender;
    private final EmailRepository emailRepository;
    private ScheduledExecutorService scheduledExecutorService;

    @PostConstruct
    public void init() {
        scheduledExecutorService = Executors.newScheduledThreadPool(20);
    }

    @Override
    public String createCode() throws NoSuchAlgorithmException {
        int num = SecureRandom.getInstanceStrong().nextInt(1000000);
        return String.format("%06d", num);
    }

    @Override
    @Transactional
    public void sendEmail(String email) throws MessagingException, NoSuchAlgorithmException  {
        String code = createCode();
        emailRepository.saveCode(email, code);
        scheduledExecutorService.schedule(emailRepository.removeCode(email), 300, TimeUnit.SECONDS);

        String subject = "Ditto 계정 본인 확인";
        String content = "<div style='font-size:16px;'>"
                + "<p><strong>인증번호: <span style='font-size:24px;'>" + code + "</span></strong></p>"
                + "<p>안녕하세요!</p>"
                + "<p>Ditto 계정 본인 확인 메일입니다.</p>"
                + "<p>5분 내로 상기 코드를 입력하여 계정이 본인 소유임을 인증하여 주시기 바랍니다.</p>"
                + "</div>";

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
        helper.setTo(email);
        helper.setSubject(subject);
        helper.setText(content, true); // 두 번째 인자를 true로 설정하여 HTML을 사용함을 나타냄.

        javaMailSender.send(mimeMessage);
    }

    @Override
    public boolean checkCode(EmailCodeRequest emailCodeRequest) {
        String email = emailCodeRequest.getEmail();
        String code = emailCodeRequest.getCode();

        String save = emailRepository.getCode(email);
        if (save == null){
            throw new NullCodeException();
        } else if (code.equals(save)) {
            emailRepository.removeCode(email).run();
            return true;
        } else {
            return false;
        }
    }

}
