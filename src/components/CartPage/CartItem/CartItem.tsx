import { useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  productCouponsSelector,
  selectedCouponsState,
  selectedCouponState,
} from '../../../atoms/coupon';
import { DELETE_CART_ITEM } from '../../../constants/cart';
import {
  ALL_COUPON_MAP_ID,
  NOT_SELECTED_VALUE,
} from '../../../constants/coupon';
import { useCartSelector, useMutateCart } from '../../../hooks/cart/cart';
import { useRefreshableRecoilValue } from '../../../hooks/common/useRefreshableAtom';
import { CartItem as CartItemType } from '../../../types/cart';
import { SpecificCoupon } from '../../../types/coupon';
import { debounce } from '../../../utils/debounce';
import { getDiscountInfo } from '../../../utils/discount';
import Flex from '../../common/Flex';
import QuantityStepper from '../../common/QuantityStepper/QuantityStepper';
import * as S from './CartItem.styles';

type CartItemProps = CartItemType;

const CartItem: React.FC<CartItemProps> = (props) => {
  const {
    id: cartId,
    quantity,
    product: { id: productId, imageUrl, name, price },
  } = props;

  const selectedCoupon = useRecoilValue(selectedCouponState(cartId));
  const quantityRef = useRef<HTMLInputElement>(null);
  const { selectedItems, selectItem } = useCartSelector();
  const { updateCartItemMutation, deleteCartItemMutation } = useMutateCart();
  const setSelectedCouponsState = useSetRecoilState(selectedCouponsState);

  const productCoupons = useRefreshableRecoilValue(
    productCouponsSelector(productId)
  );

  const discountInfo = selectedCoupon
    ? getDiscountInfo(price, {
        discountType: selectedCoupon.discountType,
        value: selectedCoupon.value,
      })
    : null;

  const itemPrice = (discountInfo?.discountedPrice ?? price).toLocaleString();

  const selectCoupon = (couponId: SpecificCoupon['id']) => {
    const targetCoupon = productCoupons?.find(
      (coupon) => coupon.id === couponId
    );

    setSelectedCouponsState((prevSelectedCoupons) => {
      const updatedSelectedCoupons = new Map(prevSelectedCoupons);

      targetCoupon
        ? updatedSelectedCoupons.set(cartId, targetCoupon)
        : updatedSelectedCoupons.delete(cartId);

      updatedSelectedCoupons.delete(ALL_COUPON_MAP_ID);

      return updatedSelectedCoupons;
    });
  };

  const updateQuantity = debounce(() =>
    updateCartItemMutation({
      cartId,
      quantity: Number(quantityRef.current?.value),
    })
  );

  const deleteCartItem = () => {
    window.confirm(DELETE_CART_ITEM) && deleteCartItemMutation(cartId);
  };

  return (
    <S.Root>
      <Flex grow height="100%" align="center">
        <S.Checkbox
          type="checkbox"
          checked={selectedItems.has(cartId)}
          onChange={() => selectItem(cartId)}
        />
        <S.ProductContainer height="100%" align="center" grow>
          <S.Thumbnail alt={name} src={imageUrl} />
          <S.Name>{name}</S.Name>
          <S.Info dir="column" justify="space-between" align="end">
            <S.DeleteButton onClick={deleteCartItem}>X</S.DeleteButton>
            <select
              defaultValue={NOT_SELECTED_VALUE}
              value={selectedCoupon?.id ?? NOT_SELECTED_VALUE}
              onChange={({ target: { value } }) => selectCoupon(Number(value))}>
              <option value={NOT_SELECTED_VALUE}>선택 없음</option>
              {productCoupons?.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            <QuantityStepper
              max={100}
              min={1}
              ref={quantityRef}
              init={quantity}
              onIncrease={updateQuantity}
              onDecrease={updateQuantity}
            />
            {selectedCoupon && (
              <S.Price>
                {discountInfo?.dcMsg} <del>{price.toLocaleString()} 원</del>
              </S.Price>
            )}
            <S.Price>{itemPrice} 원</S.Price>
          </S.Info>
        </S.ProductContainer>
      </Flex>
    </S.Root>
  );
};

export default CartItem;
