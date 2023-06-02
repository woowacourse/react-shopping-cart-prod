import React, { useEffect, useRef } from 'react';

import * as S from './style';

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
    <S.Container>
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
