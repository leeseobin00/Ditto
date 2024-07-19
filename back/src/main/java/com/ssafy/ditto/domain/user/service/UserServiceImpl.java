package com.ssafy.ditto.domain.user.service;

import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.dto.UserSignUpRequest;
import com.ssafy.ditto.domain.user.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final AccountRepository accountRepository;
    private final AddressRepository addressRepository;
    private final FormRepository formRepository;
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void signup(UserSignUpRequest userSignUpRequest) {
        User user = User.builder()
                .email(userSignUpRequest.getEmail())
                .password(passwordEncoder.encode(userSignUpRequest.getPassword()))
                .nickname(userSignUpRequest.getNickname())
                .roleId(userRoleRepository.findByRoleId(userSignUpRequest.getRole()))
                .agreeTOS(true)
                .agreePICU(true)
                .build();

        user = userRepository.save(user);
    }
}
