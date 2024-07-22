import { useState } from "react";
import { styled } from "styled-components";

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
  // eslint-disable-next-line no-unused-vars
  const contentHTML = `
  <h3>제 귀여운 고양이 몽이를 소개합니다! 🐱🖤</h3>
  <p>우리 몽이는 정말 사랑스러워요.</p>
  <p>항상 장난감과 놀면서 즐거운 시간을 보내고, 햇볕 아래서 낮잠 자는 걸 좋아해요.</p>
  <p>특히 몽이의 귀여운 모습은 정말 사랑스러워서 볼 때마다 웃음이 절로 나와요.</p>
  <p>사진을 보면 알겠지만, 몽이의 작은 얼굴과 반짝이는 눈망울은 정말 예쁩니다.</p>
  <p>몽이는 저와 함께 있는 시간이 많아서 저를 항상 행복하게 만들어줘요.</p>
  <p>몽이를 키우는 건 정말 큰 행복이자 사랑스러운 친구가 옆에 있다는 건 정말 큰 축복인 것 같아요.</p>
  <p>여러분의 반려동물 이야기도 궁금해요! 함께 공유해요!✨</p>
`;

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
          title="제가 만든 고양이 인형을 다들 주목해주세요."
          username="김묘묘"
          createdDate="2024.07.11"
          viewCount="3"
          fileName="img.png"
          fileUrl="ddd"
          content={contentHTML}
        />

        <CommentTitle>댓글</CommentTitle>

        <MyComment>
          <Profile fileUrl="dd" name="김묘묘" date="2024.07.17" />
          <CommentReplyWrapper>
            <ReplyForm isCancel={false} />
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
