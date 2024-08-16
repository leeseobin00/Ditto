package com.ssafy.ditto.domain.payment.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.exception.LectureNotFoundException;
import com.ssafy.ditto.domain.classes.repository.ClassRepository;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    @Value("${TOSS_SECRET_KEY}")
    private String TOSS_SECRET_KEY;

    @Value("${TOSS_CLIENT_KEY}")
    private String TOSS_CLIENT_KEY;

    private final PaymentRepository paymentRepository;
    private final LectureRepository lectureRepository;
    private final ClassRepository classRepository;
    private final UserRepository userRepository;
    private final LearningService learningService;

    private static final Logger logger = LoggerFactory.getLogger(PaymentServiceImpl.class);

    @Override
    @Transactional
    public String approvePayment(PaymentApprovalRequest approvalRequest) {
        User user = userRepository.findById(approvalRequest.getUserId())
                .orElseThrow(UserNotFoundException::new);

        Lecture lecture = lectureRepository.findByLectureId(approvalRequest.getLectureId());
        DClass dClass = classRepository.findByClassId(lecture.getClassId().getClassId());
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();

        String url = "https://api.tosspayments.com/v1/payments/confirm";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String secretKey = TOSS_SECRET_KEY + ":";
        String encodedSecretKey = Base64.getEncoder().encodeToString(secretKey.getBytes(StandardCharsets.UTF_8));
        headers.set("Authorization", "Basic " + encodedSecretKey);

        logger.info("Authorization Header: Basic " + encodedSecretKey);

        JsonNode body = objectMapper.createObjectNode()
                .put("paymentKey", approvalRequest.getPaymentKey())
                .put("orderId", approvalRequest.getOrderId())
                .put("amount", approvalRequest.getAmount());

        HttpEntity<String> request = new HttpEntity<>(body.toString(), headers);
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            try {
                JsonNode responseBody = objectMapper.readTree(response.getBody());

                LocalDateTime approvedAt = LocalDateTime.now();
                String approvedAtStr = responseBody.path("approvedAt").asText("");
                if (!approvedAtStr.isEmpty()) {
                    OffsetDateTime approvedAtOffsetDateTime = OffsetDateTime.parse(approvedAtStr, DateTimeFormatter.ISO_OFFSET_DATE_TIME);
                    approvedAt = approvedAtOffsetDateTime.toLocalDateTime();
                }

                Payment payment = Payment.builder()
                        .orderName(lecture.getClassName())
                        .paymentKey(responseBody.path("paymentKey").asText(""))
                        .orderId(responseBody.path("orderId").asText(""))
                        .amount(responseBody.path("totalAmount").asLong(0))
                        .orderName(responseBody.path("orderName").asText(""))
                        .payTime(approvedAt)
                        .isPaySuccess(true)
                        .isCanceled(false)
                        .payType(PayType.CARD)
                        .user(user)
                        .lecture(lecture)
                        .build();
                lecture.setUserCount((byte) (lecture.getUserCount() + 1));
                dClass.setStudentSum(dClass.getStudentSum() + 1);

                paymentRepository.save(payment);

                learningService.addStudent(user.getUserId(), lecture.getLectureId());

                return "Payment approved and saved successfully.";
            } catch (Exception e) {
                throw new RuntimeException("Failed to parse payment approval response", e);
            }
        } else {
            throw new RuntimeException("Payment approval failed with status: " + response.getStatusCode());
        }
    }

    public String cancelPayment(int userId, int lectureId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(LectureNotFoundException::new);
        Optional<Payment> paymentOptional = paymentRepository.findByUser_UserIdAndLecture_LectureId(userId, lectureId);

        if (paymentOptional.isPresent()) {
            Payment payment = paymentOptional.get();

            // 결제 정보가 이미 취소된 상태인지 확인
            if (Boolean.TRUE.equals(payment.getIsCanceled())) {
                return "이미 취소된 결제입니다.";
            }

            // 결제 취소 처리
            payment.setIsCanceled(true);
            payment.setPayCancelTime(LocalDateTime.now());
            payment.setCancelReason("사용자 요청에 의한 취소");  // 취소 이유를 적절히 설정

            paymentRepository.save(payment);

            lecture.setUserCount((byte) (lecture.getUserCount() - 1));
            DClass dClass = lecture.getClassId();
            dClass.setStudentSum(dClass.getStudentSum() - 1);
            learningService.deleteStudent(userId,lectureId);

            return "결제가 성공적으로 취소되었습니다.";
        } else {
            return "결제 정보를 찾을 수 없습니다.";
        }
    }
}
