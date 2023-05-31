import { ChangeEventHandler, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import Spacer from '../../common/Spacer/Spacer';
import { formatPrice } from '../../../utils/formatPrice';
import OrderConfirmModal from '../../order/OrderConfirmModal/OrderConfirmModal';
import useModal from '../../common/Modal/useModal';
import { isNumericString } from '../../../utils/isNumericString';
import { removeComma } from '../../../utils/removeComma';
import { CloseIcon } from '../../../assets/svg';
import { pointQuery } from '../../../recoil/selectors/point';

const FREE_SHIPPING_PRICE = 30_000;
const SHIPPING_FEE = 3_000;

const CartTotal = ({ totalProductPrice }: { totalProductPrice: number }) => {
  const [usingPoint, setUsingPoint] = useState('');
  const usingPointRef = useRef('');
  const point = useRecoilValue(pointQuery);
  const { isModalOpen, openModal } = useModal();
  const isFreeShipping = totalProductPrice >= FREE_SHIPPING_PRICE;

  const calcTotalOrderPrice = () => {
    if (totalProductPrice <= 0) return 0;

    const usingPointAmount = Number(removeComma(usingPoint));

    return isFreeShipping
      ? totalProductPrice - usingPointAmount
      : totalProductPrice + SHIPPING_FEE - usingPointAmount;
  };

  const useAllPoint = () => {
    if (point <= 0) return;

    setUsingPoint(point.toLocaleString('ko-KR'));
  };

  const clearPoint = () => {
    setUsingPoint('0');
  };

  const updateUsingPoint: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const valueWithoutComma = removeComma(value);

    if (!isNumericString(valueWithoutComma)) return;

    setUsingPoint(Number(valueWithoutComma).toLocaleString('ko-KR'));
    usingPointRef.current = Number(valueWithoutComma).toLocaleString('ko-KR');

    if (Number(removeComma(usingPointRef.current)) >= point) {
      setUsingPoint(point.toLocaleString('ko-KR'));
    }
  };

  return (
    <>
      <Container>
        <TitleWrapper>
          <Title>결제 금액</Title>
        </TitleWrapper>
        <Detail>
          <PriceWrapper>
            <dt>상품금액</dt>
            <dd>{formatPrice(totalProductPrice)}</dd>
          </PriceWrapper>
          <PriceWrapper>
            <dt>배송비</dt>
            {isFreeShipping ? (
              <OrderDetail>
                <dd>
                  <s>{formatPrice(SHIPPING_FEE)}</s>
                </dd>
                <span>
                  ({formatPrice(FREE_SHIPPING_PRICE)} 이상 주문시 무료배송)
                </span>
              </OrderDetail>
            ) : (
              <dd>{formatPrice(totalProductPrice > 0 ? SHIPPING_FEE : 0)}</dd>
            )}
          </PriceWrapper>
          <PriceWrapper>
            <dt>보유 포인트</dt>
            <dd>{formatPrice(point)}</dd>
          </PriceWrapper>
          <PriceWrapper>
            <dt>사용 포인트</dt>
            <PointWrapper>
              <PointInputWrapper>
                <PointInputInner>
                  <PointInput
                    type="text"
                    value={usingPoint}
                    onChange={updateUsingPoint}
                  />
                  <span>원</span>
                </PointInputInner>
                {Number(removeComma(usingPoint)) > 0 && (
                  <ClearPointButton type="button" onClick={clearPoint}>
                    <CloseIcon />
                  </ClearPointButton>
                )}
              </PointInputWrapper>
              <UseAllPointButton
                type="button"
                disabled={Number(removeComma(usingPoint)) >= point}
                onClick={useAllPoint}
              >
                전액사용
              </UseAllPointButton>
            </PointWrapper>
          </PriceWrapper>
        </Detail>
        <Spacer height={41} />
        <PriceWrapper>
          <Total>총 결제금액</Total>
          <TotalPrice isHighlight={totalProductPrice > 0}>
            {formatPrice(calcTotalOrderPrice())}
          </TotalPrice>
        </PriceWrapper>
        <Spacer height={43} />
        <OrderButton disabled={totalProductPrice === 0} onClick={openModal}>
          {totalProductPrice === 0
            ? '장바구니에 상품을 담아주세요.'
            : `주문하기 (총 ${formatPrice(calcTotalOrderPrice())})`}
        </OrderButton>
      </Container>
      {isModalOpen && <OrderConfirmModal />}
    </>
  );
};

const Container = styled.div`
  position: sticky;
  top: 130px;
  display: flex;
  flex-direction: column;
  width: 420px;
  height: 480px;
  padding-bottom: 16px;
  border: 1px solid ${(props) => props.theme.color.gray300};
  border-radius: 8px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 81px;
  border-bottom: 3px solid ${(props) => props.theme.color.gray300};
  padding: 0 30px;
`;

const Title = styled.h3`
  font-family: 'Noto Sans KR';
  font-size: 22px;
  font-weight: 700;
  line-height: 33px;
  letter-spacing: 0.5px;
`;

const Detail = styled.dl`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 19px;
  padding: 30px 0;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};

  & > div > dt,
  & > div > dd {
    font-family: 'Noto Sans KR';
    font-size: 17px;
    line-height: 27px;
    letter-spacing: 0.5px;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
`;

const PointWrapper = styled.div`
  display: flex;
  column-gap: 16px;
`;

const PointInputWrapper = styled.div`
  display: flex;
  width: 140px;
  align-items: center;
  column-gap: 5px;
  border-bottom: 1px solid ${(props) => props.theme.color.black};
`;

const PointInputInner = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  column-gap: 5px;

  & > input,
  & > span {
    color: ${(props) => props.theme.color.primary};
  }
`;

const PointInput = styled.input`
  width: 100px;
  font-size: 17px;
  text-align: right;
  border: none;
  padding-bottom: 2px;
`;

const ClearPointButton = styled.button`
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  background-color: ${(props) => props.theme.color.gray400};
  border-radius: 50%;
`;

const UseAllPointButton = styled.button`
  padding: 5px;
  font-size: 14px;
  border: 1px solid ${(props) => props.theme.color.gray300};
  border-radius: 4px;

  &:disabled {
    background-color: ${(props) => props.theme.color.gray300};
  }
`;

const Total = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const TotalPrice = styled.dd<{ isHighlight: boolean }>`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.isHighlight && props.theme.color.primary};
`;

const OrderDetail = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;

  & > span {
    font-weight: 600;
  }

  & > dd > s {
    font-size: 18px;
    line-height: 27px;
    letter-spacing: 0.5px;
  }
`;

const OrderButton = styled.button`
  width: 388px;
  height: 73px;
  margin: 0 auto;
  background: ${(props) => props.theme.color.primary};
  font-family: 'Noto Sans KR';
  font-size: 22px;
  line-height: 21px;
  letter-spacing: 0.4px;
  text-align: center;
  color: ${(props) => props.theme.color.white};
  border-radius: 4px;

  &:disabled {
    background-color: ${(props) => props.theme.color.gray400};
  }

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.color.primaryLight};
  }
`;

export default CartTotal;
