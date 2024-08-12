import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import useFormDataAxios from "../../hooks/useFormDataAxios";
import RoundButton from "../../components/common/RoundButton";
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
  background-color: var(--BACKGROUND_COLOR);
  white-space: nowrap;
  color: var(--TEXT_SECONDARY);
  font-size: 14px;
  cursor: not-allowed;
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
  const username = useSelector(state => state.auth.nickname);
  // axios
  const { sendRequest: getPost } = useAxios();
  const { sendRequest: postPost } = useFormDataAxios();
  // router
  const navigate = useNavigate();
  const { postId } = useParams();
  const isedit = Boolean(postId);

  const handleCancel = () => {
    navigate(-1);
  };

  const [boardId, setBoardId] = useState(1);
  const [categoryId, setCategoryId] = useState(1);
  const [tags, setTags] = useState([]);
  const [tagId, setTagId] = useState(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleGetPost = async () => {
    const result = await getPost(`/posts/${postId}`, null, "get");

    setBoardId(result?.data?.boardId);
    setCategoryId(result?.data?.categoryId);
    setTagId(result?.data?.tagId);
    setTitle(result?.data?.title);
    setContent(result?.data?.content);

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
          const baseURL = import.meta.env.VITE_BASE_URL;
          const fileId = files[i]?.fileId;
          const response = await axios.get(`${baseURL}/files/download/${fileId}`, {
            responseType: 'blob'
          });
          const fileBlob = response.data;
          const base64 = await toBase64(fileBlob);
          images[i].src = base64;
        }
      }
  
      // 변경된 HTML 내용을 문자열로 변환
      const updatedContent = doc.body.innerHTML;

      setContent(updatedContent);
    };
  
    updateImageSrc();
  };  

  useEffect(() => {
    if (isedit) {
      handleGetPost();
    }
  }, [isedit, postId]);

  // form
  useEffect(() => {
    setTags(getTagsForCategory(categoryId));
    setTagId(getStartTagIdForCategory(categoryId));
    let ret = 1;
    switch (categoryId) {
      case 1:
        ret = 1;
        break;
      case 2:
        ret = 7;
        break;
      case 3:
        ret = 13;
        break;
      case 4:
        ret = 15;
        break;
    }
  }, [categoryId]);
  
  const handleBoardType = (value) => {
    setBoardId(value);
  };

  const handleCategory = (value) => {
    setCategoryId(value);
  };

  const handleTagId = (tagId) => {
    if(!isedit){
      setTagId(tagId);
    }
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleEditor = (content) => {
    setContent(content);
  };

  const handleSave = async () => {
    if (title === "" || content === "") {
      Swal.fire({
        title: "입력 오류",
        text: "게시글에 대한 모든 정보의 입력은 필수입니다.\n입력 내용을 확인해주세요.",
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: "#FF7F50",
      });
      return;
    }
    
    const postData = {
      userId: userId,
      username: username,
      boardId: boardId,
      categoryId: categoryId,
      tagId: tagId,
      title: title,
      content: content,
    };

    const url = isedit ? `/posts/${postId}` : "/posts";
    const method = isedit ? "patch" : "post";

    //1. HTML에서 img 태그의 src 값 추출
    const parser = new DOMParser();
    const doc = parser.parseFromString(postData?.content, 'text/html');
    const imgTags = doc.querySelectorAll('img');
    const srcArray = Array.from(imgTags).map(img => img.src);

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
    setContent(updatedContent);

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
      Swal.fire({
        title: isedit ? "수정 완료" : "등록 완료",
        text: isedit ? "게시글이 성공적으로 수정되었습니다." : "게시글이 성공적으로 등록되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
        confirmButtonColor: "#FF7F50",
      }).then(() => {
        handleCancel();
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "오류 발생",
        text: "게시글 저장 중 오류가 발생했습니다. 다시 시도해주세요.",
        icon: "error",
        confirmButtonText: "확인",
        confirmButtonColor: "#FF7F50",
      });
    }
  };

  return (
    <div>
      <TabBar />
      <Wrapper>
        <PageTitle>{isedit ? "게시글 수정" : "게시글 작성"}</PageTitle>
        <FilterWrapper>
          <Filter title="게시판">
            <SelectBox
              options={BOARD_TYPE_OPTIONS}
              onChange={handleBoardType}
              curOption={boardId}
              isedit={isedit.toString()}
            />
          </Filter>
          <Filter title="작성자">
            <NameInput>{username}</NameInput>
          </Filter>
        </FilterWrapper>
        <FilterWrapper>
          <Filter title="카테고리">
            <SelectBox
              options={CATEGORY_OPTIONS}
              onChange={handleCategory}
              curOption={categoryId}
              isedit={isedit.toString()}
            />
          </Filter>
          <Filter title="태그">
            <SelectTag
              tags={tags}
              curTag={tagId}
              handleTag={handleTagId}
              isedit={isedit.toString()}
            />
          </Filter>
        </FilterWrapper>
        <EditorWrapper>
          <BoardEditor
            title={title}
            content={content}
            onTitleChange={handleTitle}
            onEditorChange={handleEditor}
          />
        </EditorWrapper>
        <Buttons>
          <OutlineButton onClick={handleCancel} label="취소" color="default" />
          <RoundButton onClick={handleSave} label={isedit ? "수정" : "등록"} />
        </Buttons>
      </Wrapper>
    </div>
  );
}

export default BoardAddPage;
