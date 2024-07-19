import { styled } from "styled-components";

import OutlineButton from "../../common/OutlineButton";

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 32px;
  margin-bottom: 60px;
`;

const SectionTitle = styled.p`
  color: var(--PRIMARY);
  font-weight: 600;
  font-size: 22px;
  width: 100%;
  max-width: 1024px;
  margin-bottom: 32px;
`;

const ButtonWrapper = styled.div`
  margin-top: 32px;
`;

function Section({ title, children, onClick }) {
  return (
    <SectionWrapper>
      <SectionTitle>{title}</SectionTitle>
      {children}
      {onClick && (
        <ButtonWrapper>
          <OutlineButton label="더보기" color="default" />
        </ButtonWrapper>
      )}
    </SectionWrapper>
  );
}

export default Section;
