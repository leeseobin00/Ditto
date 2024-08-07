package com.ssafy.ditto.domain.payment.controller;

import com.ssafy.ditto.domain.payment.dto.PaymentApprovalRequest;
import com.ssafy.ditto.domain.payment.service.PaymentService;
import com.ssafy.ditto.global.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.ssafy.ditto.global.dto.ResponseMessage.SUCCESS_WRITE;
import static org.springframework.http.HttpStatus.OK;

@Tag(name = "Payment", description = "Payment API")
@RestController
@Validated
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @Operation(summary = "결제 승인", description = "결제를 승인합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "결제가 성공적으로 승인되었습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class))),
    })
    @PostMapping("/approve")
    public ResponseDto<String> approvePayment(@RequestBody PaymentApprovalRequest approvalRequest) {
        return ResponseDto.of(OK.value(), SUCCESS_WRITE.getMessage(), paymentService.approvePayment(approvalRequest));
    }
}
