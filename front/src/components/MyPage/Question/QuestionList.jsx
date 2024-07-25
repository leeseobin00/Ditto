import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { useSelector } from 'react-redux';
import EditQuestionModal from './EditQuestionModal';

const ListContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const QuestionItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 10px;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClassInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--BORDER_COLOR);
  cursor: pointer;
`;

const ClassImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  margin-right: 20px;
`;

const ClassDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ClassName = styled.div`
  font-weight: bold;
  color: var(--TEXT_PRIMARY);
`;

const ClassDate = styled.div`
  color: var(--TEXT_SECONDARY);
`;

const QuestionTitle = styled.div`
  font-weight: bold;
  color: var(--TEXT_PRIMARY);
`;

const QuestionContent = styled.div`
  margin-top: 10px;
  color: var(--TEXT_SECONDARY);
`;

const QuestionDate = styled.div`
  margin-top: 5px;
  color: var(--TEXT_SECONDARY);
`;

const AnswerDate = styled.div`
  margin-top: 5px;
  color: var(--TEXT_SECONDARY);
`;

const AnswerContent = styled.div`
  margin-top: 10px;
  padding: 15px;
  color: var(--TEXT_PRIMARY);
  background-color: var(--BACKGROUND_SECONDARY);
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const EditButton = styled.button`
  background-color: var(--SECONDARY);
  color: var(--LIGHT);
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const DeleteButton = styled.button`
  background-color: var(--LIGHT);
  color: var(--RED);
  border: 1px solid var(--RED);
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const AnswerToggle = styled.button`
  background-color: transparent;
  color: var(--SECONDARY);
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const AnswerContainer = styled.div`
  margin-top: 10px;
  padding-top: 10px;
`;

const LoadMoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const LoadMoreButton = styled.button`
  padding: 10px 20px;
  background-color: var(--SECONDARY);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    filter: brightness(0.9);
  }
`;

