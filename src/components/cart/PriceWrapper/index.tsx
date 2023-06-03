import { DELIVERY_FEE } from '../../../constants';
import { useRecoilValue } from 'recoil';
import { checkedItemsState } from '../../../store/CartState';
import PointInput from '../PointInput';
import useOrder from '../../../hooks/useOrder';
import useNavigatePage from '../../../hooks/useNavigatePage';
import { S } from './PriceWrapper.styles';
import PointState from '../../../store/PointState';

type Props = {
  totalPrice: number;
};

type PriceProps = {
  id: string;
  description: string;
  price: string;
};

// TODO: 이름 변경
const PriceWrapper = ({ totalPrice }: Props) => {
  const checkedItems = useRecoilValue(checkedItemsState);
  const usedPoint = useRecoilValue(PointState);

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
    handleOrderItems(checkedItems, usedPoint, DELIVERY_FEE(totalPrice));
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
        <PointInput totalPrice={totalPrice + DELIVERY_FEE(totalPrice)} />
        <Price
          id="total-price"
          description="총 주문금액"
          price={`${(totalPrice + DELIVERY_FEE(totalPrice)).toLocaleString()}원`}
        />
      </S.PriceInfo>
      <S.OrderButton onClick={handleOrder} disabled={totalPrice === 0}>
        {totalPrice > 0
          ? `${(totalPrice + DELIVERY_FEE(totalPrice) - usedPoint).toLocaleString()}원 결제하기`
          : '결제하기'}
      </S.OrderButton>
    </S.PriceWrapper>
  );
};

export default PriceWrapper;
