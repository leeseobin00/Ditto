import { styled } from "styled-components";
import { useState, useCallback } from "react";
import { useSelector } from "react-redux";

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
  const { sendRequest, response, error, loading } = useAxios();

  const [thumbnailData, setThumbnailData] = useState({
    className: "",
    categoryId: 0,
    tagId: 0,
    classHour: 0,
    classMinute: 0,
    classMax: 0,
    classFile: null,
  });
  const [infoData, setInfoData] = useState({});
  const [priceData, setPriceData] = useState("");

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
    const formData = new FormData();

    // 파일과 데이터를 FormData에 추가
    if (thumbnailData.classFile) {
      formData.append("classFile", thumbnailData.classFile);
    }

    const kitFile = infoData.kit?.kitFile;
    if (kitFile) {
      formData.append("kitFile", kitFile);
    }

    // JSON 데이터를 FormData에 추가
    const classRequest = {
      className: thumbnailData.className,
      userId: userId,
      categoryId: thumbnailData.categoryId,
      tagId: thumbnailData.tagId,
      classPrice: priceData,
      classHour: thumbnailData.classHour,
      classMinute: thumbnailData.classMinute,
      classMin: 0,
      classMax: thumbnailData.classMax,
      classExplanation: infoData.classExplanation,
      kit: {
        kitName: infoData.kit?.kitName,
        kitExplanation: infoData.kit?.kitExplanation,
      },
    };

    formData.append(
      "classRequest",
      new Blob([JSON.stringify(classRequest)], {
        type: "application/json",
      })
    );

    try {
      const result = await sendRequest("/classes", formData, "post");

      console.log("Success:", result);
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
      {error && <p>Error: {error.message}</p>}
    </ClassAddPageContainer>
  );
}

export default ClassAdePage;
