import React from 'react';

import * as S from 'components/common/Counter/Counter.style';

function Counter({ count, onIncrement, onDecrement, disabled = false }) {
  return (
    <S.CounterContainer disabled={disabled}>
      <S.CounterButton disabled={disabled} onClick={onDecrement}>-</S.CounterButton>
      <S.Count>{count}</S.Count>
      <S.CounterButton disabled={disabled} onClick={onIncrement}>+</S.CounterButton>
    </S.CounterContainer>
  );
}

export default Counter;
