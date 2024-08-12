import { styled } from "styled-components";
import { IoClose } from "react-icons/io5";
import { BiRefresh } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { MeetingContext } from "../../pages/Meeting/MeetingPage";

const WindowWrapper = styled.div`
  position: fixed; /* Footer를 기준으로 고정된 위치를 설정 */
  right: 24px;
  bottom: 76px; /* Footer의 높이(60px) + 약간의 간격(16px)을 고려 */
  width: 360px;
  height: calc(
    100% - 60px - 80px - 16px - 60px
  ); /* 전체 화면에서 Footer와 ChatWindow의 높이를 뺀 값 */
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

const WindowTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

const CustomRefreshIcon = styled(BiRefresh)`
  margin-left: 16px;
  cursor: pointer;
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

function ContentWindow({ onCloseWindow }) {
  const { getSummary, summaries } = useContext(MeetingContext);
  const [summaryList, setSummaryList] = useState([]);

  useEffect(()=>{
    setSummaryList(summaries);
  }, [summaries]);

  return (
    <WindowWrapper>
      <WindowHeader>
        <WindowTitle>
          Contents
          <CustomRefreshIcon onClick={getSummary} />
        </WindowTitle>
        <IoClose onClick={onCloseWindow} style={{ cursor: "pointer" }} />
      </WindowHeader>
      <FileContents>
        {summaryList.map((summary, index) => (
          <SummaryContainer key={summary?.summaryId}>
            <SummaryTitle>{summary?.stepId}단계</SummaryTitle>
            <SummaryDescription>{summary?.summaryContent}</SummaryDescription>
          </SummaryContainer>
        ))}
      </FileContents>
    </WindowWrapper>
  );
}

export default ContentWindow;
