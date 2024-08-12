import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ClassListItem from "../Class/ClassList/ClassListItem";
import LeftIcon from "../../assets/icon/common/left.png";
import RightIcon from "../../assets/icon/common/right.png";

const ClassListContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 100%;
  position: relative;
`;

const SlideContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ slideindex, itemwidth }) =>
    `translateX(-${slideindex * itemwidth}px)`};
`;

const Button = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 5px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--LIGHT);
  color: var(--SECONDARY);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  z-index: 10; /* z-index를 높여 다른 요소 위에 배치 */
  box-shadow: 2px 2px 8px 2px var(--TEXT_SECONDARY);
  ${({ left }) => (left ? "left: 10px;" : "right: 10px; padding-left: 8px;")}
  opacity: 0.8;
`;

const Img = styled.img`
  width: 18px;
  height: 18px;
`;

function ClassList({ classList }) {
  const [slideindex, setSlideIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const containerRef = useRef(null);
  const itemwidth = 300; // 각 아이템의 너비를 설정

  useEffect(() => {
    const updateItemsPerView = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setItemsPerView(Math.floor(containerWidth / itemwidth));
      }
    };

    updateItemsPerView(); // 초기 계산
    window.addEventListener("resize", updateItemsPerView);

    return () => {
      window.removeEventListener("resize", updateItemsPerView);
    };
  }, [itemwidth]);

  const handleNext = () => {
    if (slideindex < classList.length - itemsPerView) {
      setSlideIndex(slideindex + 1);
    }
  };

  const handlePrev = () => {
    if (slideindex > 0) {
      setSlideIndex(slideindex - 1);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%" }} ref={containerRef}>
      <ClassListContainer>
        <SlideContainer slideindex={slideindex} itemwidth={itemwidth}>
          {classList.map((classInfo, index) => (
            <div
              key={index}
              style={{ flex: "0 0 auto", width: `${itemwidth}px` }}
            >
              <ClassListItem
                classInfo={classInfo}
                fileId={classInfo.file?.fileId}
                instructor={classInfo.user?.nickname}
                tag={classInfo.tag?.tagName}
              />
            </div>
          ))}
        </SlideContainer>
      </ClassListContainer>
      {slideindex > 0 && (
        <Button left onClick={handlePrev}>
          <Img src={LeftIcon} alt="left-icon" />
        </Button>
      )}
      {slideindex < classList.length - itemsPerView && (
        <Button onClick={handleNext}>
          <Img src={RightIcon} alt="right-icon" />
        </Button>
      )}
    </div>
  );
}

export default ClassList;
