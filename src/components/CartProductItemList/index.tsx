/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState, useRecoilValue } from 'recoil';
import useCart from '../../hooks/useCart';
import { $CheckedCartIdList, $CurrentServerUrl } from '../../recoil/atom';
import CartProductItem from '../CartProductItem';
import styles from './index.module.scss';
import type { CartItem } from '../../types';

function CartProductItemList() {
  const currentServerUrl = useRecoilValue($CurrentServerUrl);
  const [checkedCartIdList, setCheckedCartIdList] = useRecoilState($CheckedCartIdList(currentServerUrl));
  const { cartList, deleteCartItem, mutateQuantity } = useCart();

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
    setCheckedCartIdList(cartList.map(item => item.id));
  };

  return (
    <div className={styles.container}>
      <div className={styles['check-menu']}>
        <div>
          <input
            type="checkbox"
            className={styles['check-box']}
            onChange={checkAllCartItem}
            checked={cartList.length === checkedCartIdList.length}
          />
          <div>모두선택 ({`${checkedCartIdList.length}/${cartList.length}`})</div>
        </div>
        <button type="button" onClick={deleteCheckedCartItem}>
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
    </div>
  );
}

export default CartProductItemList;
