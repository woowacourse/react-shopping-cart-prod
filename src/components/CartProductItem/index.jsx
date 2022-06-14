// @ts-nocheck
import PropTypes from 'prop-types';
import useCart from 'hooks/domain/useCart';
import useSnackbar from 'hooks/useSnackbar';
import useOrder from 'hooks/domain/useOrder';

import { Image, Counter, CheckBox } from 'components';

import transformToLocalPriceFormat from 'utils/transformToLocalPriceFormat';
import { MESSAGE, SNACKBAR } from 'utils/constants';
import Styled from './index.style';

const CartProductItem = ({ id, name, price, image, quantity }) => {
  const { renderSnackbar } = useSnackbar();
  const { deleteProductInCart, putProductInCart } = useCart();
  const { isInOrder, updateOrder } = useOrder();

  return (
    <Styled.Container>
      <Styled.LeftSide>
        <CheckBox checked={isInOrder(id)} handleChange={() => updateOrder(id)} />
        <Image src={image} alt={name} size="130px" />
        <Styled.ProductName>{name}</Styled.ProductName>
      </Styled.LeftSide>

      <Styled.RightSide>
        <Styled.DeleteButton
          onClick={() =>
            deleteProductInCart(id, renderSnackbar(MESSAGE.REMOVE_CART_SUCCESS, SNACKBAR.SUCCESS))
          }
        />
        <Counter
          quantity={quantity}
          increase={() => putProductInCart(id, name, price, image, quantity + 1)}
          decrease={() => {
            if (quantity <= 1) return;
            putProductInCart(id, name, price, image, quantity - 1);
          }}
        />
        {transformToLocalPriceFormat(price)}원
      </Styled.RightSide>
    </Styled.Container>
  );
};

CartProductItem.propTypes = {
  /**
   * 해당 상품의 id
   */
  id: PropTypes.number.isRequired,
  /**
   * 해당 상품이 장바구니에 담긴 수량
   */
  quantity: PropTypes.number.isRequired,
};

export default CartProductItem;
