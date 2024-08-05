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
  align-items: center;
`;

const QnANull = styled.div`
  font-size: 20px;
  color: var(--TEXT_SECONDARY);
  padding: 20px;
`;

function QnAList({ classId, isInstructor }) {
  const { sendRequest: getQuestionList } = useAxios();
  const [questionList, setQuestionList] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);

  const loadInitialQuestions = async () => {
    try {
      const response = await getQuestionList(
        `/classes/${classId}/questions?page=${curPage}&size=3`,
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

  const loadMoreQuestions = async (page) => {
    try {
      const response = await getQuestionList(
        `/classes/${classId}/questions?page=${page}&size=3`,
        null,
        "get"
      );
      setQuestionList((prevQuestionList) => [
        ...prevQuestionList,
        ...response.data.questions,
      ]);
      setCurPage(curPage + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadInitialQuestions(); // 컴포넌트가 마운트될 때 초기 데이터를 로드
  }, [classId]); // classId가 변경될 때마다 재호출

  const handleMoreButtonClick = () => {
    loadMoreQuestions(curPage);
  };

  return (
    <QnAListContainer>
      {questionList.length == 0 && <QnANull>등록된 문의가 없습니다.</QnANull>}
      {questionList.map((question, index) => (
        <QnAItem key={index} question={question} isInstructor={isInstructor} />
      ))}
      {curPage <= totalPageCount && (
        <MoreButton onClick={handleMoreButtonClick} />
      )}
    </QnAListContainer>
  );
}

export default QnAList;
