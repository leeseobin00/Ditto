// src/pages/Mypage/MyQuestionsPage.jsx
import React from 'react';
import QuestionList from '../../../components/MyPage/Question/QuestionList';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 20px;
`;
const Title = styled.h2`
  color: var(--PRIMARY);
  font-size: 20px;
  margin: 20px 13px;
`;

const MyQuestionsPage = () => {
  return (
    <PageContainer>
      <Title>작성한 문의</Title>
      <QuestionList />
    </PageContainer>
  );
};

export default MyQuestionsPage;
