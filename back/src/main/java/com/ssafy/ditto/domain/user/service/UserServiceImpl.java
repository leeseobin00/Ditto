package com.ssafy.ditto.domain.user.service;

import com.ssafy.ditto.domain.file.domain.File;
import com.ssafy.ditto.domain.file.repository.FileRepository;
import com.ssafy.ditto.domain.mypage.domain.Account;
import com.ssafy.ditto.domain.mypage.domain.Mileage;
import com.ssafy.ditto.domain.mypage.repository.AccountRepository;
import com.ssafy.ditto.domain.mypage.repository.MileageRepository;
import com.ssafy.ditto.domain.user.domain.Agree;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.dto.*;
import com.ssafy.ditto.domain.user.exception.UserDuplicateException;
import com.ssafy.ditto.domain.user.repository.*;
import com.ssafy.ditto.global.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final AgreeRepository agreeRepository;
    private final FileRepository fileRepository;
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final AccountRepository accountRepository;
    private final MileageRepository mileageRepository;

    @Override
    public void signup(UserSignUpRequest userSignUpRequest) {
        File file = fileRepository.findByFileId(1);

        User user = User.builder()
                .email(userSignUpRequest.getEmail())
                .password(passwordEncoder.encode(userSignUpRequest.getPassword()))
                .nickname(userSignUpRequest.getNickname())
                .agreeTOS(true)
                .agreePICU(true)
                .isDeleted(false)
                .roleId(userRoleRepository.findByRoleId(userSignUpRequest.getRole()))
                .fileId(file)
                .domain("local")
                .build();

        user = userRepository.save(user);

        user.changeRefreshToken(jwtProvider.createRefreshToken(String.valueOf(user.getUserId()), user.getEmail()));
    }

    @Override
    public String getTerms(int agreeId) {
        // 동의 아이디가 0, 1로 들어옴. 백엔드에서는 약관이 1, 2로 들어갈거기 때문에 1씩 더해줌
        agreeId += 1;
        Agree agreeEntity = agreeRepository.findByAgreeId(agreeId);
        if (agreeEntity != null) {
            return agreeEntity.getAgree();
        } else {
            // 약관을 불러오는걸 실패했을 시
            throw new IllegalArgumentException("Invalid agreeId: " + agreeId);
        }
    }

    @Override
    @Transactional
    public void proSignup(UserSignUpRequest userSignUpRequest) {
        File file = fileRepository.findByFileId(1);
        //강사 회원 등록
        User user = User.builder()
                .email(userSignUpRequest.getEmail())
                .password(passwordEncoder.encode(userSignUpRequest.getPassword()))
                .nickname(userSignUpRequest.getNickname())
                .agreeTOS(true)
                .agreePICU(true)
                .isDeleted(false)
                .roleId(userRoleRepository.findByRoleId(userSignUpRequest.getRole()))
                .fileId(file)
                .domain("local")
                .build();

        user = userRepository.save(user);

        user.changeRefreshToken(jwtProvider.createRefreshToken(String.valueOf(user.getUserId()), user.getEmail()));

        Account account = Account.builder()
                .accountNumber("")
                .bank("")
                .receiver("")
                .user(user)
                .build();

        accountRepository.save(account);

        Mileage mileage = Mileage.builder()
                .mileage(0)
                .user(user)
                .build();

        mileageRepository.save(mileage);
    }

    @Override
    @Transactional
    public LoginResponse login(UserLoginRequest userLoginRequest) {
        User user;
        try {
            user = userRepository.findByEmail(userLoginRequest.getEmail());
        } catch (Exception e) {
            return null;
        }

        if (!passwordEncoder.matches(userLoginRequest.getPassword(), user.getPassword())){
            return null;
        }

        // 토큰에 유저 Id, 이메일
        String accessToken = jwtProvider.createAccessToken(String.valueOf(user.getUserId()), user.getEmail());
        String refreshToken = jwtProvider.createRefreshToken(String.valueOf(user.getUserId()), user.getEmail());

        user.changeRefreshToken(refreshToken);

        // 유저의 닉네임도 전송해야하기 때문에 JwtResponse 대신 닉네임도 들어있는 LoginResponse 사용
        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .nickname(user.getNickname())
                .roleId(user.getRoleId().getRoleId())
                .domain(user.getDomain())
                .build();
    }

    @Override
    public boolean emailDuplicateCheck(String email) {
        User user = userRepository.findByEmail(email);
        // 이미 이메일로 된 계정이 존재하는 경우 true
        // 사용 가능한 이메일인 경우 false
        return user != null;
    }

    @Override
    public boolean nickNameDuplicateCheck(String nickname) {
        User user = userRepository.findByNickname(nickname);
        // 이미 닉네임의 사용자가 존재하는 경우 true
        // 사용 가능한 닉네임인 경우 false
        return user != null;
    }

    @Override
    @Transactional
    public LoginResponse kakaoLogin(KakaoUserLoginRequest kakaoUserLoginRequest) throws NoSuchAlgorithmException {
        // 여기까지 왔으면 카카오에서 계정 인증은 이미 받은 상태
        // 이 이메일이 사용 가능한가?
        // 1. 이메일이 이미 카카오 가입이 되어있는 경우 -> 엑세스토큰 발급, 로그인
        // 2. 이메일이 이미 자체 가입이 되어있는 경우 -> "이미 가입되어있는 회원입니다." 오류메시지 반환
        // 3. 이메일이 가입되지 않은 경우 -> 회원가입 처리, 엑세스토큰 발급, 로그인
        User user;
        
        user = userRepository.findByEmail(kakaoUserLoginRequest.getEmail());

        // 3. 이메일이 가입되지 않은 경우
        if (user == null){
            // 회원가입처리
            kakaoSignup(kakaoUserLoginRequest);
            user = userRepository.findByEmail(kakaoUserLoginRequest.getEmail());
        }

        // 2. 이미 자체 가입이 되어있는 경우
        if (user.getDomain().equals("local")){
            throw new UserDuplicateException();
        }

        // 1. 이메일이 이미 카카오 가입이 되어있는 경우
        String accessToken = jwtProvider.createAccessToken(String.valueOf(user.getUserId()), user.getEmail());
        String refreshToken = jwtProvider.createRefreshToken(String.valueOf(user.getUserId()), user.getEmail());

        user.changeRefreshToken(refreshToken);

        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .nickname(user.getNickname())
                .roleId(user.getRoleId().getRoleId())
                .domain(user.getDomain())
                .build();
    }

    @Override
    public void kakaoSignup(KakaoUserLoginRequest kakaoUserLoginRequest) throws NoSuchAlgorithmException {
        File file = fileRepository.findByFileId(1);

        // 닉네임 중복체크후 중복이면 랜덤닉네임 생성
        String nickname = kakaoUserLoginRequest.getNickname();
        if(nickNameDuplicateCheck(nickname)){
            nickname = createRandomString();
        }

        User user = User.builder()
                .email(kakaoUserLoginRequest.getEmail())
                .password(null)
                .nickname(nickname)
                .agreeTOS(true)
                .agreePICU(true)
                .isDeleted(false)
                .roleId(userRoleRepository.findByRoleId(1)) // 일반 유저
                .fileId(file)
                .domain("kakao")
                .build();

        userRepository.save(user);
    }

    @Override
    public String createRandomString() throws NoSuchAlgorithmException {
        // 가능한 문자들
        String characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random = SecureRandom.getInstanceStrong();
        StringBuilder sb = new StringBuilder(10);

        for (int i = 0; i < 10; i++) {
            int index = random.nextInt(characters.length());
            sb.append(characters.charAt(index));
        }

        return sb.toString();
    }

}
