import { styled } from "styled-components";

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
  return (
    <ClassAddPageContainer>
      <ClassThumbnailAdd />
      <ClassAddBody>
        <ClassInfoAdd />
        <ClassPriceAdd />
      </ClassAddBody>
      <ButtonContainer>
        <RoundButton label={"등록"} size={"md"} />
      </ButtonContainer>
    </ClassAddPageContainer>
  );
}

export default ClassAdePage;
