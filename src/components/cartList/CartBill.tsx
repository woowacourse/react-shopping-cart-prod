import { useRecoilValue } from 'recoil';
import * as S from './styles/CartBill.styles';
import * as api from '../../api';
import { cartBillTotalPriceState, cartState, checkedListState } from '../../atom/cart';
import { serverNameState } from '../../atom/serverName';
import { loginState } from '../../atom/login';
import { couponState } from '../../atom/coupon';

export default function CartBill() {
  const cart = useRecoilValue(cartState);
  const checkedList = useRecoilValue(checkedListState);
  const cartBillTotalPrice = useRecoilValue(cartBillTotalPriceState);
  const deliveryFee = checkedList.filter((checked) => checked).length === 0 ? 0 : 3000;
  const serverName = useRecoilValue(serverNameState);
  const loginCredential = useRecoilValue(loginState);
  const coupons = useRecoilValue(couponState);

  const handleSubmitPurchaseCartItems = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const couponKind = formData.get('couponKind');

    const purchasingCartItems = checkedList
      .map(
        (checked, idx) =>
          checked && { productId: cart[idx].product.id, quantity: cart[idx].quantity }
      )
      .filter(
        (cartItem): cartItem is { productId: number; quantity: number } =>
          typeof cartItem !== 'boolean'
      );

    const couponId = couponKind !== 'null' ? Number(couponKind) : null;

    api.postPurchaseCartItem(serverName, loginCredential, purchasingCartItems, couponId);
  };

  return (
    <S.Wrapper onSubmit={handleSubmitPurchaseCartItems}>
      <S.TitleBox>결제예상금액</S.TitleBox>
      <S.CouponBox>
        <S.BillRow>
          <p>쿠폰</p>
          <select name="couponKind">
            <option value="null">선택 안함</option>
            {coupons.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </S.BillRow>
      </S.CouponBox>
      <S.BillBox>
        <S.BillRow>
          <p>총 상품가격</p>
          <p>{cartBillTotalPrice.toLocaleString()}원</p>
        </S.BillRow>
        <S.BillRow>
          <p>총 배송비</p>
          <p>{deliveryFee.toLocaleString()}원</p>
        </S.BillRow>
        <S.BillRow>
          <p>총 주문금액</p>
          <p>{(cartBillTotalPrice + deliveryFee).toLocaleString()}원</p>
        </S.BillRow>
        <S.OrderButton>주문하기</S.OrderButton>
      </S.BillBox>
    </S.Wrapper>
  );
}
