import { useEffect, useState } from "react";
import { styled } from "styled-components";

import useAxios from "../hooks/useAxios";
import Banner from "../components/Home/Banner";
import ClassList from "../components/Home/ClassList";
import BestBoardList from "../components/Home/BestBoardList";

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3%;
  padding: 0 20px;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 10px;
`;

function HomePage() {
  const { sendRequest } = useAxios();

  const [bestClasses, setBestClasses] = useState([]);
  const [newClasses, setNewClasses] = useState([]);
  const [bestPosts, setBestPosts] = useState([]);

  const getBestClasses = async () => {
    const response = await sendRequest("/classes/weeklybest", null, "get");
    setBestClasses(response?.data);
  };

  const getNewClasses = async () => {
    const response = await sendRequest("/classes/weeklynew", null, "get");
    setNewClasses(response?.data);
  };

  const getBestPosts = async () => {
    const response = await sendRequest("/posts/weeklybest", null, "get");
    setBestPosts(response?.data.posts);
  };

  useEffect(() => {
    getBestClasses();
    getNewClasses();
    getBestPosts();
  }, []);

  return (
    <HomePageContainer>
      <Banner />
      <ListContainer>
        <Title>Best Class</Title>
        <ClassList classList={bestClasses} />
      </ListContainer>
      <ListContainer>
        <Title>New Class</Title>
        <ClassList classList={newClasses} />
      </ListContainer>
      <ListContainer>
        <Title>Best 게시글</Title>
        <BestBoardList bestPosts={bestPosts} />
      </ListContainer>
    </HomePageContainer>
  );
}

export default HomePage;
