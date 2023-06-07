import { styled } from 'styled-components';
import { Button } from './Button';
import { totalPriceSelector } from '../recoil/selector';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LocalProductType } from '../types/domain';
import { fetchAddOrderList } from '../api';
import { makeLocalProducts } from '../utils/domain';
import { localProductsState } from '../recoil/atom';
import { DELIVERY_FEE } from '../constants';

export const TotalPriceWithCouponTable = ({
  discountPrice,
  couponId,
  setIsOrderComplete,
  orderList,
}: {
  discountPrice: number | null;
  couponId: number | null;
  setIsOrderComplete: React.Dispatch<React.SetStateAction<boolean>>;
  orderList: LocalProductType[];
}) => {
  const totalPrice = useRecoilValue(totalPriceSelector);

  const setLocalProducts = useSetRecoilState(localProductsState);

  const handleOrderButton = async () => {
    await fetchAddOrderList(orderList, couponId);
    setIsOrderComplete(true);

    const newProducts = await makeLocalProducts();
    setLocalProducts(newProducts);
  };

  return (
    <Wrapper>
      <TitleBox>결제예상금액</TitleBox>
      <RowContainer>
        <p>총 상품가격</p>
        <p>{totalPrice.toLocaleString()}원</p>
      </RowContainer>
      <DiscountContainer>
        <p>ㄴ 할인가격</p>
        <p>- {discountPrice ? discountPrice.toLocaleString() : 0}원</p>
      </DiscountContainer>
      <RowContainer>
        <p>배송비</p>
        <p>{Number(DELIVERY_FEE).toLocaleString()}원</p>
      </RowContainer>
      <RowContainer>
        <p>총 주문금액</p>
        <p>{(totalPrice - (discountPrice ?? 0) + DELIVERY_FEE).toLocaleString()}원</p>
      </RowContainer>
      <Button onClick={handleOrderButton}>주문확정</Button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 380px;
  min-width: 350px;
  width: 100%;
  height: 360px;
  padding-bottom: 30px;

  margin-top: 35px;
  border: 1px solid #dddddd;

  @media screen and (max-width: 300px) {
    width: 100%;
  }
`;

const TitleBox = styled.div`
  width: 100%;
  height: 38px;

  font-size: 17px;
  text-align: start;
  margin: 20px 0;
  padding-left: 20px;
  border-bottom: 3px solid #dddddd;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 30px;

  & > p {
    font-weight: 600;
    font-size: 19px;

    color: var(--dark-gray);
  }

  &:last-of-type {
    padding: 30px;
  }
`;

const DiscountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 30px;

  & > p {
    font-weight: 400;
    font-size: 16px;

    color: #aaaaaa;
  }

  &:last-of-type {
    padding: 30px;
  }
`;
