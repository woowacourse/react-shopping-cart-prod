import PropTypes from 'prop-types';
import * as Styled from './style';
import { useEffect, useState } from 'react';
import { parsePrice } from 'utils';
import { MESSAGE } from 'constants';
import smallTrashBin from 'assets/svg/smallTrashbin.svg';
import CheckBox from 'components/Common/CheckBox/CheckBox';
import useCart from 'hooks/useCart';

const CartItem = ({
  id,
  imageUrl,
  name,
  price,
  quantity,
  isSelected,
  onToggleSelect,
}) => {
  const { updateItemQuantity, deleteItem } = useCart();
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleIncrementQuantity = () => {
    setItemQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrementQuantity = () => {
    try {
      if (itemQuantity === 1) throw new Error(MESSAGE.MINIMUM_CART_LENGTH);
      setItemQuantity((prevQuantity) => prevQuantity - 1);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteItem = () => {
    deleteItem(id);
  };

  useEffect(() => {
    if (quantity !== itemQuantity) {
      updateItemQuantity(id, itemQuantity);
    }
  }, [itemQuantity]);

  return (
    <Styled.Wrapper>
      <Styled.LeftBox>
        <CheckBox onCheck={onToggleSelect} checkedStatus={isSelected} />
        <Styled.Image src={imageUrl} alt={name} loading="lazy" />
        <Styled.Name>{name}</Styled.Name>
      </Styled.LeftBox>
      <Styled.RightBox>
        <Styled.DeleteButton onClick={handleDeleteItem}>
          <Styled.TrashBinSvg src={smallTrashBin} alt="상품 삭제 버튼" />
        </Styled.DeleteButton>
        <Styled.QuantityControlBox>
          <Styled.QuantityButton onClick={handleIncrementQuantity}>
            +
          </Styled.QuantityButton>
          <span>{itemQuantity}</span>
          <Styled.QuantityButton onClick={handleDecrementQuantity}>
            -
          </Styled.QuantityButton>
        </Styled.QuantityControlBox>
        <Styled.Price>{parsePrice(price)}원</Styled.Price>
      </Styled.RightBox>
    </Styled.Wrapper>
  );
};

CartItem.propTypes = {
  id: PropTypes.number,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  isSelected: PropTypes.bool,
  onToggleSelect: PropTypes.func,
};

export default CartItem;
