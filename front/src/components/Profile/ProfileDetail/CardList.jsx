import { useEffect, useState } from "react";
import { styled } from "styled-components";

import Card from "./ClassCard";

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  width: calc(780px + 64px);

  @media (max-width: 1240px) {
    grid-template-columns: repeat(2, 1fr);
    width: calc(520px + 32px);
  }

  @media (max-width: 968px) {
    grid-template-columns: repeat(1, 1fr);
    width: 260px;
    gap: 0px;
  }
`;

function CardList({ cards }) {
  const [classes, setClasses] = useState([]);
  
  useEffect(()=>{
    setClasses(cards);
  },[cards]);

  return (
    <Cards>
      {classes?.map((classItem, index) => (
        <Card
          key={index}
          classId={classItem?.classId}
          title={classItem?.className}
          date={classItem?.createdDate?.split('T')[0]}
          name={classItem?.user?.nickname}
          tag={classItem?.tag?.tagName}
          fileId={classItem?.file?.fileId}
        />
      ))}
    </Cards>
  );
}

export default CardList;
