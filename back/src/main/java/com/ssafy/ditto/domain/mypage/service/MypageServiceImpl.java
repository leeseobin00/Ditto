package com.ssafy.ditto.domain.mypage.service;

import com.ssafy.ditto.domain.answer.domain.Answer;
import com.ssafy.ditto.domain.answer.repository.AnswerRepository;
import com.ssafy.ditto.domain.classes.domain.Payment;
import com.ssafy.ditto.domain.classes.domain.Summary;
import com.ssafy.ditto.domain.classes.repository.LectureRepository;
import com.ssafy.ditto.domain.classes.repository.PaymentRepository;
import com.ssafy.ditto.domain.classes.repository.SummaryRepository;
import com.ssafy.ditto.domain.file.repository.FileRepository;
import com.ssafy.ditto.domain.mypage.domain.*;
import com.ssafy.ditto.domain.mypage.repository.*;
import com.ssafy.ditto.domain.mypage.dto.*;
import com.ssafy.ditto.domain.question.domain.Question;
import com.ssafy.ditto.domain.question.repository.QuestionRepository;
import com.ssafy.ditto.domain.review.domain.Review;
import com.ssafy.ditto.domain.review.repository.ReviewRepository;
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
    private final ReviewRepository reviewRepository;
    private final MileageRepository mileageRepository;
    private final MileageHistoryRepository mileageHistoryRepository;

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

        addressRepository.save(newAddress);
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

        addressRepository.save(newAddress);
    }

    @Transactional
    @Override
    public void deleteAddress(int userId, int addressId) {
        addressRepository.deleteById(addressId);
    }

    @Override
    public List<PaymentResponse> getPayment(int userId, LocalDateTime dateTime) {

        // 입력한 날짜로 결제내역을 보여줌. 없으면 빈 list
        List<Payment> payments = paymentRepository.getPaymentList(userId, dateTime);

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

        return CancelResponse.builder()
                .refundId(refund.getRefundId())
                .refund(refund.getRefund())
                .build();
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
        List<QuestionResponse> questionResponseList = new ArrayList<>();

        // 일단 문의 목록 상위 3개를 가져옴
        List<Question> questions = questionRepository.getQuestionsUser(userId, dateTime);

        // 가져온 문의 목록과 대조해서 DTO 생성 후 return
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
    public List<ReviewResponse> getReviews(int userId, LocalDateTime dateTime) {
        List<ReviewResponse> reviewResponseList = new ArrayList<>();

        // 일단 리뷰 목록 3개를 최신순으로 가져옴.
        List<Review> reviews = reviewRepository.getReviews(userId, dateTime);

        // 가지고온 리뷰 목록과 대조해서 DTO 생성 후 return
        for (Review review : reviews){

            ReviewResponse reviewResponse = ReviewResponse.builder()
                    .reviewId(review.getReviewId())
                    .reviewContent(review.getReviewContent())
                    .createdDate(review.getCreatedDate())
                    .modifiedDate(review.getModifiedDate())
                    .isDeleted(review.getIsDeleted())
                    .rating(review.getRating())
                    .fileId(review.getClassId().getFileId().getFileId())
                    .fileUrl(review.getClassId().getFileId().getFileUrl())
                    .classId(review.getClassId().getClassId())
                    .className(review.getClassId().getClassName())
                    .lectureId(review.getLectureId().getLectureId())
                    .year(review.getLectureId().getYear())
                    .month(review.getLectureId().getMonth())
                    .day(review.getLectureId().getDay())
                    .hour(review.getLectureId().getHour())
                    .minute(review.getLectureId().getMinute())
                    .build();

            reviewResponseList.add(reviewResponse);
        }

        return reviewResponseList;
    }

    //미완성
    @Override
    public List<LikeClassResponse> getLikedClasses(int userId, LocalDateTime dateTime) {
        List<LikeClassResponse> likeClassResponseList = new ArrayList<>();

        // 일단 좋아요 한 클래스 Id를 3개 가져옴
        //List<String> likeclasses = likeClassRepository.getLikeClass(userId, dateTime);

        return likeClassResponseList;
    }

    // 프로 마이페이지 시작 부분
    @Override
    public ProMypageResponse getProMypage(int userId) {
        User user = userRepository.findByUserId(userId);
        Account account = accountRepository.findByUserId(user);

        return ProMypageResponse.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .fileUrl(user.getFileId().getFileUrl())
                .accountId(account.getAccountId())
                .accountNumber(account.getAccountNumber())
                .bank(account.getBank())
                .receiver(account.getReceiver())
                .build();
    }

    @Transactional
    @Override
    public void modifyAccount(int userId, AccountRequest accountRequest) {
        Account account = accountRepository.findByUserId(userRepository.findByUserId(userId));

        account.changeAccountNumber(accountRequest.getAccountNumber());
        account.changeBank(accountRequest.getBank());
        account.changeReceiver(accountRequest.getReceiver());
    }

    @Override
    public MileageResponse getMileage(int userId) {
        User user = userRepository.findByUserId(userId);
        Account account = accountRepository.findByUserId(user);

        return MileageResponse.builder()
                .mileage(mileageRepository.findByUserId(user).getMileage())
                .accountNumber(account.getAccountNumber())
                .bank(account.getBank())
                .receiver(account.getReceiver())
                .build();
    }

    @Override
    public List<MilageHistoryResponse> getMileageHistory(int userId, LocalDateTime dateTime) {
        List<MilageHistoryResponse> milageHistoryResponseList = new ArrayList<>();

        // 일단 정산 내역 10개를 최신순으로 가져옴.
        List<MileageHistory> mileageHistories = mileageHistoryRepository.getMileageHistoryList(userId, dateTime);

        // 가져온 정산내역 목록으로 DTO 생성 후 return
        for (MileageHistory mileageHistory : mileageHistories){

            MilageHistoryResponse milageHistoryResponse = MilageHistoryResponse.builder()
                    .historyId(mileageHistory.getHistoryId())
                    .className(mileageHistory.getLectureId().getClassName())
                    .mileageAmount(mileageHistory.getMileageAmount())
                    .time(mileageHistory.getTime())
                    .state(mileageHistory.getState())
                    .finalAmount(mileageHistory.getFinalAmount())
                    .build();

            milageHistoryResponseList.add(milageHistoryResponse);
        }

        return milageHistoryResponseList;
    }

    @Transactional
    @Override
    public void userWithdraw(int userId, Integer requestMoney) {
        User user = userRepository.findByUserId(userId);
        Mileage mileage = mileageRepository.findByUserId(user);
        int finalAmount = mileage.getMileage() - requestMoney;

        MileageHistory mileageHistory = MileageHistory.builder()
                .mileageAmount(requestMoney)
                .time(LocalDateTime.now())
                .state(2)
                .finalAmount(finalAmount)
                .build();

        mileageHistoryRepository.save(mileageHistory);

        mileage.changeMileage(finalAmount);
    }

    @Override
    public List<QuestionResponse> getProQuestion(int userId, LocalDateTime dateTime) {
        List<QuestionResponse> questionResponseList = new ArrayList<>();

        List<Question> questions = questionRepository.getQuestionsPro(userId, dateTime);

        // 가져온 문의 목록과 대조해서 DTO 생성 후 return
        for (Question question : questions){

            QuestionResponse questionResponse = QuestionResponse.builder()
                    .questionId(question.getQuestionId())
                    .title(question.getTitle())
                    .content(question.getContent())
                    .createdDate(question.getCreatedDate())
                    .modifiedDate(question.getModifiedDate())
                    .isDeleted(question.getIsDeleted())
                    .isAnswered(question.getIsAnswered())
                    .userId(question.getUserId().getUserId())
                    .nickname(question.getUserId().getNickname())
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
                .nickname(answer.getUserId().getNickname())
                .build();
    }

    @Transactional
    @Override
    public void insertAnswer(int userId, int questionId, String ans) {
        Question question = questionRepository.findByQuestionId(questionId);

        Answer answer = Answer.builder()
                .answer(ans)
                .isDeleted(false)
                .userId(userRepository.findByUserId(userId))
                .questionId(question)
                .build();

        answerRepository.save(answer);

        question.changeIsAnswered(true);
    }

    @Transactional
    @Override
    public void modifyAnswer(int answerId, String ans) {
        Answer answer = answerRepository.findByAnswerId(answerId);

        answer.changeAnswer(ans);
    }

    @Override
    public void deleteAnswer(int answerId) {
        Answer answer = answerRepository.findByAnswerId(answerId);

        answer.changeIsDeleted(true);
    }


}
