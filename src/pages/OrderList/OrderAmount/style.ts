import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Layout = styled.div`
  width: 40%;
  border: 1px solid #aaaaaa;
  color: #333333;

  @media only screen and (max-width: 768px) {
    // 모바일
    width: 100%;
  }
`;

export const OrderAmountTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 25px 20px;
  background-color: #f6f6f6;

  border-bottom: 2px solid #aaaaaa;
`;

export const OrderAmount = styled.div`
  padding: 30px 20px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`;
