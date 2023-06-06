import { ProductType } from '../../types';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import * as S from './styles/Product.styles';
import QuantityInput from '../common/QuantityInput';
import { cartState } from '../../atom/cart';
import { MAX_QUANTITY } from '../../constants';
import { serverNameState } from '../../atom/serverName';
import { loginState } from '../../atom/login';
import { useGetCartList } from '../hooks/useGetCartList';
import { usePostCartItem } from '../hooks/usePostCartItem';

interface Props extends ProductType {}

export default function Product({ id, name, price, imageUrl }: Props) {
  const cart = useRecoilValue(cartState);
  const { getCartsThroughApi } = useGetCartList();
  const { postCartItemThroughApi } = usePostCartItem();
  const [addLoading, setAddLoading] = useState(false);
  const serverName = useRecoilValue(serverNameState);
  const loginCredential = useRecoilValue(loginState);
  const cartItem = cart.find((cartItem) => cartItem.product.id === id);

  const addCartItem = async () => {
    setAddLoading(true);

    await postCartItemThroughApi(serverName, loginCredential, id, setAddLoading);

    getCartsThroughApi(serverName, loginCredential);

    setAddLoading(false);
  };

  const setAltSrc = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = './emptyProduct.svg';
  };

  return (
    <>
      <S.Wrapper>
        <S.Image src={imageUrl} onError={setAltSrc} />
        <S.ControlBox hasCartItem={cartItem === undefined}>
          {cartItem ? (
            <QuantityInput cartItemId={cartItem.id} min={0} max={MAX_QUANTITY} />
          ) : (
            <S.CartItemAddButton onClick={addCartItem} disabled={addLoading}>
              <img src="./cart.svg" />
            </S.CartItemAddButton>
          )}
        </S.ControlBox>
        <S.InfoBox>
          <S.LabelBox>
            <S.Name>{name}</S.Name>
            <S.Price>{price.toLocaleString()} 원</S.Price>
          </S.LabelBox>
        </S.InfoBox>
      </S.Wrapper>
    </>
  );
}
