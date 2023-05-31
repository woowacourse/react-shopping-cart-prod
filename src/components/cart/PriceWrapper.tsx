import { styled } from 'styled-components';
import { DELIVERY_FEE } from '../../constants';
import { useRecoilValue } from 'recoil';
import { checkedItemsState } from '../../store/CartState';
import PointInput from './PointInput';
import useOrder from '../../hooks/useOrder';
import useNavigatePage from '../../hooks/useNavigatePage';

type Props = {
  totalPrice: number;
};

type PriceProps = {
  id: string;
  description: string;
  price: string;
};

const PriceWrapper = ({ totalPrice }: Props) => {
  const checkedItems = useRecoilValue(checkedItemsState);
  const { goOrderComplete } = useNavigatePage();
  const { handleOrderItems } = useOrder();

  const Price = ({ id, description, price }: PriceProps) => {
    return (
      <S.PriceSection id={id}>
        <li>{description}</li>
        <p>{price}</p>
      </S.PriceSection>
    );
  };

  const handleOrder = () => {
    handleOrderItems(checkedItems, 1000);
    goOrderComplete();
  };

  return (
    <S.PriceWrapper>
      <S.PriceLabel>결제예상금액</S.PriceLabel>
      <S.PriceInfo>
        <Price
          id="total-product-price"
          description="총 상품가격"
          price={`${totalPrice.toLocaleString()}원`}
        />
        <Price
          id="delivery-fee"
          description="총 배송비"
          price={`${DELIVERY_FEE(totalPrice).toLocaleString()}원`}
        />
        <PointInput />
        <Price
          id="total-price"
          description="총 주문금액"
          price={`${(totalPrice + DELIVERY_FEE(totalPrice)).toLocaleString()}원`}
        />
      </S.PriceInfo>
      <S.OrderButton onClick={handleOrder} disabled={totalPrice === 0}>
        {totalPrice > 0
          ? `${(totalPrice + DELIVERY_FEE(totalPrice)).toLocaleString()}원 결제하기`
          : '결제하기'}
      </S.OrderButton>
    </S.PriceWrapper>
  );
};

const S = {
  PriceWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    height: 410px;
    margin-top: 40px;
    border: 1px solid #ddd;

    & > :nth-child(1) {
      display: flex;
      align-items: flex-start;
      padding: 20px;
      width: 100%;
      border-bottom: 3px solid #ddd;
    }

    p {
      display: inline-block;
      width: 50%;
      margin: 10px 0px;
    }

    p:nth-child(even) {
      text-align: right;
    }

    @media all and (max-width: 1023px) {
      width: 90%;
    }
  `,

  PriceLabel: styled.div`
    width: 100%;
    font-size: 20px;
    font-weight: 400;
  `,

  PriceInfo: styled.div`
    width: 90%;
    font-size: 18px;
    font-weight: 700;
    margin-top: 30px;

    & > :last-child {
      margin-top: 30px;
    }
  `,

  OrderButton: styled.button`
    width: calc(100% - 60px);
    height: 75px;
    font-size: 20px;
    font-weight: 400;
    margin-top: 45px;
    color: #fff;
    background-color: ${(props) => (props.disabled ? '#aaa' : '#04c09e')};
  `,

  PriceSection: styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    list-style: none;
  `,
};

export default PriceWrapper;
