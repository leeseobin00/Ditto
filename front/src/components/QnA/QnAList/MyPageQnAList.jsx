import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Swal from 'sweetalert2';

import useAxios from "../../../hooks/useAxios";
import QnAItem from "./QnAItem";
import MoreButton from "../../common/MoreButton";

const ListContainer = styled.div`
  margin: 10px;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  padding: 20px;
  margin: 20px 0;
`;

const ClassInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const ClassImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  margin-right: 30px;
`;

const ClassName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: var(--TEXT_PRIMARY);
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 8px 0;
  border: 0.5px solid var(--BACKGROUND_COLOR);
`;

const MyPageQnAList = ({ initialQuestions = [], userId, roleId, onUpdate }) => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [showMore, setShowMore] = useState(true);

  const { sendRequest: getQuestions } = useAxios();

  const navigate = useNavigate();

  useEffect(() => {
    if (initialQuestions.length === 0) {
      setShowMore(false);
    }
  }, [initialQuestions]);

  const loadMoreQuestions = async () => {
    const lastDate = questions[questions.length - 1]?.createdDate;
    if (lastDate) {
      try {
        let endpoint =
          roleId == 2
            ? `/mypage/${userId}/question/pro-more?final-date=${lastDate}`
            : `/mypage/${userId}/question-more?final-date=${lastDate}`;
        const response = await getQuestions(
          endpoint,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
          "get"
        );
        if (response?.data?.length > 0) {
          setQuestions((prevQuestions) => [...prevQuestions, ...response.data]);
          if (response?.data?.length < 3) {
            setShowMore(false);
          }
        } else {
          await Swal.fire({
            title: '정보',
            text: '더 이상 불러올 질문이 없습니다.',
            icon: 'info',
            confirmButtonText: "확인",
            confirmButtonColor: "#FF7F50",
          });
          setShowMore(false);
        }
      } catch (error) {
        console.error(error);
        await Swal.fire({
          title: '오류 발생',
          text: '질문을 불러오는 중 오류가 발생했습니다.',
          icon: 'error',
          confirmButtonText: "확인",
          confirmButtonColor: "#FF7F50",
        });
      }
    }
  };

  const handleClassClick = (classId) => {
    navigate(`/classes/detail/${classId}`);
  };

  const handleDeleteQuestion = (deletedQuestionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter(
        (question) => question.questionId !== deletedQuestionId
      )
    );
  };

  useEffect(() => {
    if (initialQuestions) {
      setQuestions(initialQuestions);
    }
  }, [initialQuestions]);

  return (
    <ListContainer>
      {questions?.map((question) => (
        <QuestionItemContainer key={question.questionId}>
          <ClassInfo>
            <ClassImage
              src={`http://i11a106.p.ssafy.io:8080/files/download/${question?.fileId}`}
              alt={question?.className}
            />
            <ClassName onClick={() => handleClassClick(question?.classId)}>
              {question?.className}
            </ClassName>
          </ClassInfo>
          <Hr />
          <QnAItem
            question={question}
            userId={userId}
            isInstructor={roleId == 2 ? true : false}
            isMyQuestion={roleId == 1 ? true : false}
            onDelete={handleDeleteQuestion}
            onUpdate={onUpdate}
          />
        </QuestionItemContainer>
      ))}
      {showMore && <MoreButton onClick={loadMoreQuestions} />}
    </ListContainer>
  );
};

export default MyPageQnAList;
