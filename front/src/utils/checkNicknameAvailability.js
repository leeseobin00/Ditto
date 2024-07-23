import axios from 'axios';

export const checkNicknameAvailability = async (nickname) => {
  if (nickname.length > 15) {
    throw new Error('닉네임은 최대 15자까지 가능합니다.');
  }

  try {
    const response = await axios.get(`https://localhost:8080/users/signup/nickname/${nickname}`);
    return response.status === 200;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      return false; // 닉네임이 이미 사용 중인 경우
    }
    throw new Error('닉네임 중복 확인 중 오류가 발생했습니다.');
  }
};
