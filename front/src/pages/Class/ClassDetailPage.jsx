import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import useAxios from "../../hooks/useAxios";
import ClassThumbnail from "../../components/Class/ClasDetail/ClassThumbnail";
import ClassInfo from "../../components/Class/ClasDetail/ClassInfo";
import ClassSideBar from "../../components/Class/ClasDetail/ClassSideBar";
import TabBar from "../../components/Class/ClasDetail/TabBar";

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
  padding: 1% 5%;
`;

function ClassDetailPage() {
  const titleIds = ["1", "2", "3"];

  // redux
  const userId = useSelector((state) => state.auth.userId);
  const userName = useSelector((state) => state.auth.nickname);
  // axios
  const { sendRequest: getClassInfo } = useAxios();

  // router
  const { classId } = useParams();

  const [classInfo, setClassInfo] = useState(null);

  const handleGetClass = async () => {
    try {
      const result = await getClassInfo(`/classes/${classId}`, null, "get");
      setClassInfo(result?.data);
    } catch (error) {
      console.error("Error fetching class info:", error);
    }
  };

  useEffect(() => {
    handleGetClass();
  }, [handleGetClass]);

  return (
    <ClassDetailPageContainer>
      {classInfo && (
        <>
          <ClassThumbnail
            classInfo={classInfo}
            file={classInfo?.file}
            instructor={classInfo?.user}
            tag={classInfo.tag}
          />
          <TabBar titleIds={titleIds} />
          <ClassBody>
            <ClassInfo classInfo={classInfo} titleIds={titleIds} />
            <ClassSideBar classInfo={classInfo} />
          </ClassBody>
        </>
      )}
    </ClassDetailPageContainer>
  );
}

export default ClassDetailPage;
