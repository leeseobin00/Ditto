import { styled } from "styled-components";

import { IoClose } from 'react-icons/io5';

// Chat window
const ChatWindowWrapper = styled.div`
  position: absolute;
  right: 24px;
  top: calc(60px + 80px + 16px);
  width: 360px;
  height: calc(100% - 60px - 80px - 16px - 60px);
  background-color: #333;
  border-left: 2px solid #444;
  display: flex;
  flex-direction: column;
  z-index: 2000;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #444;
  color: white;
  border-bottom: 1px solid #555;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 8px;
  overflow-y: auto;
`;

const ChatInput = styled.div`
  display: flex;
  border-top: 1px solid #555;
  padding: 8px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 5px;
  margin-right: 8px;
  outline: none;
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


function ChatWindow({toggleChat}){
    return ( <ChatWindowWrapper>
        <ChatHeader>
          <p>Chat</p>
          <IoClose onClick={toggleChat} style={{ cursor: 'pointer' }} />
        </ChatHeader>
        <ChatMessages>
          {/* Add chat messages here */}
        </ChatMessages>
        <ChatInput>
          <Input type="text" placeholder="메시지 입력..." />
          <SendButton>Send</SendButton>
        </ChatInput>
      </ChatWindowWrapper>);
}

export default ChatWindow;
