import { selectedCartItemIdsState } from '../../../atoms/cart';
import { useRefreshableRecoilValue } from '../../../hooks/common/useRefreshableAtom';
import CartItemController from '../CartItemController/CartItemController';
import CartItemList from '../CartItemList/CartItemList';
import AllCouponSelectContainer from '../CouponSelect/AllCouponSelectContainer';
import * as S from './CartSection.styles';

const CartSection = () => {
  const selectedItemIds = useRefreshableRecoilValue(selectedCartItemIdsState);

  return (
    <S.Root>
      <S.SelectedCount>
        든든배송 상품 ({selectedItemIds.size}개)
      </S.SelectedCount>
      <CartItemList />
      <CartItemController />
      <AllCouponSelectContainer />
    </S.Root>
  );
};

export default CartSection;
