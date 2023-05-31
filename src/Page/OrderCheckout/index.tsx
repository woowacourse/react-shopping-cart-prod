import { useRecoilValue } from 'recoil';
import usePaymentsData from '../../hooks/usePaymentsData';
import { $CurrentServerUrl } from '../../recoil/atom';

/* eslint-disable jsx-a11y/label-has-associated-control */
function OrderCheckout() {
  const currentServerUrl = useRecoilValue($CurrentServerUrl);
  const paymentsData = usePaymentsData(currentServerUrl);

  return (
    <main>
      <h2>주문/결제</h2>
      <section>
        <div>
          <h3>배송지</h3>
          <button type="button">변경</button>
          <div>
            <span>김민재</span>
            <span>기본배송지</span>
          </div>
          <input />
        </div>
        <div>
          <h3>
            주문상품 <span>3건</span>
          </h3>
          <div>asdas</div>
        </div>
      </section>
      <div>
        <section>
          <h3>결제금액</h3>
          <div>
            <span>총 상품 금액</span>
            <span>{paymentsData?.discountedPrice.toLocaleString()}원</span>
          </div>
          <div>
            <span>배송비</span>
            <span>{paymentsData?.deliveryFee.toLocaleString()}원</span>
          </div>
          <div>
            <span>쿠폰 사용</span>
            <span>0원</span>
          </div>
          <div>
            <span>포인트 사용</span>
            <span>0원</span>
          </div>
          <div>
            <span>최종 결제 금액</span>
            <span>{paymentsData?.finalPrice.toLocaleString()}원</span>
          </div>
          <div>
            <div>
              <input type="checkbox" />
              <span>아래 내용에 모두 동의합니다.</span>
            </div>
            <div>
              <input type="checkbox" />
              <span>[필수] 구매할 상품의 결제정보(상품명, 상품가격)를 확인하였으며, 구매진행에 동의합니다.</span>
            </div>
            <div>
              <input type="checkbox" />
              <span>[필수] 개인정보 수집 이용 및 제 3자 제공 동의</span>
            </div>
          </div>
        </section>
        <button type="button">{paymentsData?.finalPrice.toLocaleString()}원 결제하기</button>
      </div>
    </main>
  );
}

export default OrderCheckout;
