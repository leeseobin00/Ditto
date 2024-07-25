import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ProQuestionItem from '../../../components/MyPage/ProQuestions/ProQuestionItem';
import AnswerModal from '../../../components/MyPage/ProQuestions/AnswerModal';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [mode, setMode] = useState('답변'); // '답변' or '수정'

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // const response = await axios.get(`http://localhost:8080/mypage/${userId}/question/pro`, {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        //   },
        // });
        // setQuestions(response.data.questions);

        // 더미 데이터 사용
        const dummyQuestions = [
          {
            questionId: 1,
            title: '오늘부터 나도 작가! 독서 클래스',
            content: '수강했는데 어떠한 개선이 있어야 할지 궁금합니다.',
            createdDate: '2024-08-03',
            modifiedDate: '2024-08-03',
            isDeleted: false,
            isAnswered: true,
            userId: 1,
            nickname: '이강사',
            fileId: 1,
            fileUrl: 'https://example.com/file1.png',
            lectureId: 1,
            classId: 1,
            className: '독서 클래스',
            year: 2024,
            month: 8,
            day: 3,
            hour: 12,
            minute: 0,
            answer: {
              answerId: 1,
              content: '답변 내용입니다.',
              createdDate: '2024-08-04',
              modifiedDate: '2024-08-04',
              isDeleted: false,
              userId: 1,
              questionId: 1,
            }
          },
          {
            questionId: 2,
            title: '입문자도 바로 할 수 있는 간단한 그림 그리기 클래스',
            content: '수업의 퀄리티가 너무 낮은 것 같습니다. 어떻게 하면 좋을까요?',
            createdDate: '2024-07-11',
            modifiedDate: '2024-07-11',
            isDeleted: false,
            isAnswered: false,
            userId: 1,
            nickname: '김학생',
            fileId: 2,
            fileUrl: 'https://example.com/file2.png',
            lectureId: 2,
            classId: 2,
            className: '그림 클래스',
            year: 2024,
            month: 7,
            day: 11,
            hour: 15,
            minute: 0
          }
        ];
        setQuestions(dummyQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [userId]);

  const handleMore = async () => {
    const lastDate = questions[questions.length - 1]?.createdDate;
    if (lastDate) {
      try {
        // const response = await axios.get(`http://localhost:8080/mypage/${userId}/question/pro-more?final-date=${lastDate}`, {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        //   },
        // });
        // setQuestions([...questions, ...response.data.questions]);

        // 더미 데이터 추가
        const moreDummyQuestions = [
          {
            questionId: 3,
            title: '추가된 질문 제목',
            content: '추가된 질문 내용입니다.',
            createdDate: '2024-07-10',
            modifiedDate: '2024-07-10',
            isDeleted: false,
            isAnswered: false,
            userId: 1,
            nickname: '추가된 학생',
            fileId: 3,
            fileUrl: 'https://example.com/file3.png',
            lectureId: 3,
            classId: 3,
            className: '추가된 클래스',
            year: 2024,
            month: 7,
            day: 10,
            hour: 10,
            minute: 0
          }
        ];
        setQuestions([...questions, ...moreDummyQuestions]);
      } catch (error) {
        console.error('Error fetching more questions:', error);
      }
    }
  };

  const handleAnswer = (question) => {
    setSelectedQuestion(question);
    setMode('답변');
    setIsModalOpen(true);
  };

  const handleEdit = (question) => {
    setSelectedQuestion(question);
    setMode('수정');
    setIsModalOpen(true);
  };

  const handleDelete = async (questionId) => {
    try {
      // await axios.delete(`http://localhost:8080/mypage/answer/${questionId}`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      //   },
      // });
      setQuestions(questions.map(q => q.questionId === questionId ? { ...q, answer: null, isAnswered: false } : q));
    } catch (error) {
      console.error('Error deleting answer:', error);
    }
  };

  const handleModalSubmit = async (answer) => {
    try {
      if (mode === '답변') {
        // await axios.post(`http://localhost:8080/mypage/answer/${selectedQuestion.questionId}`, {
        //   answer,
        //   userId,
        //   questionId: selectedQuestion.questionId,
        // }, {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        //   },
        // });
        setQuestions(questions.map(q => q.questionId === selectedQuestion.questionId ? { ...q, answer: { content: answer }, isAnswered: true } : q));
      } else {
        // await axios.patch(`http://localhost:8080/mypage/answer/${selectedQuestion.questionId}`, {
        //   answer,
        //   answerId: selectedQuestion.answer.answerId,
        // }, {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        //   },
        // });
        setQuestions(questions.map(q => q.questionId === selectedQuestion.questionId ? { ...q, answer: { ...q.answer, content: answer } } : q));
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Error ${mode === '답변' ? 'posting' : 'editing'} answer:`, error);
    }
  };

  return (
    <Container>
      <Header>작성한 문의</Header>
      {questions.map((question) => (
        <ProQuestionItem
          key={question.questionId}
          question={question}
          onAnswer={handleAnswer}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
      <MoreButtonContainer>
        <MoreButton onClick={handleMore}>더보기</MoreButton>
      </MoreButtonContainer>
      <AnswerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialContent={selectedQuestion?.answer?.content || ''}
        mode={mode}
      />
    </Container>
  );
};

export default ProQuestionPage;
