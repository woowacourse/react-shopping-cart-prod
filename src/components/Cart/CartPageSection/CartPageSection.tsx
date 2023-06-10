import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import BlankImage from '../../../assets/tung.svg';
import { MAIN_PAGE_LOCATE } from '../../../constants';
import useCartList from '../../../hooks/useCartList';
import useCoupon from '../../../hooks/useCoupon';
import { useModal } from '../../../hooks/useModal';
import { cartListState } from '../../../store/cart';
import { CartItemType } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import OrderAddition from '../../Order/OrderAddition/OrderAddition';
import Checkbox from '../../utils/Checkbox/Checkbox';
import Modal from '../../utils/Modal/Modal';
import CartItem from '../CartItem/CartItem';
import styles from './style.module.css';

const CartPageSection = () => {
  const {
    fetchCartList,
    removeCheckedItems,
    removeSelectedItem,
    getCheckedList,
    resetCartCheckStatusToTrue,
    resetCartCheckStatusToFalse,
    reverseCheckCartItem,
    getCartItemSum,
  } = useCartList();

  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();
  const { resetCheckedCoupon } = useCoupon();
  const navigate = useNavigate();

  const cartItem = useRecoilValue(cartListState);
  useQuery<CartItemType[]>('cartItemData', fetchCartList);

  const handleCheckedItemRemove = () => {
    removeCheckedItems();
  };

  const handleSelectedItemRemove = (itemId: number) => {
    removeSelectedItem(itemId);
  };

  const navigateToMainPage = useCallback(() => {
    navigate(MAIN_PAGE_LOCATE);
  }, [navigate]);

  const checkedItemLength = getCheckedList().length;
  const deliveryPrice = cartItem.length === 0 ? 0 : 3000;

  return (
    <>
      <div className={styles.cartLstHeader}>장바구니</div>
      <hr />
      <div className={styles.cartListSection}>
        <div className={styles.deleteBox}>
          <Checkbox
            checked={checkedItemLength === cartItem.length}
            clickEvent={
              checkedItemLength === cartItem.length
                ? resetCartCheckStatusToFalse
                : resetCartCheckStatusToTrue
            }
          />
          <p>
            전체 선택({getCheckedList().length}/{cartItem?.length})
          </p>
          <button type="button" className={styles.deleteButton} onClick={handleCheckedItemRemove}>
            선택 삭제
          </button>
        </div>
        <section className={styles.section}>
          <div className={styles.cartList}>
            {cartItem.length ? (
              cartItem.map((item) => (
                <CartItem
                  quantity={item.quantity}
                  itemId={item.id}
                  key={item.id}
                  product={item.product}
                  isChecked={item.isChecked}
                  checkHandler={reverseCheckCartItem}
                  removeItem={handleSelectedItemRemove}
                />
              ))
            ) : (
              <div className={styles.orderBoxBlank}>
                <img src={BlankImage} alt="텅" className={styles.blankBox} />
                <p className={styles.blankText}>장바구니가 비었어요!</p>
                <button
                  type="button"
                  className={styles.mainPageButton}
                  onClick={navigateToMainPage}
                >
                  메인페이지로 돌아가기
                </button>
              </div>
            )}
          </div>
          <div className={styles.orderBox}>
            <div className={styles.orderBoxHeader}>결제예상금액</div>

            <div className={styles.orderPrice}>
              <div>
                <div className={styles.resultText}>
                  <div>총 상품가격</div>
                  <div>{priceFormatter(getCartItemSum())}원</div>
                </div>
                <div className={styles.resultText}>
                  <div>총 배송비</div>
                  <div>{priceFormatter(deliveryPrice)}원</div>
                </div>
              </div>
              <div>
                <div className={styles.resultPrice}>
                  <div>총 주문금액</div>
                  <div>{priceFormatter(getCartItemSum() + deliveryPrice)}원</div>
                </div>
                <button
                  className={
                    checkedItemLength > 0 ? styles.orderButton : styles.orderButtonDisabled
                  }
                  type="button"
                  disabled={checkedItemLength === 0}
                  onClick={handleModalOpen}
                >
                  {checkedItemLength > 0
                    ? `총 ${checkedItemLength}개 상품 주문하기`
                    : '상품을 선택해주세요'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      {isModalOpen && (
        <Modal
          closeModalByClick={() => {
            handleModalClose();
            resetCheckedCoupon();
          }}
        >
          <OrderAddition />
        </Modal>
      )}
    </>
  );
};

export default CartPageSection;
