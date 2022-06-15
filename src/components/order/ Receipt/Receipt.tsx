import React from 'react';
import * as Styled from './Receipt.style';
function Receipt({ payAmount }) {
  return (
    <Styled.Container>
      <Styled.Wrapper>
        <Styled.Title>결제 금액 정보</Styled.Title>
        <Styled.Information>
          <span>총 결제 금액</span>
          <span>{payAmount}원</span>
        </Styled.Information>
      </Styled.Wrapper>
    </Styled.Container>
  );
}

export default Receipt;
