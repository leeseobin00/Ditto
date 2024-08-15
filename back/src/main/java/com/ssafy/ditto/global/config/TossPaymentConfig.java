package com.ssafy.ditto.global.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class TossPaymentConfig {
   @Value("${TOSS_CLIENT_KEY}")
   private String testClientApiKey;
   @Value("${TOSS_SECRET_KEY}")
   private String testSecretKey;

   @Value("${payment.toss.success_url}")
   private String successUrl;
   @Value("${payment.toss.fail_url}")
   private String failUrl;

   public static final String URL = "https://api.tosspayments.com/v1/payments/";
}