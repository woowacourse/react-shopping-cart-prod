import styled from '@emotion/styled';
import { TrashCanIcon } from '../../../assets';
import InputStepper from '../../common/InputStepper/InputStepper';
import type { CartItemType } from '../../../types/types';
import CheckBox from '../../common/CheckBox/CheckBox';
import { Text } from '../../common/Text/Text';
import { useState } from 'react';
import getPriceFormat from '../../../utils/getPriceFormat';
import { useConfirmModal } from '../../../hooks/useConfirmModal';
import { useCartFetch } from '../../../hooks/useCartFetch';
import useCheckCart from '../../../hooks/useCheckCart';

const CartItem = ({ cart }: { cart: CartItemType }) => {
  const { check, changeCheckCartList } = useCheckCart(cart.id);
  const { changeCartQuantityAPI, deleteCartItemAPI } = useCartFetch();

  const [quantity, setQuantity] = useState(cart.quantity);

  const totalPrice = check ? cart.product.price : 0;

  const { openModal } = useConfirmModal();

  const deleteCartItem = () => {
    deleteCartItemAPI(cart.id);
  };

  const changeQuantity = (value: number) => {
    if (value !== cart.quantity) {
      changeCartQuantityAPI(cart.id, { quantity: value });
      setQuantity(value);
    }
  };

  return (
    <CartItemWrapper>
      <CartItemInner>
        <CheckBox onClick={changeCheckCartList} checked={check} />
        <ProductImage src={cart.product.imageUrl} />
        <CartInfoWrapper>
          <CartInfoHead>
            <Text size="smallest" weight="light">
              {cart.product.name}
            </Text>
            <TrashCanIcon
              style={{ cursor: 'pointer' }}
              onClick={() => openModal({ callback: deleteCartItem })}
            />
          </CartInfoHead>
          <InputStepper
            size="big"
            quantity={cart.quantity}
            setQuantity={changeQuantity}
            minNumber={1}
          />
          <CardInfoFoot>
            <Text size="smallest" weight="normal">
              {getPriceFormat(cart.product.price)} 원
            </Text>
          </CardInfoFoot>
        </CartInfoWrapper>
      </CartItemInner>
      <CartItemFoot>
        <Text size="smallest" weight="light">
          {`상품금액 ${getPriceFormat(totalPrice)}원 X ${quantity}개`}
        </Text>
        &nbsp;=&nbsp;
        <Text size="smallest" weight="normal">
          {`총 ${getPriceFormat(totalPrice * quantity)}원`}
        </Text>
      </CartItemFoot>
    </CartItemWrapper>
  );
};

export default CartItem;

const CartItemWrapper = styled.div`
  border: solid 1px rgba(0, 0, 0, 0.1);
  padding: 23px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  margin-top: 20px;
  @media screen and (max-width: 660px) {
    padding: 16px 12px 12px 12px;
  }
`;

const CartItemInner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ProductImage = styled.img`
  object-fit: cover;
  margin-left: 16px;
  width: 88px;
  height: 88px;
  border-radius: 4px;
  min-width: 88px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.05);
  @media screen and (max-width: 660px) {
    margin-left: 12px;
    width: 66px;
    height: 66px;
    min-width: 66px;
  }
`;

const CartInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  min-width: calc(100% - 148px);
  margin-left: 16px;
  @media screen and (max-width: 660px) {
    margin-left: 12px;
    min-width: calc(100% - 118px);
  }
`;

const CartInfoHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const CardInfoFoot = styled.div`
  margin-top: 10px;
`;

const CartItemFoot = styled.div`
  background-color: rgb(243, 245, 247);
  padding: 12px;
  margin-top: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
