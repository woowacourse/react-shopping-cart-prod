/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState, useRecoilValue } from 'recoil';
import useCart from 'src/hooks/useCart';
import { $CheckedCartIdList, $CurrentServerUrl } from 'src/recoil/atom';
import CartProductItem from 'src/components/CartProductItem';
import type { CartItem } from 'src/types';
import useModal from 'src/hooks/useModal';
import ModalNotification from '../Common/ModalNotification';
import Modal from '../Common/Modal';
import CheckBox from '../Common/CheckBox';
import styles from './index.module.scss';

function CartProductItemList() {
  const currentServerUrl = useRecoilValue($CurrentServerUrl);
  const [checkedCartIdList, setCheckedCartIdList] = useRecoilState($CheckedCartIdList(currentServerUrl));
  const { cartList, deleteCartItem, mutateQuantity } = useCart();

  const { isModalOpen, openModal, closeModal } = useModal();

  const checkAllCartItem: React.ChangeEventHandler<HTMLInputElement> = ({ target: { checked } }) => {
    if (checked) {
      return setCheckedCartIdList(cartList.map(item => item.id));
    }
    return setCheckedCartIdList([]);
  };

  const checkCartItem =
    (id: number) =>
    ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
      if (!checked) {
        return setCheckedCartIdList(prev => prev.filter(cartId => cartId !== id));
      }
      return setCheckedCartIdList(prev => [...prev, id]);
    };

  const deleteCheckedCartItem = () => {
    Promise.all(checkedCartIdList.map(id => deleteCartItem(id)));
  };

  return (
    <div className={styles.container}>
      <div className={styles['check-menu']}>
        <CheckBox
          changeHandler={checkAllCartItem}
          checked={cartList.length === checkedCartIdList.length}
          size="large"
        />
        <div>전체 선택 ({`${checkedCartIdList.length}/${cartList.length}`})</div>
        <button type="button" onClick={openModal}>
          선택 삭제
        </button>
      </div>
      <section className={styles['cart-container']}>
        {cartList?.map((item: CartItem) => (
          <CartProductItem
            key={item.id}
            cartItem={item}
            toggleCheck={checkCartItem(item.id)}
            checked={checkedCartIdList.includes(item.id)}
            mutateQuantity={mutateQuantity}
            deleteCartItem={deleteCartItem}
          />
        ))}
      </section>
      {isModalOpen && (
        <Modal direction="center" closeEvent={closeModal}>
          <ModalNotification
            message={{
              title: `${checkedCartIdList.length}개의 품목을 삭제하시겠습니까? \n삭제한다면 되돌릴 수 없습니다.`,
            }}
            cancelCallback={closeModal}
            assignCallback={deleteCheckedCartItem}
          />
        </Modal>
      )}
    </div>
  );
}

export default CartProductItemList;
