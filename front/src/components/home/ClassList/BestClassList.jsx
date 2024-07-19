import { styled } from "styled-components";

import ClassListItem from "../../class/ClassListItem";

const BestClassListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function BestClassList() {
  const classes = [
    {
      className: "입문자도 바로 할 수 있는 2주 완성 그림의 기본기 클래스",
      classHour: 2,
      classMinute: 0,
      classPrice: 42000,
      nickname: "이강사",
      likeCount: 1234,
      reviewCount: 130,
      averageRating: 4.8,
      tagName: "향수",
      fileUrl:
        "https://ecimg.cafe24img.com/pg137b87168944095/monthlytoy/web/product/medium/20240112/7a16faa3c41fc704b3f0e1839ca72a8b.jpg",
    },
    {
      className: "누구나 손쉽게 따라하는 피아노 입문 클래스",
      classHour: 2,
      classMinute: 30,
      classPrice: 32000,
      nickname: "이강사",
      likeCount: 1234,
      reviewCount: 50,
      averageRating: 3.5,
      tagName: "향수",
      fileUrl:
        "https://ecimg.cafe24img.com/pg137b87168944095/monthlytoy/web/product/medium/20240624/257d062c92b95242e6acce4f724cdbdd.jpg",
    },
    {
      className: "입문자도 바로 할 수 있는 2주 완성 그림의 기본기 클래스",
      classHour: 2,
      classMinute: 0,
      classPrice: 60000,
      nickname: "이강사",
      likeCount: 1234,
      reviewCount: 100,
      averageRating: 2.0,
      tagName: "향수",
      fileUrl:
        "https://ecimg.cafe24img.com/pg137b87168944095/monthlytoy/web/product/medium/20231213/30f5cce8a9d7ccaed4cee46ff9c4c31d.jpg",
    },
    {
      className: "입문자도 바로 할 수 있는 2주 완성 그림의 기본기 클래스",
      classHour: 2,
      classMinute: 0,
      classPrice: 60000,
      nickname: "이강사",
      likeCount: 1234,
      reviewCount: 100,
      averageRating: 2.0,
      tagName: "향수",
      fileUrl:
        "https://ecimg.cafe24img.com/pg137b87168944095/monthlytoy/web/product/medium/20231213/30f5cce8a9d7ccaed4cee46ff9c4c31d.jpg",
    },
  ];

  return (
    <BestClassListContainer>
      {classes.map((classInfo, index) => (
        <ClassListItem key={index} classInfo={classInfo} />
      ))}
    </BestClassListContainer>
  );
}

export default BestClassList;
