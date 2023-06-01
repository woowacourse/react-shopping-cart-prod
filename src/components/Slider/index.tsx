import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Slider = ({ children }: React.PropsWithChildren) => {
  const childrens = React.Children.toArray(children);
  const sliceItems = [childrens.slice(-1), ...childrens, childrens[0]];

  const currentSlide = useRef(0);
  const slideRef = useRef<HTMLUListElement>(null);

  const moveSliceLeft = () => {
    if (slideRef.current === null) return;

    if (currentSlide.current === 1) {
      slideRef.current.style.transition = '';
      moveSlice(sliceItems.length - 1);

      setTimeout(() => {
        if (slideRef.current === null) return;
        slideRef.current.style.transition = 'all 500ms ease-in-out';
        moveSlice(sliceItems.length - 2);
      }, 0);

      return;
    }

    moveSlice(currentSlide.current - 1);
  };

  const moveSliceRight = () => {
    if (slideRef.current === null) return;

    if (currentSlide.current === sliceItems.length - 2) {
      slideRef.current.style.transition = '';
      moveSlice(0);

      setTimeout(() => {
        if (slideRef.current === null) return;
        slideRef.current.style.transition = 'all 500ms ease-in-out';
        moveSlice(1);
      }, 0);

      return;
    }

    moveSlice(currentSlide.current + 1);
  };

  const moveSlice = (postion: number) => {
    if (!slideRef.current) return;

    currentSlide.current = postion;
    slideRef.current.style.transform = `translateX(-${(postion * 100) / sliceItems.length}%)`;
  };

  useEffect(() => {
    if (slideRef.current) slideRef.current.style.transition = 'all 500ms ease-in-out';

    const setTimer = setInterval(() => {
      moveSliceRight();
    }, 3000);

    return () => {
      clearInterval(setTimer);
    };
  }, []);

  return (
    <Container>
      <LeftButton onClick={moveSliceLeft}>{'<'}</LeftButton>
      <RightButton onClick={moveSliceRight}>{'>'}</RightButton>
      <Contents ref={slideRef} listLength={sliceItems.length}>
        {sliceItems.map((item, i) => (
          <Content key={i}>{item}</Content>
        ))}
      </Contents>
    </Container>
  );
};
const Contents = styled.ul<{ listLength: number }>`
  display: flex;
  flex-direction: row;

  width: ${(props) => props.listLength * 100}%;

  transition: 'all 500ms ease-in-out';
`;

const Content = styled.li`
  width: 860px;
`;

const LeftButton = styled.button`
  position: absolute;
  left: 20px;

  height: 40px;
  width: 25px;
  border-radius: 10px;
  background-color: rgba(240, 240, 240, 0.7);
  cursor: pointer;

  z-index: 1;
`;

const RightButton = styled.button`
  position: absolute;
  right: 20px;

  height: 40px;
  width: 25px;
  border-radius: 10px;
  background-color: rgba(240, 240, 240, 0.7);
  cursor: pointer;

  z-index: 1;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  margin-top: 30px;
  overflow: hidden;

  font-size: 20px;
  background-color: lightblue;

  z-index: 0;
`;

export default Slider;
