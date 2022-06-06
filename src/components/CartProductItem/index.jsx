// @ts-nocheck
import useProduct from 'hooks/useProduct';
import PropTypes from 'prop-types';

import { Image, Counter, CheckBox } from 'components';

import store from 'store/store';
import { doPutProductToCart, doDeleteProductFromCart } from 'actions/actionCreator';
import autoComma from 'utils/autoComma';
import Styled from 'components/CartProductItem/index.style';
import useOrder from 'hooks/useOrder';
import useSnackbar from 'hooks/useSnackbar';
import { MESSAGE } from 'utils/constants';
import { productApiClient } from 'apis/apiClient';

const CartProductItem = ({ id, quantity }) => {
  const [renderSnackbar] = useSnackbar();

  const [{ name, price, image }] = useProduct(id);
  const [isInOrder, updateOrder] = useOrder(id);

  // TODO . 장바구니 내 단일 상품 삭제(DELETE)
  // const deleteItem = async () => {
  //   const accessToken = getCookie('accessToken');

  //   try {
  //     await productApiClient.delete(
  //       `/carts`,
  //       [id],
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       },
  //     );

  //     store.dispatch(doDeleteProductFromCart({ id }));
  //     renderSnackbar(MESSAGE.REMOVE_CART_SUCCESS, 'SUCCESS');
  //   } catch (error) {
  //     renderSnackbar(MESSAGE.NO_AUTHORIZATION, 'FAILED');
  //     navigate('/login');
  //   }
  // };

  const deleteItem = () => {
    store.dispatch(doDeleteProductFromCart({ id }));
    renderSnackbar(MESSAGE.REMOVE_CART_SUCCESS, 'SUCCESS');
  };

  // TODO [API] 장바구니 내 상품 수량 수정(PATCH)
  // const patchCart = async (id, updatedQuantity) => {
  //   const accessToken = getCookie('accessToken');

  //   try {
  //     const response = await productApiClient.patch(
  //       `/carts/${id}`,
  //       { quantity: updatedQuantity },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       },
  //     );

  //     store.dispatch(doPutProductToCart({ id: response.data.id, quantity: response.data.id }));
  //   } catch (error) {
  //     renderSnackbar(MESSAGE.NO_AUTHORIZATION, 'FAILED');
  //     navigate('/login');
  //   }
  // };

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
            store.dispatch(doPutProductToCart({ id, quantity: quantity + 1 }));
            // patchCart(id, quantity + 1);
          }}
          decrease={() => {
            if (quantity > 1) {
              store.dispatch(doPutProductToCart({ id, quantity: quantity - 1 }));
              // patchCart(id, quantity + 1);
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
