import { useState, useEffect } from "react";
import { styled } from "styled-components";
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

const MyComment = styled.div`
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 10px;
  padding: 8px 16px;
  margin-top: 16px;
`;

const Comments = styled.div`
  background-color: var(--BACKGROUND_COLOR);
  padding: 0px 16px;
  margin-top: 32px;
`;

const Comment = styled.div`
  position: relative;
  padding: 8px 0px;
  padding-left: 8px;
  border-bottom: 1px solid var(--BORDER_COLOR);
`;

const ChildCommentWrapper = styled.div`
  margin-top: 32px;
`;

const CommentTextWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 8px;
`;

const CommentText = styled.span`
  color: var(--TEXT_PRIMARY);
`;

const AddComment = styled.span`
  color: var(--SECONDARY);
  font-weight: 600;
  cursor: pointer;
`;

const CommentReplyWrapper = styled.div`
  position: relative;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 16px;
`;

const MenuIconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
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

  &:hover {
    background-color: var(--BACKGROUND_COLOR);
    color: var(--SECONDARY);
  }
`;

function BoardDetailPage() {
  // redux
  const userId = useSelector((state) => state.auth.userId);
  const userName = useSelector((state) => state.auth.nickname);
  // axios
  const { sendRequest: getPost } = useAxios();
  const { sendRequest: getComment } = useAxios();
  const { sendRequest: postComment } = useAxios();
  const { sendRequest: deleteComment } = useAxios();
  const { sendRequest: updateComment } = useAxios();
  // router
  const { postId } = useParams();
  // state: post, comments
  const [post, setPost] = useState({});
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

    const parser = new DOMParser();
    const doc = parser.parseFromString(postData?.content, "text/html");
    const images = doc.querySelectorAll("img");
    const files = postData?.files;

    const updateImageSrc = async () => {
      for (let i = 0; i < images.length; i++) {
        if (i < files.length) {
          const baseUrl = import.meta.env.VITE_BASE_URL;
          const fileId = files[i]?.fileId;
          const response = await axios.get(`${baseUrl}/files/download/${fileId}`, {
            responseType: "blob",
          });
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
      "userId": userId,
      "content": content,
      "parentId": parentId,
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

  const toggleDropdown = (index) => {
    setShowDropdown((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleEditClick = (commentId) => {
    setEditCommentId(commentId);
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
          content={post?.content}
          likeCount={post?.likeCount}
          tagName={post?.tagName}
        />

        <CommentTitle>댓글</CommentTitle>

        <MyComment>
          <Profile fileUrl="이미지기능삭제" name={userName} date={formattedDate} />
          <CommentReplyWrapper>
            <ReplyForm parentId={-1} isCancel={false} onAddComment={handlePostComment} />
          </CommentReplyWrapper>
        </MyComment>

        <Comments>
          {comments?.map((comment, index) => (
            <Comment key={index}>
              {comment?.userId == userId && (
                <MenuIconWrapper>
                <CustomMenuIcon onClick={() => toggleDropdown(index)} />
                <DropdownMenu className="dropdown-menu">
                  <DropdownItem onClick={() => handleEditClick(comment.commentId)}>
                    수정
                  </DropdownItem>
                  <DropdownItem onClick={() => handleDeleteComment(comment.commentId)}>
                    삭제
                  </DropdownItem>
                </DropdownMenu>
              </MenuIconWrapper>
              )}
              <Profile
                fileUrl="이미지기능삭제"
                name={comment.nickname}
                date={(new Date(comment.createdDate)).toISOString().split("T")[0].replace(/-/g, ".")}
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
                    <AddComment onClick={() => handleReplyFormOpen(index)}>답글달기</AddComment>
                  </>
                )}
              </CommentTextWrapper>

              <ChildCommentWrapper>
              {comment?.children?.map((c, childIndex) => (
                <CommentReplyWrapper key={childIndex}>
                  {userId == c?.userId && (
                    <MenuIconWrapper>
                      <CustomMenuIcon onClick={() => toggleDropdown(`${index}-${childIndex}`)} />
                      <DropdownMenu className="dropdown-menu">
                        <DropdownItem onClick={() => handleEditClick(c.commentId)}>수정</DropdownItem>
                        <DropdownItem onClick={() => handleDeleteComment(c.commentId)}>삭제</DropdownItem>
                      </DropdownMenu>
                    </MenuIconWrapper>
                  )}
                  <Profile
                    fileUrl="dd"
                    name={c.nickname}
                    date={(new Date(c.createdDate)).toISOString().split("T")[0].replace(/-/g, ".")}
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

              </ChildCommentWrapper>
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
