import { useState, useEffect } from "react";
import styled from "styled-components";

import useAxios from "../../hooks/useAxios";
import QnAItem from "./QnAItem";
import MoreButton from "../common/MoreButton";

const QnAListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 15px 0;
`;

function QnAList({ classId }) {
  const { sendRequest: getQuestionList } = useAxios();
  const [questionList, setQuestionList] = useState([]);
  const [curPage, setCurPage] = useState(0);

  const handleGetQuestionList = async () => {
    try {
      const response = await getQuestionList(
        `/classes/${classId}/questions?page=${curPage}&size=3`,
        null,
        "get"
      );
      setQuestionList(response.data.questions);
      setCurPage(response.data.currentPage + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetQuestionList();
  }, []);

  return (
    <QnAListContainer>
      {questionList.map((question, index) => (
        <QnAItem key={index} question={question} />
      ))}
      <MoreButton />
    </QnAListContainer>
  );
}

export default QnAList;
