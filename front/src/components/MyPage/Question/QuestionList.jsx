import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

const Subtitle = styled.div`
  color: var(--TEXT_PRIMARY);
  margin-bottom: 10px;
  font-size: 17px;
  font-weight: bold;
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
  color: var(--SECONDARY);
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid var(--SECONDARY);
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const DeleteButton = styled.button`
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
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.auth);
  const [questions, setQuestions] = useState([]);
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [classId, setClassId] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${baseURL}/mypage/${userId}/question`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      const questionData = response?.data?.data;
      setQuestions(questionData);
    } catch (error) {
      alert('문의 목록 조회 실패. 다시 시도해주세요.');
      console.error('문의 목록 조회 에러:', error);
    }
  };

  const fetchMoreQuestions = async () => {
    if (questions.length === 0) return;
    
    const finalDate = questions[questions.length - 1].createdDate;
    try {
      const response = await axios.get(`${baseURL}/mypage/${userId}/question-more?final-date=${finalDate}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setQuestions((prevQuestions) => [...prevQuestions, ...response?.data?.data]);
    } catch (error) {
      alert('문의 목록 조회 실패. 다시 시도해주세요.');
      console.error('문의 목록 조회 에러:', error);
    }
  };

  const fetchQuestionAnswer = async (questionId) => {
    try {
      const response = await axios.get(`${baseURL}/mypage/${userId}/answer/${questionId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      const answerData = response?.data?.data;
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
      setClassId(question.classId);
      setWriterId(question.userId);
      setLectureId(question.lectureId);
    }
  };

  const handleDelete = async (questionId) => {
    try {
      const response = await axios.delete(`${baseURL}/classes/${classId}/questions/${currentQuestionId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (response.status === 200) {
        setQuestions(questions.filter((q) => q.questionId !== questionId));
      } else {
        alert('삭제 실패. 다시 시도해주세요.');
      }
    } catch (error) {
      alert('삭제 실패. 다시 시도해주세요.');
      console.error('삭제 에러:', error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.patch(
        `${baseURL}/classes/${classId}/questions/${currentQuestionId}`,
        {
          title: editTitle,
          content: editContent,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      if (response.status === 200) {
        setQuestions(
          questions.map((q) =>
            q.questionId === currentQuestionId
              ? { ...q, title: editTitle, content: editContent }
              : q
          )
        );
        setIsEditing(false);
      } else {
        alert('수정 실패. 다시 시도해주세요.');
      }
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
    navigate(`/class/detail/${classId}`);
  };

  return (
    <ListContainer>
      {questions.map((question) => (
        <QuestionItemContainer key={question.questionId}>
          <ClassInfo onClick={() => handleClassClick(question.classId)}>
            <ClassImage src={question.fileUrl} alt={question.className} />
            <ClassDetails>
              <ClassName>{question.className}</ClassName>
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
                <Subtitle>{question.answer.nickname}</Subtitle>
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
