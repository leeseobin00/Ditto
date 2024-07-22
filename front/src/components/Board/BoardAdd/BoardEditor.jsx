import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { styled } from "styled-components";

const EditorContainer = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TitleInput = styled.div`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const QuillWrapper = styled.div`
  .ql-toolbar {
    margin-bottom: 10px;
  }
  .ql-container {
    min-height: 500px; /* 텍스트 부분의 최소 높이 */
  }
`;

const BoardEditor = ({ onTitleChange, onEditorChange }) => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (quillRef.current && !editorRef.current) {
      editorRef.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["link", "image", "video"],
            ["clean"],
          ],
        },
      });

      editorRef.current.on("text-change", () => {
        onEditorChange(editorRef.current.root.innerHTML);
      });
    }
  }, [onEditorChange]);

  const handleTitleChange = (event) => {
    onTitleChange(event);
  };

  return (
    <EditorContainer>
      <TitleInput>
        <Input
          type="text"
          placeholder="제목을 입력하세요"
          onChange={handleTitleChange}
        />
      </TitleInput>
      <QuillWrapper>
        <div ref={quillRef} />
      </QuillWrapper>
    </EditorContainer>
  );
};

export default BoardEditor;
