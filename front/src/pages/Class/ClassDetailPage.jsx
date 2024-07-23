import { styled } from "styled-components";

import ClassThumbnail from "../../components/class/ClasDetail/ClassThumbnail";
import ClassContent from "../../components/class/ClasDetail/ClassContent";
import ClassSideBar from "../../components/class/ClasDetail/ClassSideBar";
import TabBar from "../../components/class/ClasDetail/TabBar";

const ClassDetailPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ClassBody = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 5%;
`;

function ClassDetailPage() {
  const classInfo = {
    classId: 1,
    className: "수제 비누 만들기 DIY 클래스",
    classPrice: 43000,
    classHour: 2,
    classMinute: 0,
    classExplanation: "초보자도 쉽게 할 수 있는 비누 만들기 입문 강의입니다.",
    likeCount: 5263,
    reviewCount: 100,
    averageRating: 4.2,
    tagName: "뜨개질",
    userNickname: "이강사",
    classMax: 12,
    file: {
      fileUrl:
        "https://ecimg.cafe24img.com/pg137b87168944095/monthlytoy/web/product/big/20240516/9ecbcd4d7452568bfb1878108bc58d01.jpg",
    },
    kit: {
      kitName: "수제 비누 만들기 DIY 키트",
      kitExplanation:
        "비누 베이스, 색소, 향료(라벤더, 레몬, 로즈마리 3종), 실리콘 몰드, 계량컵 등 포함",
      fileUrl:
        "https://ecimg.cafe24img.com/pg137b87168944095/monthlytoy/web/product/big/20240516/9ecbcd4d7452568bfb1878108bc58d01.jpg",
    },
    steps: [
      {
        stepNo: 1,
        stepName: "뜨개질의 기초 다지기",
        stepDetail:
          "뜨개질을 처음 시작하는 분들을 위한 단계입니다. 뜨개질에 필요한 기본 도구를 소개하고, 올바른 실 선택 방법과 뜨개질의 기본 기술(코잡기, 겉뜨기, 안뜨기)을 배웁니다. 이 단계를 통해 뜨개질의 기초를 다질 수 있습니다.",
        fileUrl:
          "https://ecimg.cafe24img.com/pg137b87168944095/monthlytoy/web/product/big/20240516/9ecbcd4d7452568bfb1878108bc58d01.jpg",
      },
      {
        stepNo: 2,
        stepName: "뜨개질의 기초 다지기",
        stepDetail:
          "뜨개질을 처음 시작하는 분들을 위한 단계입니다. 뜨개질에 필요한 기본 도구를 소개하고, 올바른 실 선택 방법과 뜨개질의 기본 기술(코잡기, 겉뜨기, 안뜨기)을 배웁니다. 이 단계를 통해 뜨개질의 기초를 다질 수 있습니다.",
        fileUrl:
          "https://ecimg.cafe24img.com/pg137b87168944095/monthlytoy/web/product/big/20240516/9ecbcd4d7452568bfb1878108bc58d01.jpg",
      },
    ],
  };

  // 나중에 props 전달 방법 바꾸기 {...classInfo} -> ({classInfo, steps, 등})
  return (
    <ClassDetailPageContainer>
      <ClassThumbnail classInfo={classInfo} />
      <TabBar />
      <ClassBody>
        <ClassContent classInfo={classInfo} />
        <ClassSideBar classInfo={classInfo} />
      </ClassBody>
    </ClassDetailPageContainer>
  );
}

export default ClassDetailPage;
