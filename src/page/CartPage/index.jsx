// @ts-nocheck
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSnackbar from 'hooks/useSnackbar';
import useCart from 'hooks/domain/useCart';
import useOrder from 'hooks/domain/useOrder';

import { Image, CartProductItem, CheckBox, TotalPrice } from 'components';

import { doAddProdcutToOrder, doInitializeOrder } from 'modules/cart';
import { PATHNAME, MESSAGE, SNACKBAR } from 'utils/constants';
import empty from 'assets/empty.jpeg';
import Styled from './index.style';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shoppingCart, deleteProductsInOrder } = useCart();
  const { order, totalPrice, postOrder } = useOrder();
  const { renderSnackbar } = useSnackbar();

  const handleCheckboxClick = () => {
    if (shoppingCart.length === order.length) {
      dispatch(doInitializeOrder());
      return;
    }

    shoppingCart.forEach(product => {
      // TODO: reducer로 빼도 될 듯. cart랑 order동기화 시키면 됨
      if (!order.some(productId => productId === product.productId)) {
        dispatch(doAddProdcutToOrder({ id: product.productId }));
      }
    });
  };

  const deleteSelectedItems = () => {
    deleteProductsInOrder(renderSnackbar(MESSAGE.REMOVE_CART_SUCCESS, SNACKBAR.SUCCESS));
  };

  const handleOrderButtonClick = () => {
    if (order.length <= 0) return;

    postOrder(id => {
      navigate(`${PATHNAME.TO_PAY}/${id}`);
    });
  };

  return (
    <Styled.Container>
      {shoppingCart.length > 0 ? (
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
                <Styled.ProductDeleteButton onClick={deleteSelectedItems}>
                  상품삭제
                </Styled.ProductDeleteButton>
              </Styled.SelectController>

              <Styled.ProductListTitle>
                든든배송 상품 ({shoppingCart.length}개)
              </Styled.ProductListTitle>
              <Styled.ProductList>
                {shoppingCart.map(({ productId, name, price, image, quantity }) => (
                  <CartProductItem
                    key={productId}
                    id={productId}
                    name={name}
                    price={price}
                    image={image}
                    quantity={quantity}
                  />
                ))}
              </Styled.ProductList>
            </Styled.LeftSide>

            <Styled.RightSide>
              <TotalPrice
                title="결제예상금액"
                price={totalPrice}
                actionType={`주문하기(${order.length}개)`}
                action={handleOrderButtonClick}
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
