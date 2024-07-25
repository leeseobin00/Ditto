import { useState } from "react";
import { styled } from "styled-components";
import OutlineButton from "../../common/OutlineButton";
import Button from "../../common/Button";

const Form = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

const TextArea = styled.textarea`
  margin-right: 16px;
  width: 100%;
  height: 80px;
  padding: 8px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 10px;

  &:focus {
    outline: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

function ReplyForm({ isCancel, onCancel, parentId, onAddComment }) {
  const [content, setContent] = useState("");

  const handleContent = (event) => {
    setContent(event.target.value);
  };

  const handleAdd = () => {
    onAddComment(content, parentId);
    setContent("");
    if (isCancel) onCancel();
  };

  return (
    <Form>
      <TextArea value={content} onChange={handleContent} placeholder="답글을 남겨주세요." />
      <ButtonWrapper>
        {isCancel && (
          <OutlineButton
            onClick={onCancel}
            label="취소"
            color="default"
            size="sm"
          />
        )}
        <Button onClick={handleAdd} label="등록" size="sm" />
      </ButtonWrapper>
    </Form>
  );
}

export default ReplyForm;
