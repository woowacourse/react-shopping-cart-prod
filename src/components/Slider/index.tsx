import React, { useEffect, useRef } from 'react';

import * as S from './style';

const Slider = ({ children }: React.PropsWithChildren) => {
  const childrens = React.Children.toArray(children);
  const sliceItems = [childrens.slice(-1), ...childrens, childrens[0]];

  const currentSlide = useRef(0);
  const slideRef = useRef<HTMLUListElement>(null);
  const timer = useRef<NodeJS.Timer>();

  const mouseDownX = useRef(0);
  const mouseUpX = useRef(0);

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
      moveSlice(0);

      slideRef.current.style.transition = '';
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

  const stopTimer = () => {
    clearInterval(timer.current);
    timer.current = undefined;
  };

  const startTimer = () => {
    if (timer.current !== undefined) return;

    timer.current = setInterval(() => {
      moveSliceRight();
    }, 3000);
  };

  useEffect(() => {
    if (slideRef.current) slideRef.current.style.transition = 'all 500ms ease-in-out';

    startTimer();
    return () => {
      stopTimer();
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    stopTimer();
    mouseDownX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    startTimer();

    const moveX = mouseDownX.current - e.clientX;

    if (moveX > 100) moveSliceRight();
    if (moveX < -100) moveSliceLeft();
  };

  return (
    <S.Container onMouseDown={handleMouseDown} onMouseLeave={handleMouseUp}>
      <S.LeftButton onClick={moveSliceLeft}>{'<'}</S.LeftButton>
      <S.RightButton onClick={moveSliceRight}>{'>'}</S.RightButton>
      <S.Contents ref={slideRef} listLength={sliceItems.length}>
        {sliceItems.map((item, i) => (
          <S.Content key={i}>{item}</S.Content>
        ))}
      </S.Contents>
    </S.Container>
  );
};

export default Slider;
