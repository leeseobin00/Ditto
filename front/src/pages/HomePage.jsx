// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";

// import { increment, decrement } from "../features/counter/counterSlice";
import Banner from "../components/home/Banner";
import BestBoardList from "../components/home/BestBoardList";
import BestClass from "../components/home/BestClass";
import NewClassList from "../components/home/NewClassList";

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

function HomePage() {
  return (
    <HomePageContainer>
      <Banner />
      <BestClass />
      <NewClassList />
      <BestBoardList />
    </HomePageContainer>
  );
}

export default HomePage;
