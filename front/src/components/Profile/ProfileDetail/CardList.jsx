import { styled } from "styled-components";

import Card from "./ClassCard";

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  width: calc(780px + 64px);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    width: calc(520px + 32px);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    width: 260px;
    gap: 0px;
  }
`;

function CardList({ cards }) {
  return (
    <Cards>
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card?.title}
          date={card?.date}
          name={card?.name}
          tag={card?.tag}
        />
      ))}
    </Cards>
  );
}

export default CardList;
