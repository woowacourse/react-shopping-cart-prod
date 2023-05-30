import type { ProductType } from '../../types';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import * as S from './styles/Product.styles';
import QuantityInput from '../common/QuantityInput';
import * as api from '../../api';
import useToast from '../hooks/useToast';
import { cartState, serverNameState } from '../../atom/state';
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
      <S.Wrapper>
        <S.Image src={imageUrl} onError={setAltSrc} />
        <S.InfoBox>
          <S.LabelBox>
            <S.Name>{name}</S.Name>
            <S.Price>{price.toLocaleString()} 원</S.Price>
          </S.LabelBox>
          <S.ControlBox>
            {cartItem ? (
              <QuantityInput cartItemId={cartItem.id} min={0} max={MAX_QUANTITY} />
            ) : (
              <S.CartItemAddButton onClick={addCartItem} disabled={addLoading}>
                <img src="./cart.svg" />
              </S.CartItemAddButton>
            )}
          </S.ControlBox>
        </S.InfoBox>
      </S.Wrapper>
    </>
  );
}
