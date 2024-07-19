import { styled } from "styled-components";

import Banner from "../components/home/Banner";
import BestClass from "../components/home/ClassList/BestClass";
import NewClass from "../components/home/ClassList/NewClass";
import BestBoard from "../components/home/BoardList/BestBoard";

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function HomePage() {
  return (
    <HomePageContainer>
      <Banner />
      <BestClass />
      <NewClass />
      <BestBoard />
    </HomePageContainer>
  );
}

export default HomePage;
