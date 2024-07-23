import React from "react";
import { styled } from "styled-components";
import { IoClose } from "react-icons/io5";

const WindowWrapper = styled.div`
  position: absolute;
  right: 24px;
  top: calc(60px + 80px + 16px);
  width: 360px;
  height: calc(100% - 60px - 80px - 16px - 60px);
  background-color: #333;
  border-left: 2px solid var(--MEETING_SECONDARY);
  display: flex;
  flex-direction: column;
  z-index: 2000;
`;

const WindowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: var(--MEETING_PRIMARY);
  color: white;
  border-bottom: 1px solid var(--MEETING_SECONDARY);
`;

const WindowTitle = styled.p`
  font-size: 18px;
`;

const FileContents = styled.div`
  flex: 1;
  padding: 8px;
  overflow-y: auto;
`;

const SummaryContainer = styled.div`
  background-color: var(--MEETING_SECONDARY);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 8px;
`;

const SummaryTitle = styled.p`
  color: var(--SECONDARY);
  font-size: 16px;
  margin-bottom: 8px;
`;

const SummaryDescription = styled.p`
  color: var(--LIGHT);
  font-size: 14px;
`;

function ContentWindow({ handleWindow, summaries }) {
  return (
    <WindowWrapper>
      <WindowHeader>
        <WindowTitle>Contents</WindowTitle>
        <IoClose onClick={handleWindow} style={{ cursor: "pointer" }} />
      </WindowHeader>
      <FileContents>
        {summaries.map((summary, index) => (
          <SummaryContainer key={index}>
            <SummaryTitle>{summary.title}</SummaryTitle>
            <SummaryDescription>{summary.description}</SummaryDescription>
          </SummaryContainer>
        ))}
      </FileContents>
    </WindowWrapper>
  );
}

export default ContentWindow;
