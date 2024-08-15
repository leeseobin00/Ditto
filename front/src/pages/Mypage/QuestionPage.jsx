import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";

import useAxios from "../../hooks/useAxios";
import MyPageQnAList from "../../components/QnA/QnAList/MyPageQnAList";

const PageContainer = styled.div`
  padding: 20px;
  width: 100%;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: var(--PRIMARY);
`;

const QnANull = styled.div`
  font-size: 18px;
  color: var(--TEXT_SECONDARY);
  padding: 40px;
  text-align: center;
`;

const QuestionPage = () => {
  const userId = useSelector((state) => state.auth.userId);
  const roleId = useSelector((state) => state.auth.roleId);

  const [questions, setQuestions] = useState([]);

  const { sendRequest: getQuestions } = useAxios();

  const loadInitialQuestions = async () => {
    try {
      if (roleId == 2) {
        const response = await getQuestions(
          `/mypage/${userId}/question/pro`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
          "get"
        );
        setQuestions(response?.data);
      } else {
        const response = await getQuestions(
          `/mypage/${userId}/question`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
          "get"
        );
        setQuestions(response?.data);
      }
    } catch (error) {
      console.error(error);
      setQuestions([]);
    }
  };

  useEffect(() => {
    loadInitialQuestions();
  }, [userId]);

  return (
    <PageContainer>
      <Title>{roleId == 1 ? "작성한 문의" : "문의 내역"}</Title>
      {questions.length === 0 && (
        <QnANull>
          {roleId == 1 ? "작성한 문의가 없습니다." : "등록된 문의가 없습니다."}
        </QnANull>
      )}
      <MyPageQnAList
        initialQuestions={questions}
        userId={userId}
        roleId={roleId}
        onUpdate={loadInitialQuestions}
      />
    </PageContainer>
  );
};

export default QuestionPage;
