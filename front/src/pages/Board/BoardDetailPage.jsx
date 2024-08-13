import { useState, useEffect } from "react";
import { styled, css } from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdMenu } from "react-icons/md";
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

const CommentCount = styled.p`
  color: var(--TEXT_SECONDARY);
  font-size: 16px;
  font-weight: 600;
  margin-top: 48px;
`;

const MyComment = styled.div`
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 10px;
  padding: 16px;
  margin-top: 16px;
`;

const Comments = styled.div`
  background-color: var(--BACKGROUND_COLOR);
  padding: 10px 30px 10px 16px;
  margin-top: 32px;
  border-radius: 10px;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  position: relative;
  padding: 15px 0px;
  padding-left: 8px;
  border-bottom: 1px solid var(--BORDER_COLOR);

  ${(props) =>
    props.isLast &&
    css`
      border-bottom: none;
    `}
`;

const ParentCommentWrapper = styled.div`
  width: 100%;
`;

const ChildCommentWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const CommentTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 8px;
  padding-left: 56px;
`;

const CommentText = styled.span`
  color: var(--TEXT_PRIMARY);
`;

const AddComment = styled.span`
  color: var(--SECONDARY);
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
`;

const CommentReplyWrapper = styled.div`
  position: relative;
  margin-top: 0px;
  margin-bottom: 15px;
  margin-left: 52px;
`;

const MenuIconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MenuIcon = styled.div`
  position: relative;

  &:hover .dropdown-menu {
    display: block;
  }
`;

const CustomMenuIcon = styled(MdMenu)`
  color: var(--TEXT_SECONDARY);
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: var(--SECONDARY);
  }
`;

const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--LIGHT);
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
  overflow: hidden;
`;

const DropdownItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background-color: var(--BACKGROUND_COLOR);
    color: var(--SECONDARY);
  }
