import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "styled-components";

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
`;

function ClassAdePage() {
  // redux
  const userId = useSelector((state) => state.auth.userId);
  const userNickname = useSelector((state) => state.auth.nickname);
  // axios
  const { sendRequest, error, loading } = useAxios();

  const [thumbnailData, setThumbnailData] = useState({});
  const [infoData, setInfoData] = useState({});
  const [priceData, setPriceData] = useState("");

  const { classId } = useParams();

  const handleThumbnailChange = useCallback((data) => {
    setThumbnailData((prev) => ({ ...prev, ...data }));
  }, []);

  const handleInfoChange = useCallback((data) => {
    setInfoData(data);
  }, []);

  const handlePriceChange = useCallback((price) => {
    setPriceData(price);
  }, []);

  const handlePostClass = async () => {
    const classData = new FormData();

    // 파일과 데이터를 FormData에 추가
    if (thumbnailData?.classFile) {
      classData.append("classFile", thumbnailData?.classFile);
    }

    const kitFile = infoData.kit?.kitFile;
    if (kitFile) {
      classData.append("kitFile", kitFile);
    }

    // JSON 데이터를 FormData에 추가
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
      classExplanation: infoData.classExplanation,
      kit: {
        kitName: infoData.kit?.kitName,
        kitExplanation: infoData.kit?.kitExplanation,
      },
    };

    classData.append(
      "classRequest",
      new Blob([JSON.stringify(classRequest)], {
        type: "application/json",
      })
    );

    try {
      const response = await sendRequest("/classes", classData, "post");
      const createdClassId = response.data;

      const stepRequests = infoData.steps.map((step, index) => ({
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

      infoData.steps.forEach((step, index) => {
        if (step.file) {
          stepsData.append("stepFiles", step.file);
        }
      });

      await sendRequest(`/classes/${createdClassId}/steps`, stepsData, "post");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ClassAddPageContainer>
      <ClassThumbnailAdd
        onChange={handleThumbnailChange}
        userNickname={userNickname}
      />
      <ClassAddBody>
        <ClassInfoAdd onChange={handleInfoChange} />
        <ClassPriceAdd onChange={handlePriceChange} />
      </ClassAddBody>
      <ButtonContainer>
        <RoundButton
          label={"등록"}
          size={"md"}
          onClick={handlePostClass}
          disabled={loading}
        />
      </ButtonContainer>
    </ClassAddPageContainer>
  );
}

export default ClassAdePage;
