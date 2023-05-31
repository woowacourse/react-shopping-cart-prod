/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { cartState } from '../../../store/CartState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useCart } from '../../../hooks/useCart';
import { CartItem, Product } from '../../../types';
import CartListItem from '../CartListItem';
import Checkbox from '../../@common/Checkbox';
import TotalCheckbox from '../TotalCheckbox';
import PriceWrapper from '../PriceWrapper';
import { LoadingSpinner } from '../../@common/LoadingSpinner';
import { CART_BASE_URL, PRODUCT_BASE_URL } from '../../../constants/url';
import { serverState } from '../../../store/ServerState';
import { productListState } from '../../../store/ProductListState';
import useGet from '../../../hooks/useGet';
import { S } from './CartList.styles';

const CartList = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const setProduct = useSetRecoilState(productListState);
  const serverUrl = useRecoilValue(serverState);
  const {
    checkedItems,
    isChecked,
    setCheckedItems,
    totalPrice,
    handleCheckAllItems,
    handleCheckedItem,
    handleRemoveCheckedItem,
    initializeCheckItems,
  } = useCart();

  const { data: fetchedCartList, isLoading } = useGet<CartItem[]>(`${serverUrl}${CART_BASE_URL}`);
  const { data: fetchedProductList } = useGet<Product[]>(`${serverUrl}${PRODUCT_BASE_URL}`);

  useEffect(() => {
    if (fetchedCartList) setCart(fetchedCartList);
    if (fetchedProductList) setProduct(fetchedProductList);
    initializeCheckItems();
  }, [serverUrl, fetchedProductList]);

  const cartList = cart.map((cartItem) => (
    <S.ItemWrapper key={cartItem.product.id}>
      <Checkbox onChange={handleCheckedItem(cartItem.id)} isChecked={isChecked(cartItem.id)} />
      <CartListItem item={cartItem} setCheckItems={setCheckedItems} />
    </S.ItemWrapper>
  ));

  const itemList = (
    <S.ItemListWrapper>{isLoading ? <LoadingSpinner /> : cartList}</S.ItemListWrapper>
  );

  return (
    <>
      <S.Title>장바구니</S.Title>
      <S.Wrapper>
        <TotalCheckbox
          cartLength={cart.length}
          checkedItemsCount={checkedItems.length}
          handleCheckAllItems={handleCheckAllItems}
          clickRemoveButton={handleRemoveCheckedItem}
        />
        <S.ContentWrapper>
          {itemList}
          <PriceWrapper totalPrice={totalPrice} />
        </S.ContentWrapper>
      </S.Wrapper>
    </>
  );
};

export default CartList;
