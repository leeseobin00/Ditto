package com.ssafy.ditto.domain.user.service;

import com.ssafy.ditto.domain.user.dto.UserSignUpRequest;
import com.ssafy.ditto.domain.user.repository.AccountRepository;
import com.ssafy.ditto.domain.user.repository.AddressRepository;
import com.ssafy.ditto.domain.user.repository.FormRepository;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final AccountRepository accountRepository;
    private final AddressRepository addressRepository;
    private final FormRepository formRepository;
    private final UserRepository userRepository;

    @Override
    public void signup(UserSignUpRequest userSignUpRequest) {

    }
}
