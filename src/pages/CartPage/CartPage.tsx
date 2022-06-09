import * as S from 'pages/CartPage/CartPage.styled';
import useCart from 'pages/CartPage/useCart';

import Button from 'components/Button/Button';
import CartItem from 'components/CartItem/CartItem';
import Checkbox from 'components/Checkbox/Checkbox';
import DivideLine from 'components/DivideLine/DivideLine';
import Spinner from 'components/Spinner/Spinner';

function CartPage() {
  const {
    isLoading,
    error,
    cart,
    checkedFlags,
    totalPrice,
    handleChangeQuantity,
    handleCheck,
    handleCheckAll,
    removeCartItem,
    removeAllCartItem,
  } = useCart();

  if (error) {
    alert(error);
  }

  if (isLoading) {
    return <Spinner />;
  }

  const isAllChecked =
    Object.values(checkedFlags).length !== 0 &&
    Object.values(checkedFlags).every((checked) => checked);

  return (
    <S.PageBox>
      <S.Title>장바구니</S.Title>
      <DivideLine />
      <S.SectionsBox>
        <S.LeftSection>
          <S.ControlBox>
            <S.SelectAllBox>
              <Checkbox
                id="select-all-checkbox"
                name="select-all-checkbox"
                checked={isAllChecked}
                onChange={handleCheckAll}
              />
              <label htmlFor="select-all-checkbox">선택해제</label>
            </S.SelectAllBox>
            <S.RemoveSelectedButtonBox onClick={removeAllCartItem}>
              상품삭제
            </S.RemoveSelectedButtonBox>
          </S.ControlBox>
          <S.Subtitle>든든배송 상품 ({cart.length}개)</S.Subtitle>
          <DivideLine color="gray" />
          <ul>
            {cart.map(({ product, quantity, cartItemId }) => (
              <li key={product.id}>
                <CartItem
                  product={product}
                  quantity={quantity}
                  checked={checkedFlags[cartItemId]}
                  onChangeQuantity={handleChangeQuantity(product.id)}
                  onCheck={handleCheck(cartItemId)}
                  onClickRemove={removeCartItem(cartItemId)}
                />
                <DivideLine thickness="thin" />
              </li>
            ))}
          </ul>
        </S.LeftSection>
        <S.RightSection>
          <S.RightSectionTopBox>
            <S.Subtitle>결제예상금액</S.Subtitle>
          </S.RightSectionTopBox>
          <DivideLine thickness="thin" />
          <S.TotalPriceBox>
            <S.HighlightedText>결제예상금액</S.HighlightedText>
            <S.HighlightedText>
              {totalPrice.toLocaleString('ko-KR')}원
            </S.HighlightedText>
          </S.TotalPriceBox>
          <S.OrderButtonBox>
            <Button>
              주문하기 (
              {Object.values(checkedFlags).filter((checked) => checked).length}
              개)
            </Button>
          </S.OrderButtonBox>
        </S.RightSection>
      </S.SectionsBox>
    </S.PageBox>
  );
}

export default CartPage;
