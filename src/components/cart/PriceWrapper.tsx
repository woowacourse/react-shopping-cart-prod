import { styled } from 'styled-components';
import { DELIVERY_FEE } from '../../constants';
import Point from './Point';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { checkedItemsState } from '../../store/CheckedItemsState';
import { useOrder } from '../../hooks/useOrder';
import { inputPointValueState } from '../../store/InputPointValueState';
import { useNavigate } from 'react-router-dom';

type Props = {
  subtotal: number;
};

const PriceWrapper = ({ subtotal }: Props) => {
  const setCheckedItems = useSetRecoilState(checkedItemsState);
  const inputPointValue = useRecoilValue(inputPointValueState);

  const navigate = useNavigate();

  const { orderToItems } = useOrder();

  const handleOrderButtonClick = () => {
    if (subtotal === 0) {
      alert('선택 후 주문을 해주세요.');
      return;
    }
    const confirmOrder = window.confirm('주문을 진행하시겠습니까?');
    if (confirmOrder) {
      orderToItems();
      setCheckedItems([]);
      navigate('/');
    }
  };

  return (
    <S.PriceWrapper>
      <S.PriceLabel>결제예상금액</S.PriceLabel>
      <S.PriceInfo>
        <section id="total-product-price">
          <li>총 상품가격</li>
          <p>{subtotal !== 0 ? `${subtotal.toLocaleString()}원` : '0원'}</p>
        </section>
        <section id="delivery-fee">
          <li>총 배송비</li>
          <p>{subtotal !== 0 ? `${DELIVERY_FEE.toLocaleString()}원` : '0원'}</p>
        </section>
        <Point subtotal={subtotal} />
        <section id="total-price">
          <li>총 주문금액</li>
          <p>
            {subtotal !== 0
              ? `${(subtotal + DELIVERY_FEE - Number(inputPointValue)).toLocaleString()}원`
              : '0원'}
          </p>
        </section>
      </S.PriceInfo>
      <S.OrderButton onClick={handleOrderButtonClick}>주문하기</S.OrderButton>
    </S.PriceWrapper>
  );
};

const S = {
  PriceWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
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

    @media all and (max-width: 1200px) {
      width: 90%;
    }
  `,

  PriceLabel: styled.div`
    width: 100%;
    font-size: 24px;
    font-weight: 400;
  `,
  PriceInfo: styled.div`
    width: 90%;
    font-size: 20px;
    font-weight: 700;
    margin-top: 30px;

    & > :nth-child(n) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      li {
        list-style: none;
      }
    }

    & > :last-child {
      margin-top: 30px;
    }
  `,

  OrderButton: styled.button`
    width: calc(100% - 60px);
    height: 75px;
    font-size: 24px;
    font-weight: 400;
    margin-top: 45px;
    color: #fff;
    background-color: #333;
    cursor: pointer;
  `,
};

export default PriceWrapper;
