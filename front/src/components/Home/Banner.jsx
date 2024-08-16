import { styled, keyframes } from "styled-components";

import BannerBackground from "../../assets/img/banner-bg.png";
import BannerImg from "../../assets/img/banner.png";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const BannerContainer = styled.div`
  min-width: 100%;
  max-width: 100%;
  width: 100%;
  height: 350px;
  min-height: 350px;
  overflow: hidden;
`;

const BannerInner = styled.div`
  background-image: url(${BannerBackground});
  width: calc(100vw - 21px);
  height: 350px;
  background: cover;
  background-position: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

const BannerContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  z-index: 2;
`;

const slideUpAndDown = keyframes`
  0% {
    transform: translate(0, -50%);
  }
  40% {
    transform: translate(0, -70%); 
  }
  100% {
    transform: translate(0, -50%);
  }
`;

const Slogan = styled.div`
  font-size: 30px;
  color: white;
  position: absolute;
  top: 50%;
  left: 3%;
  transform: translate(0, -50%);
  z-index: 3;
  animation: ${slideUpAndDown} 0.8s ease-in-out;
`;

const Img = styled.div`
  height: 100%;
  width: 600px;
  opacity: 0.7;
  background:
    linear-gradient(to right, rgba(255, 184, 115, 1), rgba(0, 0, 0, 0) 40%),
    linear-gradient(
      to left,
      rgba(255, 184, 115, 1) 30%,
      rgba(255, 184, 115, 1) 20%,
      rgba(0, 0, 0, 0) 60%
    ),
    url(${BannerImg}) no-repeat right;
  background-size: 130%;
  opacity: 0.8;
`;

function Banner() {
  return (
    <Wrapper>
      <Slogan>
        혼자서도 완벽하게,
        <br />내 방에서 즐기는 DIY 클래스
      </Slogan>
      <BannerContainer>
        <BannerInner />
        <BannerContent>
          <Img alt="banner-img" />
        </BannerContent>
      </BannerContainer>
    </Wrapper>
  );
}

export default Banner;
