// @ts-nocheck
import { useDispatch } from 'react-redux';
import useProduct from 'hooks/useProduct';
import useOrder from 'hooks/useOrder';
import useSnackbar from 'hooks/useSnackbar';
import PropTypes from 'prop-types';

import { Image, Counter, CheckBox } from 'components';
import Styled from 'components/CartProductItem/index.style';

import { doPutProductToCart, doDeleteProductFromCart } from 'actions/actionCreator';
import autoComma from 'utils/autoComma';
import { MESSAGE } from 'utils/constants';

const CartProductItem = ({ id, quantity }) => {
  const dispatch = useDispatch();
  const [renderSnackbar] = useSnackbar();

  const [{ name, price, image }] = useProduct(id);
  const [isInOrder, updateOrder] = useOrder(id);

  // TODO 5. delete 장바구니 내 선택된 상품 삭제
  // const deleteItem = async () => {
  //   const accessToken = getCookie('accessToken');

  //   try {
  //     await apiClient.delete(
  //       `/carts`,
  //       [id],
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       },
  //     );

  //     dispatch(doDeleteProductFromCart({ id }));
  //     renderSnackbar(MESSAGE.REMOVE_CART_SUCCESS, 'SUCCESS');
  //   } catch (error) {
  //     renderSnackbar(MESSAGE.NO_AUTHORIZATION, 'FAILED');
  //     navigate('/login');
  //   }
  // };

  const deleteItem = () => {
    dispatch(doDeleteProductFromCart({ id }));
    renderSnackbar(MESSAGE.REMOVE_CART_SUCCESS, 'SUCCESS');
  };

  // TODO 4. put 장바구니 내 상품 수량 수정
  // const putCart = async (id, updatedQuantity) => {
  //   const accessToken = getCookie('accessToken');

  //   try {
  //     const response = await apiClient.put(
  //       `/carts/${id}`,
  //       { quantity: updatedQuantity },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       },
  //     );

  //     dispatch(doPutProductToCart({ id: response.data.id, quantity: response.data.id }));
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
            dispatch(doPutProductToCart({ id, quantity: quantity + 1 }));
            // patchCart(id, quantity + 1);
          }}
          decrease={() => {
            if (quantity > 1) {
              dispatch(doPutProductToCart({ id, quantity: quantity - 1 }));
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
