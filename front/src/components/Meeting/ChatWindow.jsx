import { useState, useEffect, useRef, useContext } from "react";
import { styled } from "styled-components";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
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

const WindowTitle = styled.p`
  font-size: 18px;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 8px;
  overflow-y: auto;
  background-color: #333;
`;

const ChatInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #555;
  padding: 8px;
`;

const ChatInput = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const Select = styled.select`
  margin-right: 8px;
  padding: 8px;
  border: none;
  border-radius: 5px;
  background-color: var(--MEETING_SECONDARY);
  color: white;
  font-size: 14px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 5px;
  margin-right: 8px;
  outline: none;
  background-color: var(--MEETING_SECONDARY);
  color: white;
`;

const SendButton = styled.button`
  background-color: #555;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #666;
  }
`;

const MessageContainer = styled.div`
  background-color: rgba(27, 27, 27, 0.5);
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

const MessageInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #aaa;
  margin-bottom: 4px;
`;

const UserName = styled.p`
  font-size: 16px;
  color: var(--SECONDARY);
`;

const Message = styled.div`
  padding: 8px;
  // align-self: ${(props) => (props.isOwnMessage ? "flex-end" : "flex-start")};
`;

const MessageTime = styled.p`
  font-size: 14px;
  color: var(--TEXT_TERITARY);
`;

function ChatWindow({ onCloseWindow }) {
  // redux
  const username = useSelector((state)=>state.auth.nickname);
  // context API
  const { sendChat, chatMessages, members } = useContext(MeetingContext);

  const [inputValue, setInputValue] = useState("");
  const [selectedUser, setSelectedUser] = useState("모두에게");
  const [users, setUsers] = useState(["모두에게"]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setUsers((prev) => {
      const uniqueUsers = Array.from(new Set([...prev, ...members]));
      return uniqueUsers;
    });
  }, [members]);

  const handleSend = () => {
    if (inputValue.trim()) {
      sendChat(username, 
        inputValue, 
        new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        }), 
        selectedUser);
      setInputValue("");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  return (
    <WindowWrapper>
      <WindowHeader>
        <WindowTitle>Chat</WindowTitle>
        <IoClose onClick={onCloseWindow} style={{ cursor: "pointer" }} />
      </WindowHeader>
      <ChatMessages>
        {chatMessages.map((message, index) => (
          <MessageContainer key={index}>
            <MessageInfo>
              <UserName>
                {message.sender}
              </UserName>
              <MessageTime>{message.time}</MessageTime>
            </MessageInfo>
            <Message>
              {message.message}
            </Message>
          </MessageContainer>
        ))}
        <div ref={messagesEndRef} />
      </ChatMessages>
      <ChatInputWrapper>
        <Select value={selectedUser} onChange={handleUserChange}>
          {users.map((user, index) => (
            <option key={index} value={user}>
              {user}
            </option>
          ))}
        </Select>
        <ChatInput>
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="메시지 입력..."
          />
          <SendButton onClick={handleSend}>Send</SendButton>
        </ChatInput>
      </ChatInputWrapper>
    </WindowWrapper>
  );
}

export default ChatWindow;
