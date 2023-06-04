import { useMutation } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useCartList } from '../../hooks/useCartList';
import { useModal } from '../../hooks/useModal';
import {
  cartCheckedIdState,
  cartCheckedState,
  cartListState,
  cartTotalAmountState,
} from '../../store/cart';
import { originState } from '../../store/origin';
import { priceFormatter } from '../../utils/formatter';
import CartItem from '../CartItem/CartItem';
import Checkbox from '../Checkbox/Checkbox';
import CouponList from '../CouponList/CouponList';
import Modal from '../Modal/Modal';
import styles from './style.module.css';

const CartPageSection = () => {
  const origin = useRecoilValue(originState);
  const setCartList = useSetRecoilState(cartListState);
  const cartCheckedCount = useRecoilValue(cartCheckedState);
  const cartTotalAmount = useRecoilValue(cartTotalAmountState);
  const cartCheckedId = useRecoilValue(cartCheckedIdState);

  const {
    cartList,
    reverseCheckCartItem,
    resetCartCheckStatusToTrue,
    resetCartCheckStatusToFalse,
  } = useCartList();
  const { isModalOpen, handleModalOpen, handleModalClose, handleModalClosePress } = useModal();
  const mutation = useMutation({
    mutationFn: async (data: { cartItemId: number[] }) => {
      await fetch(`${origin}cart-items`, {
        method: 'DELETE',
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data, variable, context) => {
      const deletedNewCart = cartList.filter(
        (cartItem) => !variable.cartItemId.includes(cartItem.id)
      );
      setCartList(deletedNewCart);
    },
  });

  const handleChoiceProductEvent = () => {
    handleModalOpen();
  };

  const deliveryPrice = cartList?.length === 0 ? 0 : 3000;
  const allChecked = cartCheckedCount === cartList.length;

  return (
    <>
      <div className={styles.cartLstHeader}>장바구니</div>
      <hr />
      <div className={styles.cartListSection}>
        <div className={styles.deleteBox}>
          <Checkbox
            checked={allChecked}
            clickEvent={() => {
              allChecked ? resetCartCheckStatusToFalse() : resetCartCheckStatusToTrue();
            }}
          />
          <p>
            전체 선택({cartList?.length}/{cartCheckedCount})
          </p>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() =>
              mutation.mutate({
                cartItemId: cartCheckedId,
              })
            }
          >
            선택 삭제
          </button>
        </div>
        <section className={styles.section}>
          <div className={styles.cartList}>
            {cartList.map((cartItem) => (
              <CartItem
                quantity={cartItem.quantity}
                itemId={cartItem.id}
                key={cartItem.id}
                product={cartItem.product}
                isChecked={cartItem.isChecked}
                checkHandler={reverseCheckCartItem}
                removeItem={() =>
                  mutation.mutate({
                    cartItemId: [cartItem.id],
                  })
                }
              />
            ))}
          </div>
          <div className={styles.orderBox}>
            <div className={styles.orderBoxHeader}>결제예상금액</div>

            <div className={styles.orderPrice}>
              <div>
                <div className={styles.resultText}>
                  <div>총 상품가격</div>
                  <div>{priceFormatter(cartTotalAmount)}원</div>
                </div>
                <div className={styles.resultText}>
                  <div>총 배송비</div>
                  <div>{priceFormatter(deliveryPrice)}원</div>
                </div>
              </div>
              <div>
                <div className={styles.resultPrice}>
                  <div>총 주문금액</div>
                  <div>{priceFormatter(cartTotalAmount + deliveryPrice)}원</div>
                </div>
                <button
                  className={cartCheckedCount > 0 ? styles.orderButton : styles.orderButtonDisabled}
                  type="button"
                  disabled={cartCheckedCount === 0}
                  onClick={handleChoiceProductEvent}
                >
                  {cartCheckedCount > 0
                    ? `총 ${cartCheckedCount}개 상품 주문하기`
                    : '상품을 선택해주세요'}
                </button>
              </div>
            </div>
          </div>
        </section>
        {isModalOpen && (
          <Modal closeModalByClick={handleModalClose} closeModalByPress={handleModalClosePress}>
            <CouponList type="usable" />
          </Modal>
        )}
      </div>
    </>
  );
};

export default CartPageSection;
