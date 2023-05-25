import { useRecoilState, useRecoilValue } from 'recoil';

import { TrashCan } from '../../assets';
import { useFetch } from '../../hooks/useFetch';
import { cartListState } from '../../store/cart';
import { originState } from '../../store/origin';
import { CartItemType, ProductItemType } from '../../types';
import { priceFormatter } from '../../utils/formatter';
import Checkbox from '../Checkbox/Checkbox';
import StepperButton from '../StepperButton/StepperButton';
import styles from './style.module.css';

interface CartItemProps {
  quantity: number;
  product: ProductItemType;
  itemId: number;
  isChecked: boolean;
  checkHandler: (id: number) => void;
  removeItem: (id: number) => void;
}

const CartItem = ({
  quantity,
  product,
  itemId,
  isChecked,
  checkHandler,
  removeItem,
}: CartItemProps) => {
  const [cartList, setCartList] = useRecoilState(cartListState);
  const { fetchApi } = useFetch<ProductItemType[]>(setCartList);
  const origin = useRecoilValue(originState);

  const updateCartItemQuantity = (quantity: number) => {
    fetchApi.patch(`${origin}/cart-items/${itemId}`, { quantity });

    setCartList(
      cartList.map((item: CartItemType) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: quantity,
          };
        }
        return item;
      })
    );
  };

  return (
    <>
      <div className={styles.cartItem}>
        <div className={styles.deleteCheckerBox}>
          <Checkbox
            checked={isChecked}
            clickEvent={() => {
              checkHandler(itemId);
            }}
          />
        </div>
        <img className={styles.cartImage} src={product.imageUrl} alt="고기임" />
        <div className={styles.productName}>
          <p>{product.name}</p>
        </div>
        <div className={styles.itemCountDatas}>
          <TrashCan
            width={16}
            height={16}
            onClick={() => {
              removeItem(itemId);
            }}
          />
          <StepperButton count={quantity} itemId={itemId} updateCount={updateCartItemQuantity} />
          <div className={styles.resultPrice}>{priceFormatter(product.price * quantity)}원</div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
