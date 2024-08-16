package com.ssafy.ditto.domain.mypage.service;

import com.ssafy.ditto.domain.answer.domain.Answer;
import com.ssafy.ditto.domain.answer.repository.AnswerRepository;
import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.domain.LikeClass;
import com.ssafy.ditto.domain.liveroom.service.LearningService;
import com.ssafy.ditto.domain.payment.domain.Payment;
import com.ssafy.ditto.domain.payment.repository.PaymentRepository;
import com.ssafy.ditto.domain.classes.repository.*;
import com.ssafy.ditto.domain.mypage.domain.*;
import com.ssafy.ditto.domain.mypage.repository.*;
import com.ssafy.ditto.domain.mypage.dto.*;
import com.ssafy.ditto.domain.profile.domain.LikeUser;
import com.ssafy.ditto.domain.profile.repository.LikeUserRepository;
import com.ssafy.ditto.domain.question.domain.Question;
import com.ssafy.ditto.domain.question.repository.QuestionRepository;
import com.ssafy.ditto.domain.review.domain.Review;
import com.ssafy.ditto.domain.review.repository.ReviewRepository;
import com.ssafy.ditto.domain.tag.domain.Tag;
import com.ssafy.ditto.domain.tag.dto.TagResponse;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import com.ssafy.ditto.domain.user.repository.UserTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MypageServiceImpl implements MypageService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final AddressRepository addressRepository;
    private final PaymentRepository paymentRepository;
    private final RefundRepository refundRepository;
    private final LectureRepository lectureRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final ReviewRepository reviewRepository;
    private final MileageRepository mileageRepository;
    private final MileageHistoryRepository mileageHistoryRepository;
    private final LikeClassRepository likeClassRepository;
    private final LikeUserRepository likeUserRepository;
    private final UserTagRepository userTagRepository;
    private final PasswordEncoder passwordEncoder;
    private final LearningService learningService;

    @Override
    @Transactional(readOnly = true)
    public MypageResponse getUserMypage(int userId) {
        List<AddressListResponse> addressListResponses = new ArrayList<>();

        User user = userRepository.findByUserId(userId);
        List<Address> addresses = addressRepository.findAllByUser(userRepository.findByUserId(userId));

        for (Address address : addresses){
            AddressListResponse addressListResponse = AddressListResponse.builder()
                    .addressId(address.getAddressId())
                    .zipCode(address.getZipCode())
                    .address1(address.getAddress1())
                    .address2(address.getAddress2())
                    .addressName(address.getAddressName())
                    .receiver(address.getReceiver())
                    .phoneNumber(address.getPhoneNumber())
                    .isDefault(address.getIsDefault())
                    .build();

            // 기본배송지인 경우 가장 앞으로 보냄
            if (address.getIsDefault()){
                addressListResponses.add(0, addressListResponse);
            }else{
                addressListResponses.add(addressListResponse);
            }
        }

        return MypageResponse.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .fileId(user.getFileId().getFileId())
                .fileUrl(user.getFileId().getFileUrl())
                .addresses(addressListResponses)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public AddressResponse getAddress(int userId) {
        List<AddressListResponse> addressListResponses = new ArrayList<>();

        List<Address> addresses = addressRepository.findAllByUser(userRepository.findByUserId(userId));

        for (Address address : addresses){
            AddressListResponse addressListResponse = AddressListResponse.builder()
                    .addressId(address.getAddressId())
                    .zipCode(address.getZipCode())
                    .address1(address.getAddress1())
                    .address2(address.getAddress2())
                    .addressName(address.getAddressName())
                    .receiver(address.getReceiver())
                    .phoneNumber(address.getPhoneNumber())
                    .isDefault(address.getIsDefault())
                    .build();

            // 기본배송지인 경우 가장 앞으로 보냄
            if (address.getIsDefault()){
                addressListResponses.add(0, addressListResponse);
            }else{
                addressListResponses.add(addressListResponse);
            }
        }

        return AddressResponse.builder()
                .addresses(addressListResponses)
                .build();
    }

    @Override
    @Transactional
    public String modifyUser(int userId, MypageRequest mypageRequest) {
        User user = userRepository.findByUserId(userId);

        // 1. 닉네임 변경
        if (!mypageRequest.getNickname().isEmpty()) {
            String newNickname = mypageRequest.getNickname();
            if (!userRepository.existsByNickname(newNickname)) {
                user.changeNickname(newNickname);
            }
        }

        // 2. 비밀번호 변경
        if (!mypageRequest.getPassword().isEmpty()) {
            user.changePassword(passwordEncoder.encode(mypageRequest.getPassword()));
        }

        return user.getNickname();
    }

    @Override
    @Transactional
    public void insertAddress(int userId, AddressRequest addressRequest) {
        User user = userRepository.findByUserId(userId);
        // 기본배송지로 들어온 경우
        if (addressRequest.getIsDefault()) {
            //기존에 있던 배송지 중 기본배송지로 등록된걸 취소처리
            Address address = addressRepository.findByUserAndIsDefault(user, true);
            if (!(address == null)) {
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
                .user(user)
                .build();

        addressRepository.save(newAddress);
    }

    @Override
    @Transactional
    public void modifyAddress(int userId, int addressId, AddressRequest addressRequest) {
        User user = userRepository.findByUserId(userId);
        // 기본배송지로 들어오면
        if (addressRequest.getIsDefault()) {
            //기존에 있던 배송지 중 기본배송지로 등록된걸 취소처리
            Address address = addressRepository.findByUserAndIsDefault(user, true);
            if (!(address == null)) {
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
                .user(user)
                .build();

        addressRepository.save(newAddress);
    }

    @Override
    @Transactional
    public void deleteAddress(int userId, int addressId) {
        addressRepository.deleteById(addressId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentResponse> getPayment(int userId, LocalDateTime dateTime) {

        // 입력한 날짜로 결제내역을 보여줌. 없으면 빈 list
        List<Payment> payments = paymentRepository.getPaymentList(userId, dateTime);

        List<PaymentResponse> paymentResponses = new ArrayList<>();

        for (Payment payment : payments) {
            Lecture lecture = payment.getLecture();
            DClass dClass = lecture.getClassId();

            PaymentResponse paymentResponse = PaymentResponse.builder()
                    .paymentId(payment.getPaymentId())
                    .payTime(payment.getPayTime())
                    .payCancelTime(payment.getPayCancelTime())
                    .fileId(dClass.getFileId().getFileId())
                    .fileUrl(dClass.getFileId().getFileUrl())
                    .lectureId(lecture.getLectureId())
                    .classId(dClass.getClassId())
                    .className(lecture.getClassName())
                    .classPrice(lecture.getClassPrice())
                    .year(lecture.getYear())
                    .month(lecture.getMonth())
                    .day(lecture.getDay())
                    .hour(lecture.getHour())
                    .minute(lecture.getMinute())
                    .isFinished(lecture.getIsFinished())
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

    @Override
    @Transactional
    public void patchRefund(int userId, int lectureId) {
        Payment payment = paymentRepository.findByUserAndLecture(userRepository.findByUserId(userId), lectureRepository.findByLectureId(lectureId));

        payment.setPayCancelTime(LocalDateTime.now());
        payment.setIsCanceled(true);
        learningService.deleteStudent(userId, lectureId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuestionResponse> getMyQuestion(int userId, LocalDateTime dateTime) {
        List<QuestionResponse> questionResponseList = new ArrayList<>();

        // 일단 문의 목록 상위 3개를 가져옴
        List<Question> questions = questionRepository.getQuestionsUser(userId, dateTime);

        // 가져온 문의 목록과 대조해서 DTO 생성 후 return
        for (Question question : questions) {
            DClass dClass = question.getDclass();
            QuestionResponse questionResponse = QuestionResponse.builder()
                    .questionId(question.getQuestionId())
                    .title(question.getTitle())
                    .content(question.getContent())
                    .createdDate(question.getCreatedDate())
                    .modifiedDate(question.getModifiedDate())
                    .isDeleted(question.getIsDeleted())
                    .isAnswered(question.getIsAnswered())
                    .fileId(dClass.getFileId().getFileId())
                    .fileUrl(dClass.getFileId().getFileUrl())
                    .classId(dClass.getClassId())
                    .className(dClass.getClassName())
                    .build();

            questionResponseList.add(questionResponse);
        }

        return questionResponseList;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewResponse> getReviews(int userId, LocalDateTime dateTime) {
        List<ReviewResponse> reviewResponseList = new ArrayList<>();

        // 일단 리뷰 목록 3개를 최신순으로 가져옴.
        List<Review> reviews = reviewRepository.getReviews(userId, dateTime);

        // 가지고온 리뷰 목록과 대조해서 DTO 생성 후 return
        for (Review review : reviews) {
            DClass dClass = review.getDclass();
            Lecture lecture = review.getLecture();

            ReviewResponse reviewResponse = ReviewResponse.builder()
                    .reviewId(review.getReviewId())
                    .reviewContent(review.getReviewContent())
                    .createdDate(review.getCreatedDate())
                    .modifiedDate(review.getModifiedDate())
                    .isDeleted(review.getIsDeleted())
                    .rating(review.getRating())
                    .fileId(dClass.getFileId().getFileId())
                    .fileUrl(dClass.getFileId().getFileUrl())
                    .classId(dClass.getClassId())
                    .className(dClass.getClassName())
                    .lectureId(lecture.getLectureId())
                    .year(lecture.getYear())
                    .month(lecture.getMonth())
                    .day(lecture.getDay())
                    .hour(lecture.getHour())
                    .minute(lecture.getMinute())
                    .build();

            reviewResponseList.add(reviewResponse);
        }

        return reviewResponseList;
    }

    @Override
    @Transactional(readOnly = true)
    public List<LikeClassResponse> getLikedClasses(int userId, LocalDateTime dateTime) {
        List<LikeClassResponse> likeClassResponseList = new ArrayList<>();

        // 일단 좋아요 한 클래스 Id를 3개 가져옴
        Pageable pageable = PageRequest.of(0, 3);
        List<DClass> likeClasses = likeClassRepository.getLikeClass(userId, dateTime, pageable).getContent();

        for (DClass dClass : likeClasses) {
            Optional<LikeClass> likeClass = likeClassRepository.findByUserAndDClass(userRepository.findByUserId(userId), dClass);

            if (likeClass.isPresent()){
                LikeClassResponse likeClassResponse = LikeClassResponse.builder()
                        .classId(dClass.getClassId())
                        .className(dClass.getClassName())
                        .classPrice(dClass.getClassPrice())
                        .classHour(dClass.getClassHour())
                        .classMinute(dClass.getClassMinute())
                        .likeCount(dClass.getLikeCount())
                        .reviewCount(dClass.getReviewCount())
                        .averageRating(Math.round(((double) dClass.getRatingSum() / dClass.getReviewCount()) * 100) / 100.0)
                        .userId(dClass.getUserId().getUserId())
                        .nickname(dClass.getUserId().getNickname())
                        .tagId(dClass.getTagId().getTagId())
                        .tagName(dClass.getTagId().getTagName())
                        .fileId(dClass.getFileId().getFileId())
                        .fileUrl(dClass.getFileId().getFileUrl())
                        .likeClassId(likeClass.get().getLikeClassId())
                        .createdDate(likeClass.get().getCreatedDate())
                        .modifiedDate(likeClass.get().getModifiedDate())
                        .build();

                likeClassResponseList.add(likeClassResponse);
            }

        }

        return likeClassResponseList;
    }

    @Override
    @Transactional
    public void deleteLikedClass(int userId, int classId) {
        likeClassRepository.removeLike(userId, classId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LikeUserResponse> getLikedUsers(int userId, LocalDateTime dateTime) {
        List<LikeUserResponse> likeUserResponseList = new ArrayList<>();
        User giverUser = userRepository.findByUserId(userId);

        // 일단 내가 좋아요한 유저를 시간순서로 4명 가져옴
        Pageable pageable = PageRequest.of(0, 4);
        List<User> likeUsers = likeUserRepository.getLikeUser(userId, dateTime, pageable).getContent();

        for (User getterUser : likeUsers) {
            LikeUser likeUser = likeUserRepository.findByLikeGiverAndLikeGetter(giverUser, getterUser);

            //getter 유저를 토대로 UserTag랑 Tag를 조인해서 반환
            List<Tag> tags = userTagRepository.getTagList(getterUser.getUserId());

            List<TagResponse> tagResponseList = new ArrayList<>();

            for (Tag tag : tags){
                TagResponse tagResponse = TagResponse.builder()
                        .tagId(tag.getTagId())
                        .tagName(tag.getTagName())
                        .categoryId(tag.getCategory().getCategoryId())
                        .build();

                tagResponseList.add(tagResponse);
            }

            LikeUserResponse likeUserResponse = LikeUserResponse.builder()
                    .userId(getterUser.getUserId())
                    .nickname(getterUser.getNickname())
                    .tags(tagResponseList)
                    .fileId(getterUser.getFileId().getFileId())
                    .fileUrl(getterUser.getFileId().getFileUrl())
                    .likeUserId(likeUser.getLikeUserId())
                    .createdDate(likeUser.getCreatedDate())
                    .build();

            likeUserResponseList.add(likeUserResponse);
        }

        return likeUserResponseList;
    }

    @Override
    @Transactional
    public void deleteLikedUser(int likeGiverId, int likeGetterId) {
        likeUserRepository.deleteByLikeGiverAndLikeGetter(userRepository.findByUserId(likeGiverId), userRepository.findByUserId(likeGetterId));
    }

    // 프로 마이페이지 시작 부분
    @Override
    @Transactional(readOnly = true)
    public ProMypageResponse getProMypage(int userId) {
        User user = userRepository.findByUserId(userId);
        Account account = accountRepository.findByUser(user);

        return ProMypageResponse.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .fileId(user.getFileId().getFileId())
                .fileUrl(user.getFileId().getFileUrl())
                .accountId(account.getAccountId())
                .accountNumber(account.getAccountNumber())
                .bank(account.getBank())
                .receiver(account.getReceiver())
                .build();
    }

    @Override
    @Transactional
    public void modifyAccount(int userId, AccountRequest accountRequest) {
        Account account = accountRepository.findByUser(userRepository.findByUserId(userId));

        account.changeAccountNumber(accountRequest.getAccountNumber());
        account.changeBank(accountRequest.getBank());
        account.changeReceiver(accountRequest.getReceiver());
    }

    @Override
    @Transactional(readOnly = true)
    public MileageResponse getMileage(int userId) {
        User user = userRepository.findByUserId(userId);
        Account account = accountRepository.findByUser(user);

        return MileageResponse.builder()
                .mileage(mileageRepository.findByUser(user).getMileage())
                .accountNumber(account.getAccountNumber())
                .bank(account.getBank())
                .receiver(account.getReceiver())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<MilageHistoryResponse> getMileageHistory(int userId, LocalDateTime dateTime) {
        List<MilageHistoryResponse> milageHistoryResponseList = new ArrayList<>();

        // 일단 정산 내역 10개를 최신순으로 가져옴.
        List<MileageHistory> mileageHistories = mileageHistoryRepository.getMileageHistoryList(userId, dateTime);
        System.out.println(mileageHistories.size());
        // 가져온 정산내역 목록으로 DTO 생성 후 return
        for (MileageHistory mileageHistory : mileageHistories) {
            MilageHistoryResponse milageHistoryResponse = null;
            // 강사에게 입금되었을때
            if (mileageHistory.getState() == 0){
                milageHistoryResponse = MilageHistoryResponse.builder()
                        .historyId(mileageHistory.getHistoryId())
                        .className(mileageHistory.getLecture().getClassName())
                        .mileageAmount(mileageHistory.getMileageAmount())
                        .time(mileageHistory.getTime())
                        .state(mileageHistory.getState())
                        .finalAmount(mileageHistory.getFinalAmount())
                        .build();
            } else { // 강사가 출금을 했을때
                milageHistoryResponse = MilageHistoryResponse.builder()
                        .historyId(mileageHistory.getHistoryId())
                        .mileageAmount(mileageHistory.getMileageAmount())
                        .time(mileageHistory.getTime())
                        .state(mileageHistory.getState())
                        .finalAmount(mileageHistory.getFinalAmount())
                        .build();
            }

            milageHistoryResponseList.add(milageHistoryResponse);
        }
        System.out.println(milageHistoryResponseList.size());
        return milageHistoryResponseList;
    }

    @Override
    @Transactional
    public boolean userWithdraw(int userId, Integer requestMoney) {
        User user = userRepository.findByUserId(userId);
        Mileage mileage = mileageRepository.findByUser(user);
        int finalAmount = mileage.getMileage() - requestMoney;

        if (finalAmount < 0){
            return false;
        }

        MileageHistory mileageHistory = MileageHistory.builder()
                .mileageAmount(requestMoney)
                .time(LocalDateTime.now())
                .state(2)
                .finalAmount(finalAmount)
                .mileage(mileage)
                .user(user)
                .build();

        mileageHistoryRepository.save(mileageHistory);

        mileage.changeMileage(finalAmount);

        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuestionResponse> getProQuestion(int userId, LocalDateTime dateTime) {
        List<QuestionResponse> questionResponseList = new ArrayList<>();

        List<Question> questions = questionRepository.getQuestionsPro(userId, dateTime);

        // 가져온 문의 목록과 대조해서 DTO 생성 후 return
        for (Question question : questions) {

            QuestionResponse questionResponse = QuestionResponse.builder()
                    .questionId(question.getQuestionId())
                    .title(question.getTitle())
                    .content(question.getContent())
                    .createdDate(question.getCreatedDate())
                    .modifiedDate(question.getModifiedDate())
                    .isDeleted(question.getIsDeleted())
                    .isAnswered(question.getIsAnswered())
                    .userId(question.getUser().getUserId())
                    .nickname(question.getUser().getNickname())
                    .fileId(question.getDclass().getFileId().getFileId())
                    .fileUrl(question.getDclass().getFileId().getFileUrl())
                    .classId(question.getDclass().getClassId())
                    .className(question.getDclass().getClassName())
                    .build();

            questionResponseList.add(questionResponse);
        }

        return questionResponseList;

    }

    @Override
    @Transactional(readOnly = true)
    public AnswerResponse getAnswer(int userId, int questionId) {
        Answer answer = answerRepository.findByQuestionId(questionRepository.findByQuestionId(questionId).getQuestionId());

        if (answer.getIsDeleted()){
            return AnswerResponse.builder()
                    .answerId(answer.getAnswerId())
                    .answer("삭제된 답변입니다.")
                    .createdDate(answer.getCreatedDate())
                    .modifiedDate(answer.getModifiedDate())
                    .isDeleted(answer.getIsDeleted())
                    .nickname(answer.getUser().getNickname())
                    .build();
        }else{
            return AnswerResponse.builder()
                    .answerId(answer.getAnswerId())
                    .answer(answer.getAnswer())
                    .createdDate(answer.getCreatedDate())
                    .modifiedDate(answer.getModifiedDate())
                    .isDeleted(answer.getIsDeleted())
                    .nickname(answer.getUser().getNickname())
                    .build();
        }


    }

    @Override
    @Transactional
    public void insertAnswer(int userId, int questionId, String ans) {
        Question question = questionRepository.findByQuestionId(questionId);

        Answer answer = Answer.builder()
                .answer(ans)
                .isDeleted(false)
                .user(userRepository.findByUserId(userId))
                .question(question)
                .build();

        answerRepository.save(answer);

        question.changeIsAnswered(true);
    }

    @Override
    @Transactional
    public void modifyAnswer(int answerId, String ans) {
        Answer answer = answerRepository.findByAnswerId(answerId);

        answer.changeAnswer(ans);
    }

    @Override
    @Transactional
    public void softDeleteAnswer(int answerId) {
        Answer answer = answerRepository.findByAnswerId(answerId);

        answer.changeIsDeleted(true);
    }


}
