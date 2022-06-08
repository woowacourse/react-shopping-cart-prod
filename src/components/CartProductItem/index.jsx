// @ts-nocheck
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import useOrderStore from 'hooks/useOrderStore';
import useCart from 'hooks/db/useCart';
import useSnackbar from 'hooks/useSnackbar';

import { Image, Counter, CheckBox } from 'components';

import { doDeleteProductFromCart, doPutProductToCart } from 'modules/cart';
import autoComma from 'utils/autoComma';
import { MESSAGE } from 'utils/constants';
import Styled from './index.style';

const CartProductItem = ({ id, name, price, image, quantity }) => {
  const dispatch = useDispatch();
  const [renderSnackbar] = useSnackbar();
  const { putCartAPI, deleteCartAPI } = useCart();

  const [isInOrder, updateOrder] = useOrderStore(id);

  const deleteItem = () => {
    dispatch(doDeleteProductFromCart({ id }));
    deleteCartProduct();
    renderSnackbar(MESSAGE.REMOVE_CART_SUCCESS, 'SUCCESS');
  };

  const putCart = async quantity => {
    await putCartAPI(id, quantity);
  };

  const deleteCartProduct = async () => {
    await deleteCartAPI([id]);
  };

  return (
    <Styled.Container>
      <Styled.LeftSide>
        <CheckBox checked={isInOrder} handleChange={updateOrder} />
        <Image src={image} alt={name} size="130px" />
        <Styled.ProductName>{name}</Styled.ProductName>
      </Styled.LeftSide>

      <Styled.RightSide>
        <Styled.DeleteButton onClick={deleteItem} />
        <Counter
          quantity={quantity}
          increase={() => {
            dispatch(doPutProductToCart({ productId: id, quantity: quantity + 1 }));
            putCart(quantity + 1);
          }}
          decrease={() => {
            if (quantity > 1) {
              dispatch(doPutProductToCart({ productId: id, quantity: quantity - 1 }));
              putCart(quantity - 1);
            }
          }}
        />
        {autoComma(price)}원
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
