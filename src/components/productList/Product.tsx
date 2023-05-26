import type { ProductType } from '../../types';

import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import QuantityInput from '../common/QuantityInput';

import * as api from '../../api';
import useToast from '../../hooks/useToast';
import { cartState, serverNameState } from '../../recoil/state';
import { API_ERROR_MESSAGE, API_SUCCESS_MESSAGE, MAX_QUANTITY } from '../../constants';

interface Props extends ProductType {}

export default function Product({ id, name, price, imageUrl }: Props) {
  const [cart, setCart] = useRecoilState(cartState);
  const [addLoading, setAddLoading] = useState(false);
  const serverName = useRecoilValue(serverNameState);
  const { showToast } = useToast();

  const cartItem = cart.find((cartItem) => cartItem.product.id === id);

  const addCartItem = async () => {
    setAddLoading(true);

    try {
      await api.postCartItem(serverName, id);
      showToast('info', API_SUCCESS_MESSAGE.postCartItem);
    } catch {
      showToast('error', API_ERROR_MESSAGE.postCartItem);
      setAddLoading(false);
      return;
    }

    try {
      await api.getCart(serverName).then(setCart);
    } catch {
      showToast('error', API_ERROR_MESSAGE.getCart);
    }

    setAddLoading(false);
  };

  const setAltSrc = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = './emptyProduct.svg';
  };

  return (
    <>
      <Wrapper>
        <Image src={imageUrl} onError={setAltSrc} />
        <InfoBox>
          <LabelBox>
            <Name>{name}</Name>
            <Price>{price.toLocaleString()} 원</Price>
          </LabelBox>
          <ControlBox>
            {cartItem ? (
              <QuantityInput cartItemId={cartItem.id} min={0} max={MAX_QUANTITY} />
            ) : (
              <CartItemAddButton onClick={addCartItem} disabled={addLoading}>
                <img src="./cart.svg" />
              </CartItemAddButton>
            )}
          </ControlBox>
        </InfoBox>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 282px;
  height: 362px;

  color: #333333;
`;

const Image = styled.img`
  width: 100%;
  height: 282px;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;

  width: 282px;
  padding-top: 16px;
  padding-left: 8px;
`;

const LabelBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.p`
  margin-top: 4px;

  font-size: 16px;
  font-weight: 400;
`;

const Price = styled.p`
  margin-top: 10px;

  vertical-align: center;
  font-size: 20px;
  font-weight: 600;
`;

const CartItemAddButton = styled.button`
  width: 32px;
  height: 30px;
  margin-right: 10px;

  background: transparent;

  transition: transform 0.2s;

  & > img {
    width: 100%;
    height: 100%;
  }

  &:hover {
    transform: rotate(12deg);
  }

  &:disabled {
    cursor: wait;
  }
  &:disabled > img {
    visibility: hidden;
  }
`;

const ControlBox = styled.div`
  width: auto;
`;
