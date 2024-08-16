import { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";

import useAxios from "../../hooks/useAxios";
import ClassThumbnailAdd from "../../components/Class/ClassAdd/ClassThumbnailAdd";
import ClassInfoAdd from "../../components/Class/ClassAdd/ClassInfoAdd";
import ClassPriceAdd from "../../components/Class/ClassAdd/ClassPriceAdd";
import RoundButton from "../../components/common/RoundButton";

const ClassAddPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ClassAddBody = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 5%;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  width: 100px;
  margin-bottom: 20px;
`;

function ClassAddPage() {
  // redux
  const userId = useSelector((state) => state.auth.userId);
  const userNickname = useSelector((state) => state.auth.nickname);
  const roleId = useSelector((state) => state.auth.roleId);
  // axios
  const { sendRequest, loading } = useAxios();

  const navigate = useNavigate();
  const { classId } = useParams();
  const isEdit = Boolean(classId);

  const [thumbnailData, setThumbnailData] = useState(null);
  const [infoData, setInfoData] = useState(null);
  const [priceData, setPriceData] = useState(null);

  useEffect(() => {
    if (roleId == 1 || roleId == null || roleId == undefined) {
      navigate("/");
    }
  }, [roleId, navigate]);

  const handleGetClass = async () => {
    const response = await sendRequest(`/classes/${classId}`, null, "get");
    const classData = response?.data;

    setThumbnailData({
      className: classData.className,
      categoryId: classData.tag.categoryId,
      tagId: classData.tag.tagId,
      classHour: classData.classHour,
      classMinute: classData.classMinute,
      classMax: classData.classMax,
      file: classData.file,
    });

    setInfoData({
      classExplanation: classData.classExplanation.replace("<br />", "\n"),
      kit: {
        kitName: classData.kit.kitName,
        kitExplanation: classData.kit.kitExplanation,
      },
      steps: classData.steps.map((step, index) => ({
        stepNo: index + 1,
        stepName: step.stepName,
        stepDetail: step.stepDetail,
      })),
    });

    setPriceData(classData.classPrice);
  };

  useEffect(() => {
    if (isEdit) {
      handleGetClass();
    }
  }, [isEdit]);

  const handleThumbnailChange = useCallback((data) => {
    setThumbnailData((prev) => ({ ...prev, ...data }));
  }, []);

  const handleInfoChange = useCallback((data) => {
    setInfoData(data);
  }, []);

  const handlePriceChange = useCallback((price) => {
    setPriceData(price);
  }, []);

  const handleSubmitClass = async () => {
    const classData = new FormData();

    const classFile = thumbnailData?.classFile;
    if (classFile) {
      classData.append("classFile", classFile);
    }

    const kitFile = infoData?.kit?.kitFile;
    if (kitFile) {
      classData.append("kitFile", kitFile);
    }

    const classRequest = {
      className: thumbnailData?.className,
      userId: userId,
      categoryId: thumbnailData?.categoryId,
      tagId: thumbnailData?.tagId,
      classPrice: priceData,
      classHour: thumbnailData?.classHour,
      classMinute: thumbnailData?.classMinute,
      classMin: 0,
      classMax: thumbnailData?.classMax,
      classExplanation: infoData?.classExplanation.replaceAll("\n", "<br />"),
      kit: {
        kitName: infoData?.kit?.kitName,
        kitExplanation: infoData?.kit?.kitExplanation,
      },
    };

    if (
      !classRequest.className ||
      !classRequest.classPrice ||
      classRequest.classMax == 0 ||
      (classRequest.classHour == 0 && classRequest.classMinute == 0) ||
      !classRequest.classExplanation ||
      !classRequest.kit.kitName ||
      !classRequest.kit.kitExplanation ||
      classFile == null ||
      kitFile == null
    ) {
      Swal.fire({
        title: "입력 오류",
        text: "클래스에 대한 모든 정보의 입력은 필수입니다.\n입력 내용을 확인해주세요.",
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: "#FF7F50",
      });
      return;
    }

    classData.append(
      "classRequest",
      new Blob([JSON.stringify(classRequest)], {
        type: "application/json",
      })
    );

    try {
      if (isEdit) {
        await sendRequest(`/classes/${classId}`, classData, "patch");
        Swal.fire({
          title: "수정 완료",
          text: "클래스가 성공적으로 수정되었습니다.",
          icon: "success",
          confirmButtonText: "확인",
          confirmButtonColor: "#FF7F50",
        });
      } else {
        const response = await sendRequest("/classes", classData, "post");
        const newClassId = response?.data;

        if (infoData.steps && infoData.steps.length > 0) {
          const stepRequests = infoData.steps?.map((step, index) => ({
            stepNo: index + 1,
            stepName: step.stepName,
            stepDetail: step.stepDetail,
          }));

          const stepsData = new FormData();
          stepsData.append(
            "stepRequests",
            new Blob([JSON.stringify(stepRequests)], {
              type: "application/json",
            })
          );

          infoData.steps?.forEach((step, index) => {
            if (step.file) {
              stepsData.append("stepFiles", step.file);
            }
          });
          await sendRequest(`/classes/${newClassId}/steps`, stepsData, "post");
        }

        Swal.fire({
          title: "등록 완료",
          text: "클래스가 성공적으로 등록되었습니다.",
          icon: "success",
          confirmButtonText: "확인",
          confirmButtonColor: "#FF7F50",
        }).then(() => {
          navigate(`/classes/detail/${newClassId}`);
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "오류 발생",
        text: "클래스 등록/수정 중 오류가 발생했습니다. 다시 시도해주세요.",
        icon: "error",
        confirmButtonText: "확인",
        confirmButtonColor: "#FF7F50",
      });
    }
  };

  return (
    <ClassAddPageContainer>
      <ClassThumbnailAdd
        onChange={handleThumbnailChange}
        userNickname={userNickname}
        initialData={thumbnailData}
        isEdit={isEdit}
      />
      <ClassAddBody>
        <ClassInfoAdd onChange={handleInfoChange} initialData={infoData} />
        <ClassPriceAdd onChange={handlePriceChange} initialData={priceData} />
      </ClassAddBody>
      <ButtonContainer>
        <RoundButton
          label={isEdit ? "수정" : "등록"}
          size={"md"}
          onClick={handleSubmitClass}
          disabled={loading}
        />
      </ButtonContainer>
    </ClassAddPageContainer>
  );
}

export default ClassAddPage;
