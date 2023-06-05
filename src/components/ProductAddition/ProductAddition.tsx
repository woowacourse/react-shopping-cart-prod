import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { tokenized } from '../../constants';
import { cartItemState, cartListState } from '../../store/cart';
import { originState } from '../../store/origin';
import { ProductItemType } from '../../types';
import { priceFormatter } from '../../utils/formatter';
import StepperButton from '../StepperButton/StepperButton';
import styles from './style.module.css';

interface ProductAdditionProps {
  product: ProductItemType;
  closeModalByClick: () => void;
}

type PostDataType = {
  productId: number;
  quantity: number;
};

const ProductAddition = ({ product, closeModalByClick }: ProductAdditionProps) => {
  const [quantity, setQuantity] = useState(1);
  const [cartList, setCartList] = useRecoilState(cartListState);
  const cartItem = useRecoilValue(cartItemState(product.id));
  const origin = useRecoilValue(originState);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: PostDataType) => {
      await fetch(`${origin}cart-items`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Basic ${tokenized}`,
          'Content-Type': `application/json`, // application/json 타입 선언
        },
      });
    },
    onSuccess: (data, variable, context) => {
      if (cartItem) {
        const newCartList = cartList.map((cartItem) => {
          if (cartItem.product.id === variable.productId) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + variable.quantity,
            };
          }
          return cartItem;
        });

        setCartList(newCartList);
        return;
      }

      setCartList([
        ...cartList,
        {
          id: cartList.length + 1,
          quantity: variable.quantity,
          product,
          isChecked: false,
        },
      ]);

      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
    },
  });

  return (
    <div className={styles.container}>
      <h4 className={styles.header}>장바구니 담기</h4>
      <div className={styles.informationContainer}>
        <img src={product.imageUrl} alt={product.name} />
        <div className={styles.informationContainertwo}>
          <div>
            <h4 className={styles.productName}>{product.name}</h4>
            <h4 className={styles.productPrice}>{priceFormatter(product.price)}원</h4>
          </div>
          <StepperButton count={quantity} setCount={setQuantity} />
        </div>
      </div>
      <div className={styles.totalPriceContainer}>
        <h5>합계</h5>
        <h3>{priceFormatter(product.price * quantity)} 원</h3>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.cancelButton}
          aria-label="close modal"
          onClick={closeModalByClick}
        >
          취소
        </button>
        <button
          className={styles.addButton}
          aria-label="add item"
          onClick={() => {
            mutation.mutate({
              productId: product.id,
              quantity: quantity,
            });
          }}
        >
          장바구니 담기
        </button>
      </div>
    </div>
  );
};

export default ProductAddition;
