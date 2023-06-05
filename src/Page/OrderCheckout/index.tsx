import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import OrderSuccessModal from '../../components/OrderSuccessModal';
import { USER } from '../../constants';
import useMutation from '../../hooks/useMutation';
import usePaymentsData from '../../hooks/usePaymentsData';
import useToast from '../../hooks/useToast';
import { $CartList, $CheckedCartIdList, $CurrentServerUrl } from '../../recoil/atom';
import styles from './index.module.scss';

function OrderCheckout() {
  const currentServerUrl = useRecoilValue($CurrentServerUrl);
  const cartList = useRecoilValue($CartList(currentServerUrl));
  const checkedCartIdList = useRecoilValue($CheckedCartIdList(currentServerUrl));

  const [checkedPolicyList, setCheckedPolicyList] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const paymentsData = usePaymentsData(currentServerUrl);
  const Toast = useToast();

  const { mutateQuery, loading } = useMutation({
    onSuccess: () => {
      setIsModalOpen(true);
    },
    onFailure: () => {
      Toast.error('결제에 실패했습니다...');
    },
  });

  const checkedCartList = cartList.filter(item => checkedCartIdList.includes(item.id));
  const checkedCartProductNameList = checkedCartList.map(cart => cart.product.name);
  const deliveryLocation = '서울특별시 강남구 테헤란로411, 성담빌딩 13층 우아한테크코스';

  const handleCheckPolicy: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const policy = target.value;

    if (target.checked) {
      setCheckedPolicyList(prev => prev.filter(prevPolicy => prevPolicy !== policy));
    }
    setCheckedPolicyList(prev => [...prev, policy]);
  };

  const handleOrder = async () => {
    await mutateQuery({
      url: '/orders',
      method: 'POST',
      bodyData: { cartItemIds: checkedCartIdList },
      headers: { Authorization: `Basic ${btoa(USER)}` },
    });
  };

  return (
    <main className={styles.container}>
      <h2>주문/결제</h2>
      <div className={styles['checkout-main']}>
        <section className={styles['checkout-information']}>
          <div className={styles['checkout-location']}>
            <div className={styles['checkout-location-title']}>
              <h3>배송지</h3>
              <button type="button">변경</button>
            </div>
            <div className={styles['checkout-location-detail']}>
              <div>
                <span>김민재</span>
                <span>기본배송지</span>
              </div>
              <div>{deliveryLocation}</div>
            </div>
          </div>
          <div className={styles['checkout-user-phone']}>
            <span>김민재</span>
            <span>010-1234-5678</span>
          </div>
          <input className={styles['delivery-message']} placeholder="배송 요청사항을 입력해주세요." />
          <div className={styles['coupon-point']}>
            <div className={styles['coupon-point-title']}>
              <span>쿠폰과 포인트</span>
            </div>
            <div>사용 가능한 쿠폰과 포인트가 없어요.</div>
          </div>
          <div className={styles['checkout-order-list']}>
            <h3>
              주문상품 <span>{checkedCartIdList.length}건</span>
            </h3>
            <li className={styles['checkout-product-list']}>
              {checkedCartList?.map(({ id, quantity, product }) => (
                <ul key={id} className={styles['checkout-product']}>
                  <img src={product.imageUrl} alt="제품" />
                  <div>{product.name}</div>
                  <div>
                    {(product.price * quantity).toLocaleString()}원 | {quantity}개
                  </div>
                </ul>
              ))}
            </li>
          </div>
        </section>
        <div className={styles['sticky-view']}>
          <section className={styles['checkout-payment']}>
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
            <strong>
              <span>최종 결제 금액</span>
              <div>
                <span>{paymentsData?.finalPrice.toLocaleString()}</span>
                <span> 원</span>
              </div>
            </strong>
            <li>
              <ul>
                <input
                  type="checkbox"
                  className={styles['check-box']}
                  value="checkout-continue"
                  onChange={handleCheckPolicy}
                />
                <span>[필수] 구매할 상품의 결제정보(상품명, 상품가격)를 확인하였으며, 구매진행에 동의합니다.</span>
              </ul>
              <ul>
                <input
                  type="checkbox"
                  className={styles['check-box']}
                  value="third-agree"
                  onChange={handleCheckPolicy}
                />
                <span>[필수] 개인정보 수집 이용 및 제 3자 제공 동의</span>
                <p>
                  본인은 만 14세 이상이며, 주문 내용을 확인하였습니다. (주)우테코는 통신판매중개자로 거래 당사자가
                  아니므로, 판매자가 등록한 상품정보 및 거래 등에 대해 책임을 지지 않습니다 (단, ㈜우테코가 판매자로
                  등록 판매한 상품은 판매자로서 책임을 부담합니다).
                </p>
              </ul>
            </li>
          </section>
          <button
            type="button"
            className={styles['payments-button']}
            onClick={handleOrder}
            disabled={!loading && checkedPolicyList.length !== 2}
          >
            {loading ? <LoadingSpinner /> : `${paymentsData?.finalPrice.toLocaleString()}원 결제하기`}
          </button>
        </div>
      </div>
      <OrderSuccessModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        orderList={checkedCartProductNameList}
        deliveryLocation={deliveryLocation}
        finalPrice={paymentsData?.finalPrice.toLocaleString()}
      />
    </main>
  );
}

export default OrderCheckout;
