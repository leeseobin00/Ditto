export const formatPhoneNumber = (value) => {
    const cleaned = ('' + value).replace(/\D/g, '');
    let match;
    if (cleaned.startsWith('02')) {
      match = cleaned.match(/^(02)(\d{3,4})(\d{4})$/);
    } else {
      match = cleaned.match(/^(01[016789])(\d{3,4})(\d{4})$/);
    }
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return value;
  };
  
  // 전화번호 길이와 시작 번호 02, 01[016789]로 한국에서 유효한 번호임을 확인하고
  // 숫자만 입력받으면 자동으로 010-****-**** 형식으로 반환하는 함수