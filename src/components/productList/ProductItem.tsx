import type { ProductType } from '../../types';

import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { keyframes } from 'styled-components';

import QuantityInput from '../common/QuantityInput';

import useToast from '../../hooks/useToast';
import { tokenState, cartState, serverNameState } from '../../recoil/state';
import api from '../../api';
import { API_ERROR_MESSAGE, API_INFO_MESSAGE, MAX_QUANTITY } from '../../constants';

interface Props extends ProductType {}

export default function ProductItem({ id, name, price, imageUrl }: Props) {
  const serverName = useRecoilValue(serverNameState);
  const token = useRecoilValue(tokenState);
  const [cart, setCart] = useRecoilState(cartState);

  const [addLoading, setAddLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { showToast } = useToast();

  const cartItem = cart.find((cartItem) => cartItem.product.id === id);

  const addCartItem = async () => {
    if (token === null) {
      showToast('info', '로그인 하면 장바구니를 이용할 수 있어요!');
      return;
    }

    setAddLoading(true);
    await portCartItem(token);
    await getCart(token);
    setAddLoading(false);
  };

  const portCartItem = async (token: string) => {
    try {
      await api.postCartItem(serverName, token, id);
      showToast('info', API_INFO_MESSAGE.postCartItem);
    } catch {
      showToast('error', API_ERROR_MESSAGE.postCartItem);
      setAddLoading(false);
      return;
    }
  };

  const getCart = async (token: string) => {
    try {
      await api.getCart(serverName, token).then(setCart);
    } catch {
      showToast('error', API_ERROR_MESSAGE.getCart);
    }
  };

  const setAltSrc = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = './emptyProduct.svg';
  };

  const onLoadImage = () => {
    setImageLoaded(true);
  };

  return (
    <>
      <Wrapper>
        <Image src={imageUrl} onLoad={onLoadImage} onError={setAltSrc} imageLoaded={imageLoaded} />
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
                <img src="/cart.svg" />
              </CartItemAddButton>
            )}
          </ControlBox>
        </InfoBox>
      </Wrapper>
    </>
  );
}

const skeletonBackground = keyframes`
  0%    { background-color: rgba(165, 165, 165, 0.1) }
  50%   { background-color: rgba(165, 165, 165, 0.3) }
  100%  { background-color: rgba(165, 165, 165, 0.1) }
`;

const Wrapper = styled.div`
  width: 282px;
  height: 362px;

  color: #333333;
`;

const Image = styled.img<{ imageLoaded: boolean }>`
  width: 100%;
  height: 282px;
  animation: ${skeletonBackground} 1s infinite;
  ${({ imageLoaded }) => (imageLoaded ? 'animation: none;' : '')}

  object-fit: cover;
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
