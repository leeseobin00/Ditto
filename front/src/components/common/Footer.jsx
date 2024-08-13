import styled from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 90px;
  width: 100%;
  background-color: pink;
  position: relative; /* FooterInner를 상대적으로 배치하기 위해 position을 설정 */
`;

const FooterInner = styled.div`
  background-color: var(--BACKGROUND_COLOR);
  width: calc(100vw - 21px);
  height: 90px;
  position: absolute; /* absolute로 설정하여 FooterContainer 하단에 고정 */
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  margin: 0 auto;
`;

const DetailLine = styled.div`
  font-size: 10px;
  z-index: 1;
`;

function Footer() {
  return (
    <FooterContainer>
      <DetailLine>© 2024 Ditto Inc. All rights reserved.</DetailLine>
      <DetailLine>
        서울특별시 강남구 테헤란로 212, 801호 | 전화: 02-1234-5678 | 이메일:
        support@Ditto.com
      </DetailLine>
      <DetailLine>
        홈 | 서비스 소개 | 이용약관 | 개인정보 처리방침 | 고객지원
      </DetailLine>
      <DetailLine>자주 묻는 질문(FAQ) | 문의하기 | 지원 센터</DetailLine>
      <FooterInner />
    </FooterContainer>
  );
}

export default Footer;
