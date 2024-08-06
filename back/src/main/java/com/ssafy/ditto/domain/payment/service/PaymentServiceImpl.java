package com.ssafy.ditto.domain.payment.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.repository.LectureRepository;
import com.ssafy.ditto.domain.liveroom.service.LearningService;
import com.ssafy.ditto.domain.payment.domain.Payment;
import com.ssafy.ditto.domain.payment.dto.PayType;
import com.ssafy.ditto.domain.payment.dto.PaymentApprovalRequest;
import com.ssafy.ditto.domain.payment.repository.PaymentRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.exception.UserNotFoundException;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;

@Service
@Transactional
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    @Value("${TOSS_SECRET_KEY}")
    private String TOSS_SECRET_KEY;
    private final PaymentRepository paymentRepository;
    private final LectureRepository lectureRepository;
    private final UserRepository userRepository;
    private final LearningService learningService;

    @Override
    public String approvePayment(PaymentApprovalRequest approvalRequest) {
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();

        String url = "https://api.tosspayments.com/v1/payments/confirm";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String secretKey = TOSS_SECRET_KEY;
        String auth = Base64.getEncoder().encodeToString((secretKey + ":").getBytes());
        headers.set("Authorization", "Basic " + auth);

        JsonNode body = objectMapper.createObjectNode()
                .put("paymentKey", approvalRequest.getPaymentKey())
                .put("orderId", approvalRequest.getOrderId())
                .put("amount", approvalRequest.getAmount());

        HttpEntity<String> request = new HttpEntity<>(body.toString(), headers);
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        try {
            JsonNode responseBody = objectMapper.readTree(response.getBody());

            LocalDateTime approvedAt = LocalDateTime.now();
            String approvedAtStr = responseBody.path("approvedAt").asText("");
            if (!approvedAtStr.isEmpty()) {
                OffsetDateTime approvedAtOffsetDateTime = OffsetDateTime.parse(approvedAtStr, DateTimeFormatter.ISO_OFFSET_DATE_TIME);
                approvedAt = approvedAtOffsetDateTime.toLocalDateTime();
            }

            // 사용자 정보 설정
            User user = userRepository.findById(approvalRequest.getUserId())
                    .orElseThrow(UserNotFoundException::new);

            Lecture lecture = lectureRepository.findByLectureId(approvalRequest.getLectureId());

            Payment payment = Payment.builder()
                    .orderName(lecture.getClassName())
                    .paymentKey(responseBody.path("paymentKey").asText(""))
                    .orderId(responseBody.path("orderId").asText(""))
                    .amount(responseBody.path("totalAmount").asLong(0))
                    .orderName(responseBody.path("orderName").asText(""))
                    .payTime(approvedAt)
                    .paySuccessYN(true)
                    .payType(PayType.CARD)
                    .userId(user)
                    .lectureId(lecture)
                    .build();

            paymentRepository.save(payment);

            learningService.addStudent(user.getUserId(), lecture.getLectureId());

            return "Payment approved and saved successfully.";
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse payment approval response", e);
        }
    }
}
