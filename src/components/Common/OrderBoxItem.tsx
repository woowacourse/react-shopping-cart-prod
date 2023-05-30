import { ReactElement } from 'react';
import { styled } from 'styled-components';

interface OrderBoxItemProps {
  type: 'orderList' | 'payment';
  children: ReactElement;
}

const OrderBoxItem = ({ type, children }: OrderBoxItemProps) => {
  return (
    <StyledOrderBoxItem type={type}>
      {type === 'orderList' ? (
        <TitleContainer>
          <h2>주문번호</h2>
          <button type="button">{'상세정보 >'}</button>
        </TitleContainer>
      ) : (
        <TitleContainer>
          <h2>결재금액 정보</h2>
        </TitleContainer>
      )}
      <OrderBoxContents type={type}>{children}</OrderBoxContents>
    </StyledOrderBoxItem>
  );
};

const StyledOrderBoxItem = styled.li<Pick<OrderBoxItemProps, 'type'>>`
  width: ${({ type }) => (type === 'orderList' ? '100%' : '400px')};

  border: 1px solid ${({ theme }) => theme.colors.gray100};
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 30px;

  border-bottom: 3px solid ${({ theme }) => theme.colors.gray100};
  background-color: #f6f6f6;

  & > h2 {
    height: 80px;
    line-height: 80px;
    font-size: 20px;
    font-weight: 400;

    @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
      font-size: 24px;
    }
  }
`;

const OrderBoxContents = styled.div<OrderBoxItemProps>`
  display: flex;
  flex-direction: ${({ type }) => (type === 'orderList' ? 'column' : 'row')};
  justify-content: space-between;
  align-items: center;
  padding: 30px;

  :not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  }
`;

export default OrderBoxItem;
