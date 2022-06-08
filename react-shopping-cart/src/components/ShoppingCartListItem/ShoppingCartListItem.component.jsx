import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import CheckBox from 'components/@shared/CheckBox/CheckBox.component';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import Image from 'components/@shared/Image/Image.component';
import TextBox from 'components/@shared/TextBox/TextBox.component';

import ChangeQuantityButton from 'components/ChangeQuantityButton/ChangeQuantityButton.component';

import { addSpecificItem, deleteSpecificItem } from 'redux/actions/orderList.action';

import useDeleteCarts from 'hooks/api/carts/useDeleteCarts';
import useModifyCartQuantity from 'hooks/api/carts/useModifyCartQuantity';
import useDebounce from 'hooks/useDebounce';

import { ReactComponent as TrashCan } from 'assets/images/trash.svg';

const CartItemContainer = styled(FlexBox).attrs({
  gap: '15px',
})`
  width: 736px;
  padding: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.colors['GRAY_001']};

  ${TextBox} {
    flex-grow: 1;
  }
`;

function ShoppingCartListItem({ productId: id, name, thumbnail, price, quantity, loadCarts }) {
  const dispatch = useDispatch();
  const debounce = useDebounce();
  const { items: storedProducts } = useSelector(state => state.orderList);

  const { modifyCartQuantity } = useModifyCartQuantity(true);
  const { deleteCarts } = useDeleteCarts(true);

  const checked = useMemo(
    () => storedProducts.some(productId => productId === id),
    [storedProducts, id]
  );

  const handleChangeCheckBox = id => {
    const toggleItemAction = checked ? deleteSpecificItem : addSpecificItem;
    const toggleActionData = checked ? id : { id, price, quantity };

    dispatch(toggleItemAction(toggleActionData));
  };

  const itemDeleteConfirm = async id => {
    if (window.confirm(`${name}을(를) 장바구니에서 삭제하시겠습니까?`)) {
      await deleteCarts({ productIds: [id] });
      dispatch(deleteSpecificItem(id));
      await loadCarts();
    }
  };

  const onChangeQuantity = async newQuantity => {
    debounce(async () => {
      await modifyCartQuantity({ productId: id, quantity: newQuantity });
      await loadCarts();
    }, 1000);
  };

  return (
    <CartItemContainer>
      <CheckBox checked={checked} onChange={() => handleChangeCheckBox(id)} />
      <Image type="small" src={thumbnail} />
      <TextBox className="product-name" fontSize="small">
        {name}
      </TextBox>
      <FlexBox direction="column" gap="20px" alignItems="flex-end">
        <TrashCan cursor="pointer" onClick={() => itemDeleteConfirm(id)} />
        <ChangeQuantityButton quantity={quantity} onChangeQuantity={onChangeQuantity} />
        <TextBox className="product-price" fontSize="medium">
          {price.toLocaleString()}원
        </TextBox>
      </FlexBox>
    </CartItemContainer>
  );
}

export default React.memo(ShoppingCartListItem);
