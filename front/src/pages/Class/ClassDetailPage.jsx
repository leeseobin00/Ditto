import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import useAxios from "../../hooks/useAxios";
import ClassThumbnail from "../../components/Class/ClasDetail/ClassThumbnail";
import ClassInfo from "../../components/Class/ClasDetail/ClassInfo";
import ClassSideBar from "../../components/Class/ClasDetail/ClassSideBar";
import TabBar from "../../components/Class/ClasDetail/TabBar";

const ClassDetailPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ClassBody = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 1% 5%;
`;

// const StickyContainer = styled.div`
//   position: sticky;
//   top: -1px;
//   z-index: 500;
//   background-color: white;
// `;

function ClassDetailPage() {
  const titleIds = ["1", "2", "3"];

  // redux
  const userId = useSelector((state) => state.auth.userId);
  const userName = useSelector((state) => state.auth.nickname);
  // axios
  const { sendRequest: getClassInfo } = useAxios();

  // router
  const { classId } = useParams();
  // state: post, comments
  const [classInfo, setClassInfo] = useState({});
  // const [comments, setComments] = useState([]);
  // date
  const date = new Date();
  const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;

  const handleGetClass = async () => {
    const result = await getClassInfo(`/classes/${classId}`, null, "get");
    setClassInfo(result?.data);
  };

  useEffect(() => {
    handleGetClass();
  }, []);

  // const handlePostComment = async (content, parentId) => {
  //   const postData = {
  //     userId: userId,
  //     content: content,
  //     parentId: parentId,
  //   };
  //   await postComment(`/comments/${postId}`, postData, "post");
  //   handleGetComment();
  // };

  const handleReplyFormOpen = (index) => {
    setShowReplyForms((prev) => {
      const newShowReplyForms = [...prev];
      newShowReplyForms[index] = true;
      return newShowReplyForms;
    });
  };

  // 나중에 props 전달 방법 바꾸기 {...classInfo} -> ({classInfo, steps, 등})
  return (
    <ClassDetailPageContainer>
      <ClassThumbnail classInfo={classInfo} />
      <TabBar titleIds={titleIds} />
      <ClassBody>
        <ClassInfo classInfo={classInfo} titleIds={titleIds} />
        <ClassSideBar classInfo={classInfo} />
      </ClassBody>
    </ClassDetailPageContainer>
  );
}

export default ClassDetailPage;