`;

function BoardDetailPage() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  // redux
  const userId = useSelector((state) => state.auth.userId);
  const userName = useSelector((state) => state.auth.nickname);
  // axios
  const { sendRequest: getPost } = useAxios();
  const { sendRequest: getComment } = useAxios();
  const { sendRequest: postComment } = useAxios();
  const { sendRequest: deleteComment } = useAxios();
  const { sendRequest: updateComment } = useAxios();
  const { sendRequest: getUserInfo } = useAxios();
  // router
  const { postId } = useParams();
  // state: post, comments
  const [post, setPost] = useState({});
  const [userFileId, setUserFileId] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [comments, setComments] = useState([]);
  const [showReplyForms, setShowReplyForms] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);

  const date = new Date();
  const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleGetPost = async () => {
    const result = await getPost(`/posts/${postId}`, null, "get");
    const postData = result?.data;
    setPost(postData);

    const parser = new DOMParser();
    const doc = parser.parseFromString(postData?.content, "text/html");
    const images = Array.from(doc.querySelectorAll("img"));
    const files = postData?.files;

    // 이미지 로딩 중 표시할 텍스트로 교체
    const spinners = images.map((img) => {
      const spinner = document.createElement("div");
      spinner.className = "spinner";
      img.parentNode.replaceChild(spinner, img);
      return { img, spinner }; // 매핑하여 이미지와 스피너 쌍을 저장
    });

    // 콘텐츠 업데이트
    setPost((prev) => ({
      ...prev,
      content: doc.body.innerHTML,
    }));

    // 이미지 src 업데이트 함수
    const updateImageSrc = async () => {
      for (let i = 0; i < images.length; i++) {
        if (i < files.length) {
          const fileId = files[i]?.fileId;
          const response = await axios.get(
            `${baseURL}/files/download/${fileId}`,
            {
              responseType: "blob",
            }
          );
          const fileBlob = response.data;
          const base64 = await toBase64(fileBlob);

          // 로딩 스피너를 이미지로 교체
          const { spinner } = spinners[i];
          if (spinner) {
            const img = document.createElement("img");
            img.src = base64;
            img.style.maxWidth = "600px"; // 원하는 최대 너비 설정
            img.style.maxHeight = "600px"; // 원하는 최대 높이 설정

            spinner.parentNode.replaceChild(img, spinner);
          }

          // 콘텐츠 업데이트
          setPost((prev) => ({
            ...prev,
            content: doc.body.innerHTML,
          }));
        }
      }
    };

    updateImageSrc();
  };

  const getImage = async () => {
    const result = await getUserInfo(`/mypage/${userId}/normal`, null, "get");
    const fileId = result?.data?.fileId;
    setUserFileId(fileId);
  };

  useEffect(() => {
    if (userId) {
      getImage();
    }
  }, [userId]);

  const handleGetComment = async () => {
    const result = await getComment(`/comments/${postId}`, null, "get");
    setComments(result?.data);
  };

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

  const handleUpdateComment = async (content, commentId, parentId) => {
    const updateData = {
      userId: userId,
      content: content,
      parentId: parentId,
    };
    await updateComment(`/comments/${commentId}`, updateData, "patch");
    setEditCommentId(null);
    handleGetComment();
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(`/comments/${commentId}`, null, "delete");
    handleGetComment();
  };

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

  const handleEditClick = (commentId) => {
    setEditCommentId(commentId);
  };

  return (
    <div>
      <TabBar />
      <Wrapper>
        <Post
          postUserId={post?.userId}
          title={post?.title}
          username={post?.nickname}
          createdDate={post?.createdDate?.split("T")[0]}
          viewCount={post?.viewCount}
          content={post?.content}
          likeCount={post?.likeCount}
          tagName={post?.tagName}
        />

        <CommentTitle>댓글</CommentTitle>

        <MyComment>
          <Profile
            fileId={userFileId}
            name={userName}
            date={formattedDate}
            userId={userId}
          />
          <CommentReplyWrapper>
            <ReplyForm
              parentId={-1}
              isCancel={false}
              onAddComment={handlePostComment}
            />
          </CommentReplyWrapper>
        </MyComment>
        {comments?.length > 0 && (
          <Comments>
            {comments?.map((comment, index) => (
              <Comment key={index} isLast={index === comments.length - 1}>
                <ParentCommentWrapper>
                  {comment?.isDeleted == false && comment?.userId == userId && (
                    <MenuIconWrapper>
                      <MenuIcon>
                        <CustomMenuIcon />
                        <DropdownMenu className="dropdown-menu">
                          <DropdownItem
                            onClick={() => handleEditClick(comment.commentId)}
                          >
                            수정
                          </DropdownItem>
                          <DropdownItem
                            onClick={() =>
                              handleDeleteComment(comment.commentId)
                            }
                          >
                            삭제
                          </DropdownItem>
                        </DropdownMenu>
                      </MenuIcon>
                    </MenuIconWrapper>
                  )}
                  <Profile
                    fileId={comment.fileId}
                    name={comment.nickname}
                    date={new Date(comment.createdDate)
                      .toISOString()
                      .split("T")[0]
                      .replace(/-/g, ".")}
                    userId={comment.userId}
                  />
                  <CommentTextWrapper>
                    {editCommentId === comment.commentId ? (
                      <ReplyForm
                        commentId={comment.commentId}
                        parentId={comment.parentId}
                        isCancel
                        onCancel={() => setEditCommentId(null)}
                        initialContent={comment.content}
                        onUpdateComment={handleUpdateComment}
                      />
                    ) : (
                      <>
                        <CommentText>{comment.content}</CommentText>
                        {comment?.isDeleted === false && (
                          <AddComment
                            onClick={() => handleReplyFormOpen(index)}
                          >
                            답글달기
                          </AddComment>
                        )}
                      </>
                    )}
                  </CommentTextWrapper>
                </ParentCommentWrapper>
                {(comment?.children.length > 0 || showReplyForms[index]) && (
                  <ChildCommentWrapper>
                    {comment?.children?.map((c, childIndex) => (
                      <CommentReplyWrapper key={childIndex}>
                        {userId == c?.userId && (
                          <MenuIconWrapper>
                            <MenuIcon>
                              <CustomMenuIcon />
                              <DropdownMenu className="dropdown-menu">
                                <DropdownItem
                                  onClick={() => handleEditClick(c.commentId)}
                                >
                                  수정
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    handleDeleteComment(c.commentId)
                                  }
                                >
                                  삭제
                                </DropdownItem>
                              </DropdownMenu>
                            </MenuIcon>
                          </MenuIconWrapper>
                        )}
                        <Profile
                          fileId={c.fileId}
                          name={c.nickname}
                          date={new Date(c.createdDate)
                            .toISOString()
                            .split("T")[0]
                            .replace(/-/g, ".")}
                          userId={c.userId}
                        />
                        <CommentTextWrapper>
                          {editCommentId === c.commentId ? (
                            <ReplyForm
                              commentId={c.commentId}
                              parentId={c.parentId}
                              isCancel
                              onCancel={() => setEditCommentId(null)}
                              initialContent={c.content}
                              onUpdateComment={handleUpdateComment}
                            />
                          ) : (
                            <>
                              <CommentText>{c.content}</CommentText>
                              {/* <AddComment onClick={() => handleReplyFormOpen(index)}>답글달기</AddComment> */}
                            </>
                          )}
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
                  </ChildCommentWrapper>
                )}
              </Comment>
            ))}
          </Comments>
        )}
      </Wrapper>
    </div>
  );
}

export default BoardDetailPage;