const QuestionList = () => {
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.auth);
  const [questions, setQuestions] = useState([]);
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [finalDate, setFinalDate] = useState(null);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      // const response = await axios.get(`http://localhost:8080/mypage/${userId}/question`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      //   },
      // });
      // const questionData = response.data.questions;
      const questionData = [
        {
          questionId: 1,
          title: '문의 제목 1',
          content: '문의 내용 1',
          createdDate: '2023-07-21T12:34:56Z',
          modifiedDate: '2023-07-22T12:34:56Z',
          isDeleted: false,
          isAnswered: true,
          fileId: 1,
          fileUrl: '/path/to/image1.jpg',
          classId: 101,
          className: '오늘부터 나도 갓생! 독서 클래스',
          year: 2023,
          month: 7,
          day: 21,
          hour: 12,
          minute: 34,
          answer: {
            answerId: 1,
            answer: '답변 내용 1',
            createdDate: '2023-07-23T12:34:56Z',
            modifiedDate: '2023-07-23T12:34:56Z',
            isDeleted: false,
          }
        },
        {
          questionId: 2,
          title: '문의 제목 2',
          content: '문의 내용 2',
          createdDate: '2023-07-20T12:34:56Z',
          modifiedDate: '2023-07-21T12:34:56Z',
          isDeleted: false,
          isAnswered: false,
          fileId: 2,
          fileUrl: '/path/to/image2.jpg',
          classId: 102,
          className: '입문자도 바로 할 수 있는 2주 완성 그림의 기본기 클래스',
          year: 2023,
          month: 7,
          day: 20,
          hour: 12,
          minute: 34,
        },
      ];
      setQuestions(questionData);
      setFinalDate(questionData[questionData.length - 1].createdDate);
    } catch (error) {
      alert('문의 목록 조회 실패. 다시 시도해주세요.');
      console.error('문의 목록 조회 에러:', error);
    }
  };

  const fetchMoreQuestions = async () => {
    try {
      // const response = await axios.get(`http://localhost:8080/mypage/${userId}/question-more?final-date=${finalDate}`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      //   },
      // });
      // const questionData = response.data.questions;
      const questionData = [
        {
          questionId: 3,
          title: '문의 제목 3',
          content: '문의 내용 3',
          createdDate: '2023-07-19T12:34:56Z',
          modifiedDate: '2023-07-20T12:34:56Z',
          isDeleted: false,
          isAnswered: true,
          fileId: 3,
          fileUrl: '/path/to/image3.jpg',
          classId: 103,
          className: '또 다른 클래스',
          year: 2023,
          month: 7,
          day: 19,
          hour: 12,
          minute: 34,
          answer: {
            answerId: 2,
            answer: '답변 내용 2',
            createdDate: '2023-07-24T12:34:56Z',
            modifiedDate: '2023-07-24T12:34:56Z',
            isDeleted: false,
          }
        },
      ];
      setQuestions((prevQuestions) => [...prevQuestions, ...questionData]);
      setFinalDate(questionData[questionData.length - 1].createdDate);
    } catch (error) {
      alert('문의 목록 조회 실패. 다시 시도해주세요.');
      console.error('문의 목록 조회 에러:', error);
    }
  };

  const fetchQuestionAnswer = async (questionId) => {
    try {
      // const response = await axios.get(`http://localhost:8080/mypage/${userId}/question/${questionId}`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      //   },
      // });
      // const answerData = response.data;
      const answerData = {
        answerId: 1,
        answer: '답변 내용 1',
        createdDate: '2023-07-23T12:34:56Z',
        modifiedDate: '2023-07-23T12:34:56Z',
        isDeleted: false,
      };
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.questionId === questionId ? { ...q, answer: answerData } : q
        )
      );
    } catch (error) {
      console.error('답변 조회 에러:', error);
    }
  };

  const handleEdit = (questionId) => {
    const question = questions.find((q) => q.questionId === questionId);
    if (question) {
      setCurrentQuestionId(questionId);
      setEditTitle(question.title);
      setEditContent(question.content);
      setIsEditing(true);
    }
  };

  const handleDelete = async (questionId) => {
    try {
      // const response = await axios.delete(`http://localhost:8080/questions/${questionId}`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      //   },
      // });
      // if (response.status === 200) {
        setQuestions(questions.filter((q) => q.questionId !== questionId));
      // } else {
      //   alert('삭제 실패. 다시 시도해주세요.');
      // }
    } catch (error) {
      alert('삭제 실패. 다시 시도해주세요.');
      console.error('삭제 에러:', error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      // const response = await axios.patch(
      //   `http://localhost:8080/questions/${currentQuestionId}`,
      //   {
      //     title: editTitle,
      //     content: editContent,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      //     },
      //   }
      // );
      // if (response.status === 200) {
        setQuestions(
          questions.map((q) =>
            q.questionId === currentQuestionId
              ? { ...q, title: editTitle, content: editContent }
              : q
          )
        );
        setIsEditing(false);
      // } else {
      //   alert('수정 실패. 다시 시도해주세요.');
      // }
    } catch (error) {
      alert('수정 실패. 다시 시도해주세요.');
      console.error('수정 에러:', error);
    }
  };

  const toggleAnswer = (questionId) => {
    if (openQuestionId === questionId) {
      setOpenQuestionId(null);
    } else {
      fetchQuestionAnswer(questionId);
      setOpenQuestionId(questionId);
    }
  };

  const handleClassClick = (classId) => {
    navigate(`/class/${classId}`);
  };

  return (
    <ListContainer>
      {questions.map((question) => (
        <QuestionItemContainer key={question.questionId}>
          <ClassInfo onClick={() => handleClassClick(question.classId)}>
            <ClassImage src={question.fileUrl} alt={question.className} />
            <ClassDetails>
              <ClassName>{question.className}</ClassName>
              <ClassDate>{`${question.year}.${String(question.month).padStart(
                2,
                '0'
              )}.${String(question.day).padStart(2, '0')} ${String(
                question.hour
              ).padStart(2, '0')}:${String(question.minute).padStart(2, '0')}`}</ClassDate>
            </ClassDetails>
          </ClassInfo>
          <QuestionHeader>
            <QuestionTitle>{question.title}</QuestionTitle>
            {question.isAnswered ? (
              <span style={{ color: 'green' }}>답변 완료</span>
            ) : (
              <span style={{ color: 'red' }}>미답변</span>
            )}
          </QuestionHeader>
          <QuestionContent>{question.content}</QuestionContent>
          <QuestionDate>
            {new Date(question.createdDate).toLocaleDateString()}
          </QuestionDate>
          <ButtonGroup>
            {!question.isAnswered && (
              <>
                <EditButton onClick={() => handleEdit(question.questionId)}>
                  수정
                </EditButton>
                <DeleteButton onClick={() => handleDelete(question.questionId)}>
                  삭제
                </DeleteButton>
              </>
            )}
          </ButtonGroup>
          {question.isAnswered && (
            <AnswerToggle onClick={() => toggleAnswer(question.questionId)}>
              {openQuestionId === question.questionId
                ? '답변 숨기기'
                : '답변 보기'}
            </AnswerToggle>
          )}
          {openQuestionId === question.questionId && question.answer && (
            <AnswerContainer>
              <AnswerContent>
                {question.answer.answer}
                <AnswerDate>
                  {new Date(question.answer.createdDate).toLocaleDateString()}
                </AnswerDate>
              </AnswerContent>
            </AnswerContainer>
          )}
        </QuestionItemContainer>
      ))}
      <LoadMoreButtonContainer>
        <LoadMoreButton onClick={fetchMoreQuestions}>더보기</LoadMoreButton>
      </LoadMoreButtonContainer>
      <EditQuestionModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSaveEdit}
        title={editTitle}
        content={editContent}
        setTitle={setEditTitle}
        setContent={setEditContent}
      />
    </ListContainer>
  );
};

export default QuestionList;
