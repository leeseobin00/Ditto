import React, { useEffect, useState, useRef } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { styled } from "styled-components";

const TabBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  width: 100%;
`;

const Button = styled.button`
  color: ${(props) => (props.active ? "var(--PRIMARY)" : "var(--DARK)")};
  border: none;
  cursor: pointer;
  &:hover {
    color: var(--PRIMARY);
  }
`;

const Block = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: ${(props) => props.color};
`;

const blocks = [
  { id: "block1", label: "강의소개" },
  { id: "block2", label: "리뷰" },
  { id: "block3", label: "문의하기" },
];

function TabBar() {
  const [activeBlock, setActiveBlock] = useState(null);
  const blockRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveBlock(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    blockRefs.current.forEach((block) => {
      if (block) observer.observe(block);
    });

    return () => {
      if (blockRefs.current) {
        blockRefs.current.forEach((block) => {
          if (block) observer.unobserve(block);
        });
      }
    };
  }, []);

  return (
    <TabBarContainer>
      {blocks.map((block, index) => (
        <Link
          key={block.id}
          to={block.id}
          smooth={true}
          duration={500}
          offset={-50}
        >
          <Button active={activeBlock === block.id}>{block.label}</Button>
        </Link>
      ))}

      {blocks.map((block, index) => (
        <Block
          key={block.id}
          id={block.id}
          color={block.color}
          ref={(el) => (blockRefs.current[index] = el)}
        >
        </Block>
      ))}
    </TabBarContainer>
  );
}

export default TabBar;
