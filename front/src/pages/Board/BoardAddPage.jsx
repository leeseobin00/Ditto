import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom"; // useParams 추가

import Button from "../../components/common/Button";
import OutlineButton from "../../components/common/OutlineButton";
import TabBar from "../../components/Board/TabBar";
import Filter from "../../components/Board/Filter";
import SelectBox from "../../components/Board/SelectBox";
import SelectTag from "../../components/Board/SelectTag";
import BoardEditor from "../../components/Board/BoardAdd/BoardEditor";
import {
  BOARD_TYPE_OPTIONS,
  CATEGORY_OPTIONS,
  LIVING_TAGS,
  FABRIC_OPTIONS,
  ART_OPTIONS,
  FOOD_OPTIONS,
} from "../../utils/options";

const Wrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 32px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  color: var(--PRIMARY);
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 48px;
  justify-content: flex-start;
  align-items: flex-start;
`;

const NameInput = styled.div`
  width: 160px;
  padding: 8px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 10px;
  background-color: var(--LIGHT);
  white-space: nowrap;
  color: var(--TEXT_SECONDARY);
  font-size: 14px;
`;

const EditorWrapper = styled.div`
  margin-top: 48px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  margin-top: 32px;
`;

function getTagsForCategory(category) {
  switch (category) {
    case "전체":
      return [
        ...LIVING_TAGS,
        ...FABRIC_OPTIONS,
        ...ART_OPTIONS,
        ...FOOD_OPTIONS,
      ];
    case "리빙":
      return LIVING_TAGS;
    case "패브릭":
      return FABRIC_OPTIONS;
    case "아트":
      return ART_OPTIONS;
    case "푸드":
      return FOOD_OPTIONS;
    default:
      return [];
  }
}

function BoardAddPage() {
  const navigate = useNavigate();
  const { postId } = useParams(); // 게시글 ID를 URL 파라미터로 가져옴
  const isEdit = Boolean(postId); // id가 있으면 수정 모드

  const handleCancel = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate("/board/all", { replace: true });
    }
  };

  const [tag, setTag] = useState(null);
  const [boardType, setBoardType] = useState("소통해요");
  const [category, setCategory] = useState("리빙");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleBoardType = (event) => {
    setBoardType(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const [tags, setTags] = useState([]);
  useEffect(() => {
    setTags(getTagsForCategory(category));
  }, [category]);

  const handleTag = (tagValue) => {
    setTag(tagValue);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleEditorChange = (content) => {
    setContent(content);
  };

  useEffect(() => {
    if (isEdit) {
      // 게시글 수정 모드일 때 기존 데이터를 불러오는 로직 추가
      // 예: fetch(`/api/posts/${id}`).then((response) => response.json()).then((data) => {
      //   setTitle(data.title);
      //   setContent(data.content);
      //   setBoardType(data.boardType);
      //   setCategory(data.category);
      //   setTag(data.tag);
      // });
    }
  }, [isEdit, postId]);

  const handleSave = () => {
    if (isEdit) {
      // 수정 로직
      // 예: fetch(`/api/posts/${id}`, { method: 'PUT', body: JSON.stringify({ title, content, boardType, category, tag }) });
    } else {
      // 등록 로직
      // 예: fetch('/api/posts', { method: 'POST', body: JSON.stringify({ title, content, boardType, category, tag }) });
    }
  };

  return (
    <div>
      <TabBar />
      <Wrapper>
        <PageTitle>{isEdit ? "게시글 수정" : "게시글 작성"}</PageTitle>
        <FilterWrapper>
          <Filter title="게시판">
            <SelectBox
              options={BOARD_TYPE_OPTIONS}
              onChange={handleBoardType}
              value={boardType}
            />
          </Filter>
          <Filter title="작성자">
            <NameInput>이름</NameInput>
          </Filter>
        </FilterWrapper>
        <FilterWrapper>
          <Filter title="카테고리">
            <SelectBox
              options={CATEGORY_OPTIONS}
              onChange={handleCategory}
              value={category}
            />
          </Filter>
          <Filter title="태그">
            <SelectTag tags={tags} curTag={tag} handleTag={handleTag} />
          </Filter>
        </FilterWrapper>
        <EditorWrapper>
          <BoardEditor
            title={title}
            content={content}
            onTitleChange={handleTitleChange}
            onEditorChange={handleEditorChange}
          />
        </EditorWrapper>
        <Buttons>
          <OutlineButton onClick={handleCancel} label="취소" color="default" />
          <Button onClick={handleSave} label={isEdit ? "수정" : "등록"} />
        </Buttons>
      </Wrapper>
    </div>
  );
}

export default BoardAddPage;
