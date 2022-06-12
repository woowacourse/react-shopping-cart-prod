import React from 'react';

import * as S from 'components/common/Counter/Counter.style';

function Counter({ count, onIncrement, onDecrement, disabled }) {
  return (
    <S.CounterContainer disabled={disabled}>
      <S.CounterButton disabled={disabled} onClick={!disabled && onDecrement}>
        -
      </S.CounterButton>
      <S.Count>{count}</S.Count>
      <S.CounterButton disabled={disabled} onClick={!disabled && onIncrement}>
        +
      </S.CounterButton>
    </S.CounterContainer>
  );
}

export default Counter;
