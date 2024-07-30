import { styled } from "styled-components";

const ClassKitContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
`;

const ClassKitInfo = styled.div`
  display: flex;
  flex-direction: row;
  border-style: solid;
  border-width: 0.5px;
  border-radius: 10px;
  border-color: var(--BORDER_COLOR);
  padding: 2%;
  width: 100%;
  justify-content: space-between;
  margin: 15px 0;
  min-height: 130px;
`;

const ClassKitDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  justify-content: space-between;
  padding: 15px 0;
`;

const Img = styled.img`
  width: 120px;
  max-height: 120px;
  border-radius: 10px;
  margin-right: 10px;
`;

const KitName = styled.div`
  font-weight: 600;
  font-size: 18px;
`;

const KitExplation = styled.div`
  font-size: 16px;
`;

function ClassKit({ kit }) {
  return (
    <ClassKitContainer>
      <Title>제공 키트</Title>
      <ClassKitInfo>
        <Img
          src={`http://i11a106.p.ssafy.io:8080/files/download/${kit.file.fileId}`}
        />
        <ClassKitDetail>
          <KitName>{kit.kitName}</KitName>
          <KitExplation>{kit.kitExplanation}</KitExplation>
        </ClassKitDetail>
      </ClassKitInfo>
    </ClassKitContainer>
  );
}

export default ClassKit;
