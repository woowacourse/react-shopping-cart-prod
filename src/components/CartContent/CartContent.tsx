import { CART_MESSAGE } from 'constants/message';
import CartItem from 'components/CartItem/CartItem';
import { Cart } from 'types';
import CheckBox from 'components/@shared/CheckBox';
import { cartActions } from 'redux/actions';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

type Props = {
  cartItems: Cart[];
};

function CartContent({ cartItems }: Props) {
  const dispatch = useDispatch();

  const calculateTotalMoney = () => {
    return cartItems.reduce((prevMoney, item) => {
      const { quantity, product } = item;

      return prevMoney + product.price * quantity;
    }, 0);
  };

  const isAllChecked = () => {
    // return cartItems.every((item) => item.checked === true);
    return true;
  };

  const onChangeAllChecked = (
    e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLElement>
  ) => {
    e.preventDefault();

    // ToDo: 모든 체크 해제
    // dispatch(cartActions.toggleCheckAllProduct(!isAllChecked()));
  };

  const onClickCheckedDeleteButton = () => {
    if (window.confirm(CART_MESSAGE.ASK_DELETE)) {
      // ToDo: 체크된 상품 삭제
      // dispatch(cartActions.deleteCheckedToCart());
    }
  };

  return (
    <StyledContentBox>
      <StyledProductContainer>
        <StyledProductOptions>
          <StyledAllCheckOption>
            <CheckBox
              id="all-check"
              checked={isAllChecked()}
              onChange={onChangeAllChecked}
            />
            <p>전체 선택/해제</p>
          </StyledAllCheckOption>
          <StyledDeleteButton
            type="button"
            onClick={onClickCheckedDeleteButton}
          >
            선택 상품 삭제
          </StyledDeleteButton>
        </StyledProductOptions>
        {cartItems.map(({ id, quantity, product }) => (
          <CartItem
            product={product}
            stock={quantity}
            checked={true}
            cartId={id}
            key={product.id}
          />
        ))}
      </StyledProductContainer>
      <StyledTotalContainer>
        <h3>결제예상금액</h3>
        <hr />
        <StyledTotalMoney>
          {calculateTotalMoney().toLocaleString('ko-KR')} 원
        </StyledTotalMoney>
        <StyledOrderButton type="button">주문하기</StyledOrderButton>
      </StyledTotalContainer>
    </StyledContentBox>
  );
}

const StyledContentBox = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 80px;

  width: 100%;
  margin-top: 30px;
`;

const StyledProductContainer = styled.div`
  grid-column: 1 / 5;
`;

const StyledProductOptions = styled.div`
  display: flex;
  justify-content: space-between;

  height: 30px;
  margin-bottom: 20px;
`;

const StyledAllCheckOption = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;

  font-size: 15px;
`;

const StyledDeleteButton = styled.button`
  width: 100px;
  border: 1px solid ${({ theme: { colors } }) => colors.lightGray};

  background: ${({ theme: { colors } }) => colors.white};
`;

const StyledTotalContainer = styled.div`
  grid-column: 5 / 7;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 100px;

  height: fit-content;
  padding: 0 20px 20px;
  border: 1px solid ${({ theme: { colors } }) => colors.lightGray};

  background: ${({ theme: { colors } }) => colors.white};

  h3 {
    line-height: 50px;
  }

  hr {
    width: calc(100% + 40px);
    margin: 0 -20px;
  }
`;

const StyledTotalMoney = styled.div`
  line-height: 5px;
  border-bottom: 10px solid ${({ theme: { colors } }) => colors.pink};
  margin: 30px 0;
`;

const StyledOrderButton = styled.button`
  width: 80%;
  height: 40px;
  border-radius: 2px;

  background: ${({ theme: { colors } }) => colors.redPink};
  color: ${({ theme: { colors } }) => colors.white};
`;

export default CartContent;
