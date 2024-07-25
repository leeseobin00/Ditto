package com.ssafy.ditto.domain.mypage.service;

import com.ssafy.ditto.domain.answer.domain.Answer;
import com.ssafy.ditto.domain.answer.repository.AnswerRepository;
import com.ssafy.ditto.domain.classes.domain.Payment;
import com.ssafy.ditto.domain.classes.domain.Summary;
import com.ssafy.ditto.domain.classes.repository.LectureRepository;
import com.ssafy.ditto.domain.classes.repository.PaymentRepository;
import com.ssafy.ditto.domain.classes.repository.SummaryRepository;
import com.ssafy.ditto.domain.file.domain.File;
import com.ssafy.ditto.domain.file.repository.FileRepository;
import com.ssafy.ditto.domain.mypage.domain.Address;
import com.ssafy.ditto.domain.mypage.domain.Refund;
import com.ssafy.ditto.domain.mypage.dto.*;
import com.ssafy.ditto.domain.mypage.repository.AccountRepository;
import com.ssafy.ditto.domain.mypage.repository.AddressRepository;
import com.ssafy.ditto.domain.mypage.repository.RefundRepository;
import com.ssafy.ditto.domain.question.domain.Question;
import com.ssafy.ditto.domain.question.repository.QuestionRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.exception.UserDuplicateException;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MypageServiceImpl implements MypageService{

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final AddressRepository addressRepository;
    private final PaymentRepository paymentRepository;
    private final RefundRepository refundRepository;
    private final LectureRepository lectureRepository;
    private final SummaryRepository summaryRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final FileRepository fileRepository;

    @Override
    public MypageResponse getUserMypage(int userId) {
        User user = userRepository.findByUserId(userId);
        List<Address> addresses = addressRepository.findByUserId(user);
        System.out.println("");

        return MypageResponse.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .fileUrl(user.getFileId().getFileUrl())
                .addresses(addresses)
                .build();
    }

    @Transactional
    @Override
    public String modifyUser(int userId, MypageRequest mypageRequest) {
        User user = userRepository.findByUserId(userId);

        // 1. 닉네임 변경
        if (!mypageRequest.getNickname().isEmpty()) {
            String newNickname = mypageRequest.getNickname();
            if (userRepository.existsByNickname(newNickname)) {
                throw new UserDuplicateException();
            }
            user.changeNickname(newNickname);
        }
        // 2. 비밀번호 변경
        if (!mypageRequest.getPassword().isEmpty()) {
            user.changePassword(mypageRequest.getPassword());
        }

        return user.getNickname();
    }

    @Transactional
    @Override
    public void insertAddress(int userId, AddressRequest addressRequest) {
        User user = userRepository.findByUserId(userId);
        // 기본배송지로 들어온 경우
        if (addressRequest.getIsDefault()){
            //기존에 있던 배송지 중 기본배송지로 등록된걸 취소처리
            Address address = addressRepository.findByUserIdAndIsDefault(user, true);
            if (!(address == null)){
                address.changeDefault(false);
            }
        }

        Address newAddress = Address.builder()
                .zipCode(addressRequest.getZipCode())
                .address1(addressRequest.getAddress1())
                .address2(addressRequest.getAddress2())
                .addressName(addressRequest.getAddressName())
                .receiver(addressRequest.getReceiver())
                .phoneNumber(addressRequest.getPhoneNumber())
                .isDefault(addressRequest.getIsDefault())
                .userId(user)
                .build();

        newAddress = addressRepository.save(newAddress);
    }

    @Transactional
    @Override
    public void modifyAddress(int userId, int addressId, AddressRequest addressRequest) {
        User user = userRepository.findByUserId(userId);
        // 기본배송지로 들어오면
        if (addressRequest.getIsDefault()){
            //기존에 있던 배송지 중 기본배송지로 등록된걸 취소처리
            Address address = addressRepository.findByUserIdAndIsDefault(user, true);
            if (!(address == null)){
                address.changeDefault(false);
            }
        }

        addressRepository.deleteById(addressId);

        Address newAddress = Address.builder()
                .zipCode(addressRequest.getZipCode())
                .address1(addressRequest.getAddress1())
                .address2(addressRequest.getAddress2())
                .addressName(addressRequest.getAddressName())
                .receiver(addressRequest.getReceiver())
                .phoneNumber(addressRequest.getPhoneNumber())
                .isDefault(addressRequest.getIsDefault())
                .userId(user)
                .build();

        newAddress = addressRepository.save(newAddress);
    }

    @Transactional
    @Override
    public void deleteAddress(int userId, int addressId) {
        addressRepository.deleteById(addressId);
    }

    @Override
    public List<PaymentResponse> getPayment(int userId, LocalDateTime finalDate) {

        // 입력한 날짜로 결제내역을 보여줌. 없으면 빈 list
        List<Payment> payments = paymentRepository.getPaymentList(userId, finalDate);

        List<PaymentResponse> paymentResponses = new ArrayList<>();

        User user = userRepository.findByUserId(userId);

        for (Payment payment : payments){
            PaymentResponse paymentResponse = PaymentResponse.builder()
                    .paymentId(payment.getPaymentId())
                    .payTime(payment.getPayTime())
                    .payCancelTime(payment.getPayCancelTime())
                    .fileId(user.getFileId().getFileId())
                    .fileUrl(user.getFileId().getFileUrl())
                    .lectureId(payment.getLectureId().getLectureId())
                    .className(payment.getLectureId().getClassName())
                    .classPrice(payment.getLectureId().getClassPrice())
                    .year(payment.getLectureId().getYear())
                    .month(payment.getLectureId().getMonth())
                    .day(payment.getLectureId().getDay())
                    .hour(payment.getLectureId().getHour())
                    .minute(payment.getLectureId().getMinute())
                    .build();

            paymentResponses.add(paymentResponse);
        }

        return paymentResponses;
    }

    @Override
    public CancelResponse getRefund() {
        Refund refund = refundRepository.findByRefundId(1);
        CancelResponse cancelResponse = CancelResponse.builder()
                .refundId(refund.getRefundId())
                .refund(refund.getRefund())
                .build();

        return cancelResponse;
    }

    @Transactional
    @Override
    public void patchRefund(int userId, int lectureId) {
        Payment payment = paymentRepository.findByUserIdAndLectureId(userRepository.findByUserId(userId), lectureRepository.findByLectureId(lectureId));

        payment.setPayCancelTime(LocalDateTime.now());
    }

    @Override
    public List<SummaryResponse> getSummary(int lectureId) {
        List<SummaryResponse> summaryResponseList = new ArrayList<>();
        List<Summary> summaries = summaryRepository.findAllByLectureId(lectureRepository.findByLectureId(lectureId));
        for(Summary summary : summaries){
            SummaryResponse newSummaryResponse = SummaryResponse.builder()
                    .summaryId(summary.getSummaryId())
                    .stepId(summary.getStepId().getStepId())
                    .summaryContent(summary.getSummaryContent())
                    .build();

            summaryResponseList.add(newSummaryResponse);
        }

        return summaryResponseList;
    }

    @Override
    public List<QuestionResponse> getMyQuestion(int userId, LocalDateTime dateTime) {
        List<Question> questions = questionRepository.getQuestions(userId, dateTime);
        User user = userRepository.findByUserId(userId);
        List<QuestionResponse> questionResponseList = new ArrayList<>();
        for (Question question : questions){

            QuestionResponse questionResponse = QuestionResponse.builder()
                    .questionId(question.getQuestionId())
                    .title(question.getTitle())
                    .content(question.getContent())
                    .createdDate(question.getCreatedDate())
                    .modifiedDate(question.getModifiedDate())
                    .isDeleted(question.getIsDeleted())
                    .isAnswered(question.getIsAnswered())
                    .fileId(question.getClassId().getFileId().getFileId())
                    .fileUrl(question.getClassId().getFileId().getFileUrl())
                    .lectureId(question.getLectureId().getLectureId())
                    .classId(question.getClassId().getClassId())
                    .className(question.getLectureId().getClassName())
                    .year(question.getLectureId().getYear())
                    .month(question.getLectureId().getMonth())
                    .day(question.getLectureId().getDay())
                    .hour(question.getLectureId().getHour())
                    .minute(question.getLectureId().getMinute())
                    .build();

            questionResponseList.add(questionResponse);
        }

        return questionResponseList;
    }

    @Override
    public AnswerResponse getAnswer(int userId, int questionId) {
        Answer answer = answerRepository.findByQuestionId(questionRepository.findByQuestionId(questionId));

        return AnswerResponse.builder()
                .answerId(answer.getAnswerId())
                .answer(answer.getAnswer())
                .createdDate(answer.getCreatedDate())
                .modifiedDate(answer.getModifiedDate())
                .isDeleted(answer.getIsDeleted())
                .build();
    }


}
