import { styled } from "styled-components";

import MeetingButton from "../../components/Meeting/MeetingButton";

const TimerWindowWrapper = styled.div`
  position: absolute;
  left: 0px;
  bottom: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--MEETING_SECONDARY);
  padding: 16px;
  border-radius: 8px;
`;

const TimerTitle = styled.p`
  white-space: nowrap;
  margin-bottom: 8px;
  width: 100%;
`;

const TimeInputs = styled.div`
  display: flex;
  jusify-content: flex-start;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const TimeInput = styled.input`
  width: 48px;
  padding: 8px;
  border-radius: 4px;
  color: var(--TEXT_PRIMARY);
  font-size: 14px;
  text-align: center;
`;

const TimeButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
`;

function TimerSetting({
  title,
  inputMinute,
  handleMinute,
  inputSecond,
  handleSecond,
  handleStart,
  handleClose,
}) {
  return (
    <TimerWindowWrapper>
      <TimerTitle>{title}</TimerTitle>
      <TimeInputs>
        <TimeInput
          type="number"
          value={inputMinute}
          onChange={(e) => handleMinute(Number(e.target.value))}
          min="0"
        />
        :
        <TimeInput
          type="number"
          value={inputSecond}
          onChange={(e) => handleSecond(Number(e.target.value))}
          min="0"
          max="59"
        />
      </TimeInputs>
      <TimeButtons>
        <MeetingButton label="시작" onClick={handleStart} />
        <MeetingButton label="취소" onClick={handleClose} />
      </TimeButtons>
    </TimerWindowWrapper>
  );
}

export default TimerSetting;
