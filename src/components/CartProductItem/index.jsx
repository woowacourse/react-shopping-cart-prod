import PropTypes from 'prop-types';
import useProduct from 'hooks/useProduct';
import useOrder from 'hooks/useOrder';
import useSnackbar from 'hooks/useSnackbar';

import { Image, Counter, CheckBox } from 'components';

import store from 'store/store';
import { doPutProductToCart, doDeleteProductFromCart } from 'actions/actionCreator';
import autoComma from 'utils/autoComma';
import { MESSAGE } from 'utils/constants';
import Styled from './index.style';

const CartProductItem = ({ id, quantity }) => {
  const [renderSnackbar] = useSnackbar();

  const [{ name, price, image }] = useProduct(id);
  const [isInOrder, updateOrder] = useOrder(id);

  const deleteItem = () => {
    store.dispatch(doDeleteProductFromCart({ id }));
    renderSnackbar(MESSAGE.REMOVE_CART_SUCCESS, 'SUCCESS');
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
          increase={() => store.dispatch(doPutProductToCart({ id, quantity: quantity + 1 }))}
          decrease={() => {
            if (quantity > 1) {
              store.dispatch(doPutProductToCart({ id, quantity: quantity - 1 }));
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
