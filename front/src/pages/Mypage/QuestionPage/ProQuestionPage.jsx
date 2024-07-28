import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ProQuestionItem from '../../../components/MyPage/ProQuestions/ProQuestionItem';
import AnswerCreateModal from '../../../components/MyPage/ProQuestions/AnswerCreateModal';
import AnswerEditModal from '../../../components/MyPage/ProQuestions/AnswerEditModal';
import axios from 'axios';

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.h2`
  color: var(--PRIMARY);
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const MoreButton = styled.button`
  padding: 10px 20px;
  background-color: var(--SECONDARY);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const ProQuestionPage = () => {
  const { userId } = useSelector((state) => state.auth);
  const [questions, setQuestions] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/mypage/${userId}/question/pro`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setQuestions(response.data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setQuestions([]); // 에러가 발생해도 빈 배열로 초기화
      }
    };

    fetchQuestions();
  }, [userId]);

  const fetchQuestionAnswer = async (questionId) => {
    try {
      const response = await axios.get(`http://localhost:8080/mypage/${userId}/answer/${questionId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      const answerData = response.data;
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.questionId === questionId ? { ...q, answer: answerData } : q
        )
      );
    } catch (error) {
      console.error('Error fetching answer:', error);
    }
  };

  const handleMore = async () => {
    const lastDate = questions[questions.length - 1]?.createdDate;
    if (lastDate) {
      try {
        const response = await axios.get(`http://localhost:8080/mypage/${userId}/question/pro-more?final-date=${lastDate}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setQuestions([...questions, ...response.data.questions]);
      } catch (error) {
        console.error('Error fetching more questions:', error);
      }
    }
  };

  const handleAnswer = (question) => {
    setSelectedQuestion(question);
    setIsCreateModalOpen(true);
  };

  const handleEdit = (question) => {
    setSelectedQuestion(question);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (answerId) => {
    try {
      await axios.delete(`http://localhost:8080/mypage/answer/${answerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setQuestions(questions.map(q => q.answer?.answerId === answerId ? { ...q, answer: null, isAnswered: false } : q));
    } catch (error) {
      console.error('Error deleting answer:', error);
    }
  };

  const handleCreateModalSubmit = async (answer) => {
    try {
      const response = await axios.post(`http://localhost:8080/mypage/${userId}/answer/${selectedQuestion.questionId}`, {
        answer,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setQuestions(questions.map(q => q.questionId === selectedQuestion.questionId ? { ...q, answer: response.data, isAnswered: true } : q));
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error posting answer:', error);
    }
  };

  const handleEditModalSubmit = async (answer) => {
    try {
      const response = await axios.patch(`http://localhost:8080/mypage/answer/${selectedQuestion.answer.answerId}`, {
        answer,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setQuestions(questions.map(q => q.questionId === selectedQuestion.questionId ? { ...q, answer: response.data } : q));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error editing answer:', error);
    }
  };

  return (
    <Container>
      <Header>작성한 문의</Header>
      {questions?.map((question) => (
        <ProQuestionItem
          key={question.questionId}
          question={question}
          onAnswer={handleAnswer}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleAnswer={fetchQuestionAnswer}
          isAnswerVisible={question.isAnswered && question.answer}
        />
      ))}
      <MoreButtonContainer>
        <MoreButton onClick={handleMore}>더보기</MoreButton>
      </MoreButtonContainer>
      <AnswerCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateModalSubmit}
      />
      <AnswerEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditModalSubmit}
        initialContent={selectedQuestion?.answer?.answer || ''}
      />
    </Container>
  );
};

export default ProQuestionPage;
