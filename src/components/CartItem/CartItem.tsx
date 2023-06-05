import { useMutation } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

import { TrashCan } from '../../assets';
import { tokenized } from '../../constants';
import { cartListState, cartProductQuantityState } from '../../store/cart';
import { originState } from '../../store/origin';
import { ProductItemType } from '../../types';
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
  const pdQuanitiy = useRecoilValue(cartProductQuantityState(product.id));
  const origin = useRecoilValue(originState);

  const mutation = useMutation({
    mutationFn: async (data: { quantity: number }) => {
      await fetch(`${origin}cart-items/${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': `application/json`,
          Authorization: `Basic ${tokenized}`,
        },
      });
    },

    onSuccess: (data, variable) => {
      setCartList(
        cartList.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              quantity: variable.quantity,
            };
          }
          return item;
        })
      );
    },
  });

  const updateCartItemQuantity = (quantity: number) => {
    mutation.mutate({ quantity });
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
          <StepperButton count={pdQuanitiy} itemId={itemId} updateCount={updateCartItemQuantity} />
          <div className={styles.resultPrice}>{priceFormatter(product.price * quantity)}원</div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
