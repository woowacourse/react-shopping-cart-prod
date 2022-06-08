import useCart from 'hooks/useCart';
import useDispatchEvent from 'hooks/useDispatchEvent';

import { FlexContainer, StatusMessage } from 'components/@common';
import { Case, SwitchAsync } from 'components/@common/SwitchAsync';

import CartItem from 'components/CartItem';

function CartItemList() {
  const { dispatch, getRecentState } = useDispatchEvent();

  const { cartAction, cartThunk, state } = useCart();
  const { cartItems, cartListAsyncState } = state;

  const handleCheckItem = (id, isChecked) => {
    dispatch(cartAction.updateItemCheck(id, isChecked));
  };

  const handleChangeQuantity = async (id, quantity) => {
    await dispatch(cartThunk.updateItem(id, { quantity }));
    const newCurdAsyncState = getRecentState('cart', 'curdAsyncState');

    newCurdAsyncState.isLoaded === false &&
      alert('서버 오류로 인해 상품 정보 갱신에 실패하였습니다.');
  };

  const handleRemoveItem = async (id) => {
    if (!confirm('정말 해당 상품을 장바구니에서 제거하시겠습니까?')) {
      return;
    }

    await dispatch(cartThunk.removeItem(id));

    const newCurdAsyncState = getRecentState('cart', 'curdAsyncState');

    newCurdAsyncState.isLoaded
      ? alert('해당 상품을 제거하였습니다.')
      : alert('해당 상품 제거에 실패하였습니다.');
  };

  return (
    <FlexContainer direction="column" justify="center">
      <SwitchAsync
        isLoading={cartListAsyncState.isLoading}
        isError={!!cartListAsyncState.error}
        isContentLoaded={cartListAsyncState.isLoaded}
      >
        <Case.Success>
          {(cartItems.length > 0 &&
            cartItems.map(({ id, imageUrl, name, price, quantity, isChecked }) => (
              <CartItem
                key={id}
                id={id}
                image={imageUrl}
                name={name}
                price={price}
                quantity={quantity}
                isChecked={isChecked}
                onChangeCheckBox={handleCheckItem}
                onChangeCounter={handleChangeQuantity}
                onClickRemove={handleRemoveItem}
              />
            ))) || <StatusMessage status="empty">텅! 장바구니에 담은 상품이 없어요!</StatusMessage>}
        </Case.Success>

        <Case.Loading>
          <StatusMessage status="loading">장바구니 목록을 불러오고 있습니다.</StatusMessage>
        </Case.Loading>

        <Case.Error>
          <StatusMessage status="error">{cartListAsyncState.error}</StatusMessage>
        </Case.Error>
      </SwitchAsync>
    </FlexContainer>
  );
}

export default CartItemList;
