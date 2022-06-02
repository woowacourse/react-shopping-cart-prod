import React from 'react';

import * as S from 'components/common/Counter/Counter.style';

function Counter({ count, onIncrement, onDecrement }) {
  return (
    <S.CounterContainer>
      <S.CounterButton onClick={onDecrement}>-</S.CounterButton>
      <S.Count>{count}</S.Count>
      <S.CounterButton onClick={onIncrement}>+</S.CounterButton>
    </S.CounterContainer>
  );
}

export default Counter;
