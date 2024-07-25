package com.ssafy.ditto.domain.mypage.service;

import com.ssafy.ditto.domain.mypage.domain.Address;
import com.ssafy.ditto.domain.mypage.dto.AddressRequest;
import com.ssafy.ditto.domain.mypage.dto.MypageRequest;
import com.ssafy.ditto.domain.mypage.dto.MypageResponse;
import com.ssafy.ditto.domain.mypage.repository.AccountRepository;
import com.ssafy.ditto.domain.mypage.repository.AddressRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.exception.UserDuplicateException;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MypageServiceImpl implements MypageService{

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final AddressRepository addressRepository;

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
        if (addressRequest.isDdefault()){
            //기존에 있던 배송지 중 기본배송지로 등록된걸 취소처리
            Address address = addressRepository.findByUserIdAndDdefault(user, true);
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
                .ddefault(addressRequest.isDdefault())
                .userId(user)
                .build();

        newAddress = addressRepository.save(newAddress);
    }

    @Transactional
    @Override
    public void modifyAddress(int userId, int addressId, AddressRequest addressRequest) {
        User user = userRepository.findByUserId(userId);
        // 기본배송지로 들어오면
        if (addressRequest.isDdefault()){
            //기존에 있던 배송지 중 기본배송지로 등록된걸 취소처리
            Address address = addressRepository.findByUserIdAndDdefault(user, true);
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
                .ddefault(addressRequest.isDdefault())
                .userId(user)
                .build();

        newAddress = addressRepository.save(newAddress);
    }

    @Override
    public void deleteAddress(int userId, int addressId) {
        addressRepository.deleteById(addressId);
    }
}
