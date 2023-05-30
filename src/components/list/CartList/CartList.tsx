import styled from '@emotion/styled';
import CartItem from '../../box/CartItem/CartItem';
import CheckBox from '../../common/CheckBox/CheckBox';
import Button from '../../common/Button/Button';
import { Text } from '../../common/Text/Text';
import { useConfirmModal } from '../../../hooks/useConfirmModal';
import { useCartFetch } from '../../../hooks/useCartFetch';
import { useRecoilState } from 'recoil';
import { checkCartListState } from '../../../service/atom';

const CartList = () => {
  const { cartData, deleteCartItemAPI } = useCartFetch();
  const [checkCartList, setCheckCartList] = useRecoilState(checkCartListState);

  const { openModal } = useConfirmModal();

  const deleteSelectCart = async () => {
    checkCartList.forEach((cartId) => {
      deleteCartItemAPI(cartId);
    });
    setCheckCartList([]);
  };

  const onClickCheckBox = () => {
    if (cartData && cartData.length === checkCartList.length) {
      setCheckCartList([]);
      return;
    }
    cartData && setCheckCartList(cartData.map((cart) => cart.id));
  };

  return (
    <CartListWrapper>
      <CartListHead>
        <Text size="small" weight="light">
          든든배송 상품 ({cartData?.length}개)
        </Text>
        <CartListFoot>
          <CheckBox
            label={`전체선택(${checkCartList.length})`}
            checked={cartData ? cartData.length === checkCartList.length : false}
            onClick={onClickCheckBox}
          />
          <Button
            size="small"
            text="선택삭제"
            onClick={() => openModal({ callback: deleteSelectCart })}
          />
        </CartListFoot>
      </CartListHead>
      <Cart>
        {cartData?.map((cart) => (
          <CartItem key={cart.id} cart={cart} />
        ))}
      </Cart>
    </CartListWrapper>
  );
};

export default CartList;

const CartListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CartListHead = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  z-index: 30;
  align-items: center;
  width: 100%;
  top: 70px;
  border-bottom: 3px solid #aaa;
  padding: 80px 0 20px 0;
  background-color: #fff;
`;

const Cart = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const CartListFoot = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
