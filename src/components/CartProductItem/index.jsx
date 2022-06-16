// @ts-nocheck
import PropTypes from 'prop-types';
import useOrder from 'hooks/useOrder';
import usePutCartAPI from 'hooks/usePutCartAPI';
import useDeleteProductAPI from 'components/CartProductItem/useDeleteProductAPI';

import { Image, Counter, CheckBox } from 'components';
import Styled from 'components/CartProductItem/index.style';

import autoComma from 'utils/autoComma';

const CartProductItem = ({ productId, name, price, image, quantity }) => {
  const [isInOrder, updateOrder] = useOrder(productId);
  const { increaseQuantity, decreaseQuantity } = usePutCartAPI();
  const { deleteProduct } = useDeleteProductAPI(productId);

  return (
    <Styled.Container>
      <Styled.LeftSide>
        <CheckBox checked={isInOrder} handleChange={updateOrder} />
        <Image src={image} alt={name} size="130px" />
        <Styled.ProductName>{name}</Styled.ProductName>
      </Styled.LeftSide>

      <Styled.RightSide>
        <Styled.DeleteButton onClick={deleteProduct} />
        <Counter
          quantity={quantity}
          increase={() => increaseQuantity(productId, quantity)}
          decrease={() => decreaseQuantity(productId, quantity)}
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
