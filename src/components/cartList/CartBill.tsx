import { useRecoilValue, useSetRecoilState } from 'recoil';
import * as S from './styles/CartBill.styles';
import { serverNameState } from '../../atom/serverName';
import { loginState } from '../../atom/login';
import { couponState } from '../../atom/coupon';
import { useGetCartList } from '../hooks/useGetCartList';
import { usePostPurchaseItem } from '../hooks/usePostPurchaseItem';

export default function CartBill() {
  const { getCartsThroughApi } = useGetCartList();
  const {
    postPurchaseItemThroughApi,
    setSelectedCoupon,
    couponDiscountPrice,
    deliveryFee,
    cartBillTotalPrice,
    coupons,
  } = usePostPurchaseItem();
  const serverName = useRecoilValue(serverNameState);
  const loginCredential = useRecoilValue(loginState);
  const setCoupons = useSetRecoilState(couponState);

  const handleSubmitPurchaseCartItems = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const couponKind = formData.get('couponKind');

    await postPurchaseItemThroughApi(serverName, loginCredential, couponKind);
    setCoupons(coupons.filter((coupon) => coupon.id !== Number(couponKind)));
    getCartsThroughApi(serverName, loginCredential, true);
  };

  const handleCouponSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCoupon(Number(e.target.value));
  };

  return (
    <S.Wrapper onSubmit={handleSubmitPurchaseCartItems}>
      <S.TitleBox>결제예상금액</S.TitleBox>
      <S.CouponBox>
        <S.BillRow>
          <p>쿠폰</p>
          <select name="couponKind" onChange={handleCouponSelected}>
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
        <S.CouponBillRow>
          <p>쿠폰 할인 금액</p>
          <p>{couponDiscountPrice.toLocaleString()}원</p>
        </S.CouponBillRow>
        <S.BillRow>
          <p>총 주문금액</p>
          <p>{(cartBillTotalPrice + deliveryFee - couponDiscountPrice).toLocaleString()}원</p>
        </S.BillRow>
        <S.OrderButton>주문하기</S.OrderButton>
      </S.BillBox>
    </S.Wrapper>
  );
}
