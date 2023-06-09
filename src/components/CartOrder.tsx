import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import useOrderFetch from '../hooks/useOrderFetch';
import userState from '../recoil/atoms/userState';
import cartOrderPriceState from '../recoil/selectors/cartOrderPriceState';
import PriceInput from './PriceInput';

const CartOrderContainer = styled.form`
  margin-top: 20px;
  min-width: 440px;
`;

const Title = styled.h1`
  padding: 0 30px;

  ${({ theme }) => theme.fonts.description}
  font-size: 15px;

  & > strong {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

const Content = styled.section`
  padding: 30px;
  margin-bottom: 40px;

  ${({ theme }) => theme.fonts.description}
`;

const ContentPlaceholder = styled.h2`
  text-align: center;
  color: #444444;
`;

const PriceField = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const PriceFieldName = styled.strong<{ marked?: boolean }>`
  color: ${({ marked }) => marked && '#0078ff'};
`;

const PriceFieldValue = styled.strong`
  margin-left: auto;
`;

const ContentDivider = styled.hr`
  height: 20px;
  background: transparent;
  border: none;
`;

const OrderButton = styled.button`
  position: fixed;
  bottom: 10px;
  left: 10px;
  right: 10px;

  padding: 15px 0;

  border-radius: 10px;

  background-color: #0078ff;
  color: white;
  ${({ theme }) => theme.fonts.description}

  & strong {
    margin: 0 5px;
  }
`;

type CartOrderProps = {
  selectedCount: number;
};

const CartOrder = (props: CartOrderProps) => {
  const { selectedCount } = props;
  const [usingPoint, setUsingPoint] = useState(0);
  const { order } = useOrderFetch();

  const prices = useRecoilValue(cartOrderPriceState);
  const userInfo = useRecoilValue(userState);

  const handleInputField = (value: number) => {
    setUsingPoint(value);
  };

  return (
    <CartOrderContainer>
      <Title>
        결제할 상품<strong> 총 {selectedCount}개</strong>
      </Title>

      <Content>
        {selectedCount === 0 ? (
          <>
            <ContentDivider />
            <ContentPlaceholder>주문할 상품을 선택해주세요!</ContentPlaceholder>
            <ContentDivider />
          </>
        ) : (
          <>
            <PriceField>
              <PriceFieldName>상품금액</PriceFieldName>
              <PriceFieldValue>{prices.products}원</PriceFieldValue>
            </PriceField>

            <PriceField>
              <PriceFieldName>총 배송비</PriceFieldName>
              <PriceFieldValue>{prices.shippingFee}원</PriceFieldValue>
            </PriceField>

            <PriceField>
              <PriceFieldName marked>적립금</PriceFieldName>
              <PriceFieldValue>
                <PriceInput
                  useablePoint={userInfo.currentPoints}
                  handleInputField={handleInputField}
                />
              </PriceFieldValue>
            </PriceField>

            <ContentDivider />

            <PriceField>
              <PriceFieldName>결제금액</PriceFieldName>
              <PriceFieldValue>{prices.total - usingPoint}원</PriceFieldValue>
            </PriceField>

            <ContentDivider />

            <OrderButton onClick={() => order(usingPoint)}>
              <strong>총{selectedCount}개</strong> |{' '}
              <strong>{prices.total - usingPoint}원 결제하기</strong>
            </OrderButton>
          </>
        )}
      </Content>
    </CartOrderContainer>
  );
};

export default CartOrder;
