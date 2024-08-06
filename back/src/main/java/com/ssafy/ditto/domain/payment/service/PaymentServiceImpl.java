package com.ssafy.ditto.domain.payment.service;

import com.ssafy.ditto.domain.payment.domain.Payment;
import com.ssafy.ditto.domain.payment.dto.ChargingHistoryDto;
import com.ssafy.ditto.domain.payment.dto.PaymentSuccessDto;
import com.ssafy.ditto.domain.payment.repository.PaymentRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import com.ssafy.ditto.global.config.TossPaymentConfig;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Collections;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final TossPaymentConfig tossPaymentConfig;

    public Payment requestTossPayment(Payment payment, Integer userId) {
        User customer = userRepository.findByUserId(userId);
        payment.setUserId(customer);
        return paymentRepository.save(payment);
    }

    @Transactional
    public PaymentSuccessDto tossPaymentSuccess(String paymentKey, String orderId, Long amount) {
        Payment payment = verifyPayment(orderId, amount);
        PaymentSuccessDto result = requestPaymentAccept(paymentKey, orderId, amount);
        payment.setPaymentKey(paymentKey);
        payment.setPaySuccessYN(true);
        return result;
    }

    @Transactional
    public PaymentSuccessDto requestPaymentAccept(String paymentKey, String orderId, Long amount) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = getHeaders();
        JSONObject params = new JSONObject();
        params.put("orderId", orderId);
        params.put("amount", amount);

        return restTemplate.postForObject(TossPaymentConfig.URL + paymentKey,
                new HttpEntity<>(params, headers),
                PaymentSuccessDto.class);
    }

    public Payment verifyPayment(String orderId, Long amount) {
        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new NoSuchElementException("Payment not found"));
        if (!payment.getAmount().equals(amount)) {
            throw new IllegalArgumentException("Payment amount mismatch");
        }
        return payment;
    }

    @Transactional
    public void tossPaymentFail(String code, String message, String orderId) {
        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new NoSuchElementException("Payment not found"));
        payment.setPaySuccessYN(false);
        payment.setFailReason(message);
    }

    @Transactional
    public Map<String, String> cancelPaymentPoint(Integer userId, String paymentKey, String cancelReason) {
        Payment payment = paymentRepository.findByPaymentKeyAndUserId_UserId(paymentKey, userId)
                .orElseThrow(() -> new NoSuchElementException("Payment not found"));
        payment.setCancelYN(true);
        payment.setCancelReason(cancelReason);
        return tossPaymentCancel(paymentKey, cancelReason);
    }

    public Map<String, String> tossPaymentCancel(String paymentKey, String cancelReason) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = getHeaders();
        JSONObject params = new JSONObject();
        params.put("cancelReason", cancelReason);

        return restTemplate.postForObject(TossPaymentConfig.URL + paymentKey + "/cancel",
                new HttpEntity<>(params, headers),
                Map.class);
    }

    @Override
    public Slice<ChargingHistoryDto> findAllChargingHistories(Integer userId, Pageable pageable) {
        return paymentRepository.findAllByUserId_UserId(userId,
                PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
                        Sort.Direction.DESC, "paymentId"));
    }

    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        String encodedAuthKey = Base64.getEncoder().encodeToString((tossPaymentConfig.getTestSecretKey() + ":").getBytes(StandardCharsets.UTF_8));
        headers.setBasicAuth(encodedAuthKey);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        return headers;
    }
}
