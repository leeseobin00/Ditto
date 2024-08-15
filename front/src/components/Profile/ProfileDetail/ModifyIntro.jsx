import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { ProfileContext } from "../../../pages/Profile/ProfileDetailPage";

import useAxios from "../../../hooks/useAxios";
import RoundButton from "../../common/RoundButton";
import Swal from "sweetalert2";

const ModalTitle = styled.p`
  color: var(--PRIMARY);
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 32px;
`;

const Textarea = styled.textarea`
  font-family: inherit;
  width: 100%;
  min-height: 120px;
  padding: 16px;
  font-size: 16px;
  border: 1px solid lightgray;
  border-radius: 8px;
  margin-bottom: 48px;
  resize: none;

  &:hover {
    outline: none;
  }

  &:focus {
    border-width: 2px;
    border-color: var(--SECONDARY);
    outline: none;
  }
`;

function ModifyIntro({ onClose }) {
  const { intro: curIntro, setIntro: updateIntro } = useContext(ProfileContext);

  // redux
  const userId = useSelector((state) => state.auth.userId);
  // axios
  const { sendRequest: patchIntro } = useAxios();

  const [intro, setIntro] = useState("");

  const handleTextAreaChange = (event) => {
    setIntro(event.target.value);
  };

  const handleSubmit = async () => {
    if (userId) {
      try {
        const patchData = { intro: intro.replace(/<br\s*\/?>/gi, "\n") };
        await patchIntro(
          `/profiles/intro?userId=${userId}`,
          patchData,
          "patch"
        );

        Swal.fire({
          title: "수정 완료",
          text: "소개글이 성공적으로 수정되었습니다.",
          icon: "success",
          confirmButtonColor: "#FF7F50",
          confirmButtonText: "확인",
        });

        // Update context and close modal
        updateIntro(intro);
        onClose();
      } catch (error) {
        console.error("Failed to update intro:", error);
        Swal.fire({
          title: "수정 실패",
          text: "소개글 수정 중 오류가 발생했습니다.",
          icon: "error",
          confirmButtonColor: "#FF7F50",
          confirmButtonText: "확인",
        });
      }
    } else {
      Swal.fire({
        title: "오류",
        text: "사용자 ID가 없습니다.",
        icon: "error",
        confirmButtonColor: "#FF7F50",
        confirmButtonText: "확인",
      });
    }
  };

  useEffect(() => {
    if (curIntro) {
      setIntro(curIntro);
    }
  }, [curIntro]);

  return (
    <>
      <ModalTitle>소개글</ModalTitle>
      <Textarea value={intro} onChange={handleTextAreaChange} />
      <RoundButton label="수정" onClick={handleSubmit} />
    </>
  );
}

export default ModifyIntro;
