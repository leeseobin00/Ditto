import React from "react";
import { styled, keyframes } from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 32px;
  padding-top: 128px;
  flex-direction: column;
`;

const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.2) rotate(20deg);
  }
`;

const NoContentMessage = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 32px;
`;

const BallsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 128px;
`;

const Ball = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  animation: ${bounceAnimation} ${({ duration }) => duration || "1.5s"}
    ease-in-out infinite;
  animation-delay: ${({ delay }) => delay || "0s"};
  background-color: ${({ color }) => color || "black"};
  transition: background-color 0.5s ease;
`;

function NoContentPage() {
  return (
    <Container>
      <NoContentMessage>
        죄송합니다. 해당 페이지를 찾을 수 없습니다.
      </NoContentMessage>
      <BallsContainer>
        <Ball color="#FF4500" delay="0s" duration="1.5s" /> {/* Orange */}
        <Ball color="#FF6347" delay="0.3s" duration="1.6s" />{" "}
        {/* Dark Orange */}
        <Ball color="#FF7F50" delay="0.6s" duration="1.7s" /> {/* Coral */}
        <Ball color="#FF8C00" delay="0.9s" duration="1.8s" /> {/* Tomato */}
        <Ball color="#FFA500" delay="1.2s" duration="1.9s" /> {/* Orange Red */}
      </BallsContainer>
    </Container>
  );
}

export default NoContentPage;
