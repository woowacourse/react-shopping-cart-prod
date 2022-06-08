import cartAPI from 'apis/cart';
import { ReactComponent as Delete } from 'assets/Delete.svg';
import { CheckBox, Link, NumberInput } from 'components/@shared';
import { useDispatch } from 'react-redux';
import { cartActions } from 'redux/actions';
import { getAccessToken } from 'utils/auth';

import { CART_MESSAGE } from 'constants/message';
import PATH from 'constants/path';

import * as S from './CartItem.styled';
import { Props } from './CartItem.type';

function CartItem({
  cartItemId,
  product,
  quantity,
  checked,
  setChecked,
}: Props) {
  const { id, name, imageUrl } = product;
  const dispatch = useDispatch();

  const onClickDeleteButton = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (!window.confirm(CART_MESSAGE.ASK_DELETE)) return;

    const accessToken = getAccessToken();

    if (!accessToken) return;

    cartAPI
      .delete(accessToken, cartItemId)
      .then(res => {
        dispatch(cartActions.setCart(res));
      })
      .catch(error => {
        alert(CART_MESSAGE.FAIL_DELETE);
      });
  };

  const onChangeCartQuantity = (value: number) => {
    const accessToken = getAccessToken();

    if (!accessToken) return;

    cartAPI
      .changeQuantity(accessToken, cartItemId, value)
      .then(res => {
        dispatch(cartActions.setCart(res));
      })
      .catch(error => {
        alert(CART_MESSAGE.FAIL_CHANGE_QUANTITY);
      });
  };

  return (
    <Link to={`${PATH.PRODUCT}/${id}`}>
      <S.CartItem>
        <CheckBox id={cartItemId} checked={checked} onChange={setChecked} />
        <img src={imageUrl} alt={name} />
        <S.ProductName>{name}</S.ProductName>
        <S.DeleteButton type="button" onClick={onClickDeleteButton}>
          <Delete />
        </S.DeleteButton>
        <NumberInput value={quantity} setValue={onChangeCartQuantity} />
        <S.Price>
          {(product.price * quantity).toLocaleString('ko-KR')} 원
        </S.Price>
      </S.CartItem>
    </Link>
  );
}

export default CartItem;
