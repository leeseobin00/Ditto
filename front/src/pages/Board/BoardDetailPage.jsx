import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import useAxios from "../../hooks/useAxios";
import TabBar from "../../components/Board/TabBar";
import Post from "../../components/Board/BoardDetail/Post";
import Profile from "../../components/Board/BoardDetail/Profile";
import ReplyForm from "../../components/Board/BoardDetail/ReplyForm";

const Wrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 32px;
`;

const CommentTitle = styled.p`
  color: var(--PRIMARY);
  font-size: 18px;
  font-weight: 600;
  margin-top: 48px;
`;

const MyComment = styled.div`
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 10px;
  padding: 8px 16px;
  margin-top: 16px;
`;

const Comments = styled.div`
  background-color: var(--BACKGROUND_COLOR);
  padding: 8px 16px;
  margin-top: 32px;
`;

const Comment = styled.div`
  padding: 8px 16px;
  margin-top: 16px;
  border-bottom: 1px solid var(--BORDER_COLOR);
`;

const CommentTextWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
`;

const CommentText = styled.span`
  color: var(--TEXT_PRIMARY);
  margin-left: 52px;
`;

const AddComment = styled.span`
  color: var(--SECONDARY);
  font-weight: 600;
  cursor: pointer;
`;

const CommentReplyWrapper = styled.div`
  width: calc(100% - 52px);
  margin-left: 52px;
  margin-top: 16px;
`;

function BoardDetailPage() {
  // redux
  const userId = useSelector(state => state.auth.userId);  
  const userName = useSelector(state => state.auth.nickname);
  // axios
  const { sendRequest: getPost } = useAxios();
  const { sendRequest: getComment } = useAxios();
  const { sendRequest: postComment } = useAxios();
  const { sendRequest: getFile } = useAxios();
  // router
  const { postId } = useParams();
  // state: post, comments
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  // date
  const date = new Date();
  const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleGetPost = async() => {
    const result = await getPost(`/posts/${postId}`, null, "get");
    const postData = result?.data;

    const parser = new DOMParser();
    const doc = parser.parseFromString(postData?.content, 'text/html');
    const images = doc.querySelectorAll('img');
    const files = postData?.files;

    const updateImageSrc = async () => {
      for (let i = 0; i < images.length; i++) {
        if (i < files.length) {
          const baseUrl = import.meta.env.VITE_BASE_URL;
          const fileId = files[i]?.fileId;
          const response = await axios.get(`${baseUrl}/files/download/${fileId}`, {
            responseType: 'blob'
          });
          // axios에서는 response.data가 Blob 객체입니다.
          const fileBlob = response.data;
          const base64 = await toBase64(fileBlob);
          images[i].src = base64;
        }
      }

      const updatedContent = doc.body.innerHTML;
      setPost((prev) => ({
        ...prev,
        ...postData,
        content: updatedContent,
      }));
    };

    updateImageSrc();
  };


  const handleGetComment = async() => {
    const result = await getComment(`/comments/${postId}`, null, "get");
    setComments(result?.data);
  }

  useEffect(() => {
    handleGetPost();
    handleGetComment();
  }, []);

  const handlePostComment = async (content, parentId) => {
    const postData = {
      userId: userId,
      content: content,
      parentId: parentId,
    };
    await postComment(`/comments/${postId}`, postData, "post");
    handleGetComment();
  };

  const [showReplyForms, setShowReplyForms] = useState([]);

  const handleReplyFormOpen = (index) => {
    setShowReplyForms((prev) => {
      const newShowReplyForms = [...prev];
      newShowReplyForms[index] = true;
      return newShowReplyForms;
    });
  };

  const handleReplyFormClose = (index) => {
    setShowReplyForms((prev) => {
      const newShowReplyForms = [...prev];
      newShowReplyForms[index] = false;
      return newShowReplyForms;
    });
  };

  return (
    <div>
      <TabBar />
      <Wrapper>
        <Post
          title={post?.title}
          username={post?.nickname}
          createdDate="2024.07.11"
          viewCount={post?.viewCount}
          // fileName="img.png"
          // fileUrl="ddd"
          content={post?.content}
          likeCount={post?.likeCount}
          tagName={post?.tagName}
        />

        <CommentTitle>댓글</CommentTitle>

        <MyComment>
          <Profile fileUrl="dd" name={userName} date={formattedDate} />
          <CommentReplyWrapper>
            <ReplyForm parentId={-1} isCancel={false} onAddComment={handlePostComment} />
          </CommentReplyWrapper>
        </MyComment>

        <Comments>
          {comments?.map((comment, index) => (
            <Comment key={index}>
              <Profile fileUrl="dd" name={comment.nickname} date={(new Date(comment.createdDate)).toISOString().split('T')[0].replace(/-/g, '.')} />
              <CommentTextWrapper>
                <CommentText>{comment.content}</CommentText>
                <AddComment onClick={() => handleReplyFormOpen(index)}>
                  답글달기
                </AddComment>
              </CommentTextWrapper>
              
              {comment?.children?.map((c, childIndex) => (
                <CommentReplyWrapper key={childIndex}>
                  <Profile fileUrl="dd" name={c.nickname} date={(new Date(c.createdDate)).toISOString().split('T')[0].replace(/-/g, '.')} />
                  <CommentTextWrapper>
                    <CommentText>{c.content}</CommentText>
                    <AddComment onClick={() => handleReplyFormOpen(index)}>
                      답글달기
                    </AddComment>
                  </CommentTextWrapper>
                </CommentReplyWrapper>
              ))}

              {showReplyForms[index] && (
                <CommentReplyWrapper>
                  <ReplyForm
                    parentId={comment.commentId}
                    isCancel
                    onCancel={() => handleReplyFormClose(index)}
                    onAddComment={handlePostComment}
                  />
                </CommentReplyWrapper>
              )}
            </Comment>
          ))}
        </Comments>
      </Wrapper>
    </div>
  );
}

export default BoardDetailPage;
