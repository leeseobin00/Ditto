import { useEffect, useState } from "react";
import { styled } from "styled-components";
import OutlineButton from "../../common/OutlineButton";
import RoundButton from "../../common/RoundButton";

const Form = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
  margin-top: 16px;
`;

const TextArea = styled.textarea`
  font-family: inherit;
  margin-right: 16px;
  width: 100%;
  height: 80px;
  padding: 8px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 10px;
  resize: none;

  &:focus {
    outline: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

function ReplyForm({
  isCancel,
  onCancel,
  commentId,
  parentId,
  onAddComment,
  initialContent,
  onUpdateComment,
}) {
  const [content, setContent] = useState("");

  const handleContent = (event) => {
    setContent(event.target.value);
  };

  const handleAdd = () => {
    if (onAddComment) {
      onAddComment(content, parentId);
      setContent("");
    }
    if (onUpdateComment) {
      onUpdateComment(content, commentId, parentId);
    }
    if (isCancel) onCancel();
  };

  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
    }
  }, [initialContent]);

  return (
    <Form>
      <TextArea
        value={content}
        onChange={handleContent}
        placeholder="답글을 남겨주세요."
      />
      <ButtonWrapper>
        {isCancel && (
          <OutlineButton
            onClick={onCancel}
            label="취소"
            color="default"
            size="sm"
          />
        )}
        <RoundButton onClick={handleAdd} label="등록" size="sm" />
      </ButtonWrapper>
    </Form>
  );
}

export default ReplyForm;
