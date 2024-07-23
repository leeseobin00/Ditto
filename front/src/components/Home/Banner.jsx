import { styled } from "styled-components";

import BannerImage from "../../assets/img/banner-tmp.png";

const BannerContainer = styled.div`
  min-width: 100%;
  max-width: 100%;
  width: 100%;
  height: 350px;
  min-height: 350px;
`;

const BannerInner = styled.div`
  background-image: url(${BannerImage});
  width: 100%;
  height: 350px;
  background: cover;
  background-position: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const Slogan = styled.div`
  font-size: 30px;
  color: white;
  margin: 0 auto;
`;

function Banner() {
  return (
    <BannerContainer>
      <BannerInner>
        <Slogan>혼자서도 완벽하게, 내 방에서 즐기는 DIY 클래스</Slogan>
      </BannerInner>
    </BannerContainer>
  );
}

export default Banner;
