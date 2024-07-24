import { styled } from "styled-components";

import Banner from "../components/Home/Banner";
import BestClass from "../components/Home/ClassList/BestClass";
import NewClass from "../components/Home/ClassList/NewClass";
import BestBoard from "../components/Home/BoardList/BestBoard";

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
