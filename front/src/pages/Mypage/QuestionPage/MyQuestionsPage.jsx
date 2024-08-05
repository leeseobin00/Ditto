import React from "react";
import { styled } from "styled-components";

import useAxios from "../../../hooks/useAxios";
import QuestionList from "../../../components/MyPage/Question/QuestionList";

const PageContainer = styled.div`
  padding: 20px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: var(--PRIMARY);
`;

const MyQuestionsPage = ({ userId }) => {
  const { sendRequest: getQuestions } = useAxios();

  const loadInitialQuestions = async () => {
    try {
      const response = await getQuestionList(
        `/mypage/${userId}/question`,
        null,
        "get"
      );
      setQuestionList(response.data.questions);
      setCurPage(2); // 첫 페이지 이후의 데이터를 가져오도록 설정
      setTotalPageCount(response.data.totalPageCount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageContainer>
      <Title>작성한 문의</Title>
      <QuestionList />
    </PageContainer>
  );
};

export default MyQuestionsPage;
