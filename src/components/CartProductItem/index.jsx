// @ts-nocheck
import axios from 'axios';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import useOrder from 'hooks/useOrder';
import useSnackbar from 'hooks/useSnackbar';

import { Image, Counter, CheckBox } from 'components';

import { doPutProductToCart, doDeleteProductFromCart } from 'actions/actionCreator';
import autoComma from 'utils/autoComma';
import { MESSAGE } from 'utils/constants';
import { getCookie } from 'utils/cookie';
import Styled from './index.style';

const CartProductItem = ({ id, name, price, image, quantity }) => {
  const dispatch = useDispatch();
  const [renderSnackbar] = useSnackbar();

  const [isInOrder, updateOrder] = useOrder(id);

  const deleteItem = () => {
    dispatch(doDeleteProductFromCart({ id }));
    deleteCartProduct();
    renderSnackbar(MESSAGE.REMOVE_CART_SUCCESS, 'SUCCESS');
  };

  const putCart = async quantity => {
    const accessToken = getCookie('accessToken');

    await axios.put(
      `/cart/products/${id}`,
      {
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  };

  const deleteCartProduct = async () => {
    const accessToken = getCookie('accessToken');

    await axios.delete(`/cart`, {
      data: {
        productIds: [id],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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
