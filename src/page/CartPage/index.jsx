// @ts-nocheck
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useGetCartAPI from 'hooks/useGetCartAPI';
import useDeleteCheckedProductsAPI from 'page/CartPage/useDeleteProductsAPI';
import useOrderAPI from 'page/CartPage/useOrdersAPI';
import useTotalPrice from 'hooks/useTotalPrice';

import { Image, CartProductItem, CheckBox, TotalPrice } from 'components';
import empty from 'assets/empty.jpeg';
import Styled from 'page/CartPage/index.style';
import { doAddProductToOrder, doInitializeOrder } from 'reducers/cart.reducer';

const CartPage = () => {
  const { shoppingCart, order } = useSelector(state => state.cartReducer);
  const productIdsInCart = shoppingCart.map(product => product.productId);
  const productIdsToDelete = productIdsInCart.filter(id => order.includes(id));

  const dispatch = useDispatch();
  const { orderCart } = useOrderAPI();
  const { deleteCheckedProducts } = useDeleteCheckedProductsAPI(productIdsToDelete);
  const { totalPrice } = useTotalPrice();
  const { getCart, isCartLoading } = useGetCartAPI();

  useEffect(() => {
    getCart();
  }, [getCart]);

  const handleCheckboxClick = () => {
    if (shoppingCart.length === order.length) {
      dispatch(doInitializeOrder());
      return;
    }

    shoppingCart.forEach(product => {
      if (!order.some(id => id === product.productId)) {
        dispatch(doAddProductToOrder({ id: product.productId }));
      }
    });
  };

  return (
    <Styled.Container>
      {!isCartLoading ? (
        <>
          <Styled.Title>장바구니</Styled.Title>
          <Styled.Division />

          <Styled.OrderSheet>
            <Styled.LeftSide>
              <Styled.SelectController>
                <Styled.CheckBoxContainer>
                  <CheckBox
                    checked={shoppingCart.length === order.length}
                    handleChange={handleCheckboxClick}
                  />
                  선택해제
                </Styled.CheckBoxContainer>
                <Styled.ProductDeleteButton onClick={deleteCheckedProducts}>
                  상품삭제
                </Styled.ProductDeleteButton>
              </Styled.SelectController>

              <Styled.ProductListTitle>
                든든배송 상품 ({shoppingCart.length}개)
              </Styled.ProductListTitle>
              <Styled.ProductList>
                {shoppingCart.map(({ productId, name, price, image, quantity }) => {
                  return (
                    <CartProductItem
                      key={productId}
                      productId={productId}
                      name={name}
                      price={price}
                      image={image}
                      quantity={quantity}
                    />
                  );
                })}
              </Styled.ProductList>
            </Styled.LeftSide>

            <Styled.RightSide>
              <TotalPrice
                title="결제예상금액"
                price={totalPrice}
                actionType={`주문하기(${order.length}개)`}
                action={() => orderCart(order)}
              />
            </Styled.RightSide>
          </Styled.OrderSheet>
        </>
      ) : (
        <Styled.Empty>
          <Image src={empty} alt="empty" size="500px" />
          장바구니가 비어있어요.
        </Styled.Empty>
      )}
    </Styled.Container>
  );
};

export default CartPage;
