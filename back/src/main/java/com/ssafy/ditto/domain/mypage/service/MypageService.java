package com.ssafy.ditto.domain.mypage.service;

import com.ssafy.ditto.domain.mypage.dto.MypageRequest;
import com.ssafy.ditto.domain.mypage.dto.MypageResponse;

public interface MypageService {
    MypageResponse getUserAddress(int userId);

    String editUser(int userId, MypageRequest mypageRequest);
}
