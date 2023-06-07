import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import EmptyImage from '../../../assets/png/empty-image.png';
import { PATH } from '../../../constants/path';
import { cartListState } from '../../../store/cart';
import Button from '../../common/Button/Button';
import { Divider } from '../../common/Divider/Divider.styles';
import { Text } from '../../common/Text/Text.styles';
import CartItem from '../CartItem/CartItem';
import * as S from './CartList.styles';

const CartList = () => {
  const cartList = useRecoilValue(cartListState);
  const navigate = useNavigate();

  if (cartList.length === 0) {
    return (
      <S.ListContainer className="center">
        <S.EmptyImage src={EmptyImage} alt="empty" />
        <Text css={S.emptyMessageStyle} size="large">
          장바구니에 담긴 상품이 없습니다.
        </Text>
        <Button variant="primary" onClick={() => navigate(PATH.ROOT)}>
          홈으로 이동하기
        </Button>
      </S.ListContainer>
    );
  }

  return (
    <S.ListContainer>
      {cartList.map((cartItem) => (
        <Fragment key={cartItem.id}>
          <CartItem cartItemId={cartItem.id} quantity={cartItem.quantity} {...cartItem.product} />
          <Divider />
        </Fragment>
      ))}
    </S.ListContainer>
  );
};

export default CartList;
