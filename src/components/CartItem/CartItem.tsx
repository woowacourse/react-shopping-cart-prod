import cartAPI from 'apis/cart';
import { ReactComponent as Delete } from 'assets/Delete.svg';
import { CheckBox, Link, NumberInput } from 'components/@shared';
import { useDispatch } from 'react-redux';
import { cartActions } from 'redux/actions';
import styled from 'styled-components';
import { Product, Cart } from 'types/index';
import { getAccessToken } from 'utils/auth';

import { CART_MESSAGE } from 'constants/message';
import PATH from 'constants/path';

type Props = {
  cartItemId: Cart['id'];
  product: Product;
  quantity: number;
  checked: boolean;
  setChecked: (
    e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLElement>
  ) => void;
};

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
      <StyledCartItem>
        <CheckBox id={cartItemId} checked={checked} onChange={setChecked} />
        <img src={imageUrl} alt={name} />
        <StyledProductName>{name}</StyledProductName>
        <StyledDeleteButton type="button" onClick={onClickDeleteButton}>
          <Delete />
        </StyledDeleteButton>
        <NumberInput value={quantity} setValue={onChangeCartQuantity} />
        <StyledPrice>
          {(product.price * quantity).toLocaleString('ko-KR')} 원
        </StyledPrice>
      </StyledCartItem>
    </Link>
  );
}

const StyledCartItem = styled.div`
  width: 100%;
  padding-top: 20px;
  border-top: 1px solid ${({ theme: { colors } }) => colors.lightGray};

  img {
    aspect-ratio: 1 / 1;
    height: 110px;
    margin: 0 10px;
  }
`;

const StyledProductName = styled.div`
  position: relative;
  top: -105px;
  left: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  width: 310px;
`;

const StyledDeleteButton = styled.button`
  position: relative;
  top: -125px;
  float: right;

  background: none;
`;

const StyledPrice = styled.div`
  position: relative;
  top: -35px;
  left: 105px;
  float: right;

  font-size: 14px;
`;

export default CartItem;
