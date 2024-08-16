import axios from 'axios';

export const checkNicknameAvailability = async (nickname) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const trimmedNickname = nickname.trim();

  // 특수문자 패턴
  const specialCharPattern = /^[a-z0-9가-힣]{2,10}$/;

  if (nickname.length > 10 || nickname.length < 2) {
    throw new Error('닉네임은 최소 2자, 최대 10자까지 가능합니다.');
  } else if (trimmedNickname === '') {
    throw new Error('공백은 닉네임으로 사용할 수 없습니다.');
  }  else if (!specialCharPattern.test(trimmedNickname)) {
    throw new Error('닉네임에 특수문자를 포함할 수 없습니다.');
  }

  try {
    const response = await axios.get(`${baseURL}/users/signup/nickname/${trimmedNickname}`);
    return response.data.code === 201;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      return false; // 닉네임이 이미 사용 중인 경우
    }
    throw new Error('닉네임 중복 확인 중 오류가 발생했습니다.');
  }
};
