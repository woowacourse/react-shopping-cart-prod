import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import CartItem from '../CartItem/CartItem';
import CheckBox from '../../common/CheckBox/CheckBox';
import useCartItemApi from '../../../hooks/api/useCartItemApi';
import { useCheckedCartListValue } from '../../../provider/CheckedListProvider';
import cartState from '../../../globalState/atoms/cartState';

const CartList = () => {
  const { checkedCartList, addAllCheckedItem, deleteAllCheckedItem, isAllChecked } =
    useCheckedCartListValue();
  const { deleteCartItem } = useCartItemApi();
  const [cartList, setCartList] = useRecoilState(cartState);

  const setAllCheckedCartList = () => {
    if (isAllChecked()) {
      deleteAllCheckedItem();
      return;
    }

    addAllCheckedItem();
  };

  const deleteCheckedCartItems = () => {
    if (!window.confirm(`${checkedCartList.length}개의 선택한 품목들을 삭제하시겠습니까?`)) return;

    checkedCartList.forEach((checkedCartItem) => deleteCartItem(checkedCartItem));
    deleteAllCheckedItem();
    setCartList((prevCart) => prevCart.filter(({ id }) => !checkedCartList.includes(id)));
  };

  return (
    <CartListContainer>
      <NumberOfCartItem>배송 상품 ({cartList.length}개)</NumberOfCartItem>
      <ul>
        {cartList.map((cartItem, index) => (
          <li key={cartItem.id}>
            <CartItem cartItem={cartItem} />
            {index !== cartList.length - 1 && <Seperator />}
          </li>
        ))}
      </ul>
      <AllCheckContainer>
        <CheckBox
          isChecked={isAllChecked()}
          labelText={`전체 선택 (${checkedCartList.length}/${cartList.length})`}
          onChange={setAllCheckedCartList}
        />
        {!!checkedCartList.length && (
          <DeleteCheckedListButton onClick={deleteCheckedCartItems}>
            선택 삭제
          </DeleteCheckedListButton>
        )}
      </AllCheckContainer>
    </CartListContainer>
  );
};

const CartListContainer = styled.div`
  width: 736px;

  @media screen and (max-width: 1320px) {
    width: 100%;
  }
`;

const NumberOfCartItem = styled.h3`
  padding: 20px 0;

  border-bottom: 4px solid #aaaaaa;

  font-weight: 400;
  font-size: 20px;
  color: #333;
`;

const Seperator = styled.div`
  border-bottom: 1.5px solid #cccccc;
`;

const AllCheckContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  height: 30px;
`;

const DeleteCheckedListButton = styled.button`
  width: 98px;
  height: 35px;

  background: none;
  border: 1px solid #bbbbbb;

  font-weight: 400;
  font-size: 16px;

  cursor: pointer;
`;

export default CartList;
