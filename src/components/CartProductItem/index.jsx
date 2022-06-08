// @ts-nocheck
import { useDispatch } from 'react-redux';
import useOrder from 'hooks/useOrder';
import useSnackbar from 'hooks/useSnackbar';
import PropTypes from 'prop-types';

import { Image, Counter, CheckBox } from 'components';
import Styled from 'components/CartProductItem/index.style';

import { doPutProductToCart, doDeleteProductFromCart } from 'reducers/cart.reducer';
import autoComma from 'utils/autoComma';
import { MESSAGE } from 'utils/constants';
import apiClient from 'apis/apiClient';
import { useNavigate } from 'react-router-dom';

const CartProductItem = ({ productId, name, price, image, quantity }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [renderSnackbar] = useSnackbar();
  const [isInOrder, updateOrder] = useOrder(productId);

  // TODO 5. delete 장바구니 내 선택된 상품 삭제
  const deleteItem = async () => {
    try {
      await apiClient.delete('/cart', { data: { productIds: [productId] } });

      dispatch(doDeleteProductFromCart({ productId: productId }));
      renderSnackbar(MESSAGE.REMOVE_CART_SUCCESS, 'SUCCESS');
    } catch (error) {
      const customError = error.response.data;
      renderSnackbar(customError.message, 'FAILED');
    }
  };

  // TODO 4. put 장바구니 내 상품 수량 수정
  const putCart = async (productId, updatedQuantity) => {
    try {
      const response = await apiClient.put(`/cart/products/${productId}`, {
        quantity: updatedQuantity,
      });
      dispatch(
        doPutProductToCart({
          productId: response.data.productId,
          name: response.data.name,
          image: response.data.image,
          price: response.data.price,
          quantity: response.data.quantity,
        }),
      );
    } catch (error) {
      const customError = error.response.data;
      renderSnackbar(customError.message, 'FAILED');
      navigate('/login');
    }
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
            putCart(productId, quantity + 1);
          }}
          decrease={() => {
            if (quantity > 1) {
              putCart(productId, quantity - 1);
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
  productId: PropTypes.number.isRequired,
  /**
   * 해당 상품이 장바구니에 담긴 수량
   */
  quantity: PropTypes.number.isRequired,
};

export default CartProductItem;
