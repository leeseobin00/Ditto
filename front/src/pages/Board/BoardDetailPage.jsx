import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";

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
  const { response: getResponse, sendRequest: getPost } = useAxios();
  const { response: getCommentResponse, sendRequest: getComment } = useAxios();
  const { sendRequest: postComment } = useAxios();

  // router
  const { postId } = useParams();

  const [post, setPost] = useState({});
  const [comment, setComment] = useState([]);

  useEffect(() => {
    getPost(`/posts/${postId}`, null, "get");
    getComment(`/comments/${postId}`, null, "get");
  }, []);

  useEffect(() => {
    setPost(getResponse?.data);
    console.log(getResponse);
  }, [getResponse]);

  useEffect(() => {
    setComment(getCommentResponse?.data);
    console.log(getCommentResponse);
  }, [getCommentResponse]);

  const comments = [
    { user: "사용자1", text: "이 이미지는 정말 멋지네요!" },
    { user: "사용자2", text: "어디서 찍으셨나요?" },
    { user: "사용자3", text: "색감이 아주 좋아요." },
  ];

  const [showReplyForms, setShowReplyForms] = useState(
    comments.map(() => false),
  );

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
          username={post?.username}
          createdDate="2024.07.11"
          viewCount={post?.viewCount}
          fileName="img.png"
          fileUrl="ddd"
          content={post?.content}
          likeCount={post?.likeCount}
          tagName={post?.tagName}
        />

        <CommentTitle>댓글</CommentTitle>

        <MyComment>
          <Profile fileUrl="dd" name="김묘묘" date="2024.07.17" />
          <CommentReplyWrapper>
            <ReplyForm parentId={-1} isCancel={false} />
          </CommentReplyWrapper>
        </MyComment>

        <Comments>
          {comments.map((comment, index) => (
            <Comment key={index}>
              <Profile fileUrl="dd" name={comment.user} date="2024.07.17" />
              <CommentTextWrapper>
                <CommentText>{comment.text}</CommentText>
                <AddComment onClick={() => handleReplyFormOpen(index)}>
                  답글달기
                </AddComment>
              </CommentTextWrapper>

              <CommentReplyWrapper>
                <Profile fileUrl="dd" name={comment.user} date="2024.07.17" />
                <CommentTextWrapper>
                  <CommentText>{comment.text}</CommentText>
                  <AddComment onClick={() => handleReplyFormOpen(index)}>
                    답글달기
                  </AddComment>
                </CommentTextWrapper>
              </CommentReplyWrapper>

              {showReplyForms[index] && (
                <CommentReplyWrapper>
                  <ReplyForm
                    isCancel
                    onCancel={() => handleReplyFormClose(index)}
                    onAdd={() => handleReplyFormOpen(index)}
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
