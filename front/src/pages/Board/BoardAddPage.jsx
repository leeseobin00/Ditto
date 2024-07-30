import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import useAxios from "../../hooks/useAxios";
import useFormDataAxios from "../../hooks/useFormDataAxios";
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
  getTagsForCategory,
  getBoardTypeLabelByValue,
  getCategoryLabelByValue,
  getStartTagIdForCategory
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

function BoardAddPage() {
  // redux
  const userId = useSelector(state => state.auth.userId);
  const userName = useSelector(state => state.auth.nickname);
  // axios
  const { sendRequest: getPost } = useAxios();
  const { sendRequest: postPost } = useFormDataAxios();
  // router
  const navigate = useNavigate();
  const { postId } = useParams();
  const isEdit = Boolean(postId);

  const handleCancel = () => {
    navigate(-1);
  };

  const [postData, setPostData] = useState({
    userId: userId,
    username: "김싸피",
    boardId: 1,
    categoryId: 1,
    tagId: 1,
    title: "",
    content: "",
  });

  const handleGetPost = async () => {
    const result = await getPost(`/posts/${postId}`, null, "get");

    setPostData({
      userId: userId,
      boardId: result?.data?.boardId,
      categoryId: result?.data?.categoryId,
      tagId: result?.data?.tagId,
      title: result?.data?.title,
      content: result?.data?.content,
    });
  
    const files = result?.data?.files;
  
    // DOMParser를 사용하여 HTML 문자열을 파싱
    const parser = new DOMParser();
    const doc = parser.parseFromString(result?.data?.content, 'text/html');
  
    // 이미지 태그들을 선택
    const images = doc.querySelectorAll('img');
  
    // 파일을 base64로 변환하는 함수
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  
    // 이미지를 base64로 변환하여 src에 할당
    const updateImageSrc = async () => {
      for (let i = 0; i < images.length; i++) {
        if (i < files.length) {
          const baseUrl = import.meta.env.VITE_BASE_URL;
          const fileId = files[i]?.fileId;
          const response = await axios.get(`${baseUrl}/files/download/${fileId}`, {
            responseType: 'blob'
          });
          const fileBlob = response.data;
          const base64 = await toBase64(fileBlob);
          images[i].src = base64;
        }
      }
  
      // 변경된 HTML 내용을 문자열로 변환
      const updatedContent = doc.body.innerHTML;
  
      setPostData((prev) => ({
        ...prev,
        content: updatedContent,
      }));
  
      setCategory(result?.data?.categoryId);
      setTag(getStartTagIdForCategory(result?.data?.tagId));
    };
  
    updateImageSrc();
  };  

  useEffect(() => {
    if (isEdit) {
      handleGetPost();
    }
  }, [isEdit, postId]);

  // form
  const [category, setCategory] = useState(1);
  const [tags, setTags] = useState(getTagsForCategory(1));
  const [tag, setTag] = useState(1);

  useEffect(() => {
    setTags(getTagsForCategory(category));
    let ret = 1;
    switch (category) {
      case 1:
        ret = 1;
        break;
      case 2:
        ret = 6;
        break;
      case 3:
        ret = 12;
        break;
      case 4:
        ret = 14;
        break;
    }
    setPostData((prevState) => ({
      ...prevState,
      tagId: ret,
    }));
  }, [category]);

  const handleBoardType = (event) => {
    setPostData((prevState) => ({
      ...prevState,
      boardId: event.target.value,
    }));
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
    setPostData((prevState) => ({
      ...prevState,
      categoryId: event.target.value,
    }));
  };

  const handleTag = (tagId) => {
    setTag(tagId);
    setPostData((prevState) => ({
      ...prevState,
      tagId,
    }));
  };

  const handleTitle = (event) => {
    setPostData((prevState) => ({
      ...prevState,
      title: event.target.value,
    }));
  };

  const handleEditor = (content) => {
    setPostData((prevState) => ({
      ...prevState,
      content,
    }));
  };

  const handleSave = async () => {
    const url = isEdit ? `/posts/${postId}` : "/posts";
    const method = isEdit ? "patch" : "post";

    //1. HTML에서 img 태그의 src 값 추출
    const parser = new DOMParser();
    const doc = parser.parseFromString(postData?.content, 'text/html');
    const imgTags = doc.querySelectorAll('img');
    const srcArray = Array.from(imgTags).map(img => img.src);
    console.log(srcArray);

    const base64ToBlob = (base64, mime) => {
      const byteString = atob(base64.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mime });
    };

    const filesArray = srcArray.map((src, index) => {
        const mime = src.match(/data:(.*);base64,/)[1];
        const blob = base64ToBlob(src, mime);
        return new File([blob], `image${index}.${mime.split('/')[1]}`);
    });

    // 2. src 값을 파일 인덱스로 대체한 새로운 HTML 콘텐츠 생성
    let updatedContent = postData?.content;

    srcArray.forEach((src, index) => {
        updatedContent = updatedContent.replace(`src="${src}"`, `src={files[${index}]}`);
    });

    // setPostData를 사용하여 상태 업데이트
    setPostData((prevState) => ({
      ...prevState,
      content: updatedContent
    }));

    const formData = new FormData();
    formData.append("post", new Blob([JSON.stringify({...postData, content:updatedContent})], { type: "application/json" }));
    filesArray.forEach((file, index) => {
      formData.append("files", file);
    });
    // for (const file of files) {
    //   formData.append("files", file);
    // }

    try {
      await postPost(url, formData, method);
      handleCancel();
    } catch (error) {
      console.error(error);
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
              curOption={getBoardTypeLabelByValue(postData?.boardId)}
            />
          </Filter>
          <Filter title="작성자">
            <NameInput>{userName}</NameInput>
          </Filter>
        </FilterWrapper>
        <FilterWrapper>
          <Filter title="카테고리">
            <SelectBox
              options={CATEGORY_OPTIONS}
              onChange={handleCategory}
              curOption={getCategoryLabelByValue(category)}
            />
          </Filter>
          <Filter title="태그">
            <SelectTag
              tags={tags}
              curTag={tag}
              handleTag={handleTag}
            />
          </Filter>
        </FilterWrapper>
        <EditorWrapper>
          <BoardEditor
            title={postData?.title}
            content={postData?.content}
            onTitleChange={handleTitle}
            onEditorChange={handleEditor}
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
