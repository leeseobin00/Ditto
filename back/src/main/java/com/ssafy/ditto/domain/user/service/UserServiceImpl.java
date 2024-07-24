package com.ssafy.ditto.domain.user.service;

import com.ssafy.ditto.domain.file.domain.File;
import com.ssafy.ditto.domain.file.repository.FileRepository;
import com.ssafy.ditto.domain.tag.repository.TagRepository;
import com.ssafy.ditto.domain.user.domain.Agree;
import com.ssafy.ditto.domain.user.domain.Form;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.domain.UserTag;
import com.ssafy.ditto.domain.user.dto.LoginResponse;
import com.ssafy.ditto.domain.user.dto.ProSignUpRequest;
import com.ssafy.ditto.domain.user.dto.UserLoginRequest;
import com.ssafy.ditto.domain.user.dto.UserSignUpRequest;
import com.ssafy.ditto.domain.user.repository.*;
import com.ssafy.ditto.global.jwt.dto.JwtResponse;
import com.ssafy.ditto.global.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final AgreeRepository agreeRepository;
    private final FormRepository formRepository;
    private final FileRepository fileRepository;
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final TagRepository tagRepository;
    private final UserTagRepository userTagRepository;
    private final JwtProvider jwtProvider;

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
                .build();

        user = userRepository.save(user);
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

    @Transactional
    @Override
    public void proSignup(ProSignUpRequest proSignUpRequest) {
        //강사 회원 등록
        User user = User.builder()
                .email(proSignUpRequest.getEmail())
                .password(passwordEncoder.encode(proSignUpRequest.getPassword()))
                .nickname(proSignUpRequest.getNickname())
                .agreeTOS(true)
                .agreePICU(true)
                .isDeleted(false)
                .roleId(userRoleRepository.findByRoleId(proSignUpRequest.getRole()))
                .fileId(null)
                .build();

        user = userRepository.save(user);

        // 강사 지원서 등록
        Form form = Form.builder()
                .name(proSignUpRequest.getName())
                .phoneNumber(proSignUpRequest.getPhoneNumber())
                .startDate(proSignUpRequest.getStartDate())
                .minActive(proSignUpRequest.getMinActive())
                .experience(proSignUpRequest.getExperience())
                .comment(proSignUpRequest.getComment())
                .userId(user)
                .build();

        form = formRepository.save(form);


        // 강사 관심사 태그 등록
        for (String tagName : proSignUpRequest.getTagName()){
            UserTag userTag = UserTag.builder()
                    .userId(user)
                    .tagId(tagRepository.findByTagName(tagName))
                    .build();

            userTag = userTagRepository.save(userTag);
        }


    }

    @Transactional
    @Override
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
        userRepository.save(user);

        // 유저의 닉네임도 전송해야하기 때문에 JwtResponse 대신 닉네임도 들어있는 LoginResponse 사용
        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .nickname(user.getNickname())
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


}
