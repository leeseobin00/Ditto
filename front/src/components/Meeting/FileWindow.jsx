import React from 'react';
import { styled } from "styled-components";
import { IoClose } from 'react-icons/io5';

// File window
const FileWindowWrapper = styled.div`
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

const FileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #444;
  color: white;
  border-bottom: 1px solid #555;
`;

const FileContents = styled.div`
  flex: 1;
  padding: 8px;
  overflow-y: auto;
`;

function FileWindow({ toggleFile }) {
  return (
    <FileWindowWrapper>
      <FileHeader>
        <p>Files</p>
        <IoClose onClick={toggleFile} style={{ cursor: 'pointer' }} />
      </FileHeader>
      <FileContents>
        {/* Add file contents or file management interface here */}
      </FileContents>
    </FileWindowWrapper>
  );
}

export default FileWindow;
