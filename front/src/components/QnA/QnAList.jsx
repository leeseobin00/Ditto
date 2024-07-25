import styled from "styled-components";

import QnAItem from "./QnAItem";
import MoreButton from "../common/MoreButton";

const QnAListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 15px 0;
`;

function QnAList() {
  const questions = [
    {
      title: "너무 유익하고 강사님이 친절하십니다!",
      content: "너무 유익하고 강사님이 친절하십니다!",
      createdDate: "2024-07-06",
      isAnswered: true,
      userNickname: "김디토",
    },
    {
      title: "너무 유익하고 강사님이 친절하십니다!",
      content: "너무 유익하고 강사님이 친절하십니다!",
      createdDate: "2024-07-06",
      isAnswered: false,
      userNickname: "김디토",
    },
    {
      title: "너무 유익하고 강사님이 친절하십니다!",
      content: "너무 유익하고 강사님이 친절하십니다!",
      createdDate: "2024-07-06",
      isAnswered: true,
      userNickname: "김디토",
    },
  ];

  return (
    <QnAListContainer>
      {questions.map((question, index) => (
        <QnAItem key={index} question={question} />
      ))}
      <MoreButton />
    </QnAListContainer>
  );
}

export default QnAList;
