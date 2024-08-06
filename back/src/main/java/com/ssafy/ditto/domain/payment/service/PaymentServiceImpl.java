package com.ssafy.ditto.domain.payment.service;

import com.ssafy.ditto.domain.payment.dto.PaymentApprovalRequest;
import com.ssafy.ditto.domain.payment.dto.PaymentRequest;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;

@Service
@Transactional
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    @Value("{TOSS_SECRET_KEY}")
    private String TOSS_SECRET_KEY;

    public String requestPayment(PaymentRequest paymentRequest) {
        RestTemplate restTemplate = new RestTemplate();

        String url = "https://api.tosspayments.com/v1/payments";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String secretKey = TOSS_SECRET_KEY;
        String auth = Base64.getEncoder().encodeToString((secretKey + ":").getBytes());
        headers.set("Authorization", "Basic " + auth);

        JSONObject body = new JSONObject();
        body.put("method", paymentRequest.getMethod());
        body.put("orderId", paymentRequest.getOrderId());
        body.put("amount", paymentRequest.getAmount());
        body.put("orderName", paymentRequest.getOrderName());
        body.put("successUrl", paymentRequest.getSuccessUrl());
        body.put("failUrl", paymentRequest.getFailUrl());

        HttpEntity<String> request = new HttpEntity<>(body.toString(), headers);
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        return response.getBody();
    }

    public String approvePayment(PaymentApprovalRequest approvalRequest) {
        RestTemplate restTemplate = new RestTemplate();

        String url = "https://api.tosspayments.com/v1/payments/confirm";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 여기에 secretKey를 설정하세요.
        String secretKey = "test_sk_DnyRpQWGrNzBm674Y2qlrKwv1M9E";
        String auth = Base64.getEncoder().encodeToString((secretKey + ":").getBytes());
        headers.set("Authorization", "Basic " + auth);

        JSONObject body = new JSONObject();
        body.put("paymentKey", approvalRequest.getPaymentKey());
        body.put("orderId", approvalRequest.getOrderId());
        body.put("amount", approvalRequest.getAmount());

        HttpEntity<String> request = new HttpEntity<>(body.toString(), headers);
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        return response.getBody();
    }
}
