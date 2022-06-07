import { useState } from 'react';

import cartAPI from 'apis/cart';
import Button from 'components/@shared/Button';
import CheckBox from 'components/@shared/CheckBox';
import CartItem from 'components/CartItem/CartItem';
import styled from 'styled-components';
import { Cart } from 'types/index';
import { getAccessToken } from 'utils/auth';

import { CART_MESSAGE } from 'constants/message';

type Props = {
  cartItems: Array<Cart>;
};

function CartContent({ cartItems }: Props) {
  const [checkedItems, setCheckedItems] = useState<Array<Cart['id']>>([]);

  const calculateTotalMoney = () => {
    return cartItems.reduce((prevMoney, item) => {
      if (!checkedItems.includes(item.id)) return prevMoney;

      const { product, quantity } = item;

      return prevMoney + product.price * quantity;
    }, 0);
  };

  const isAllChecked = () => {
    return cartItems.length === checkedItems.length;
  };

  const onChangeAllChecked = (
    e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLElement>
  ) => {
    e.preventDefault();

    if (isAllChecked()) {
      setCheckedItems([]);

      return;
    }

    setCheckedItems(cartItems.map(item => item.id));
  };

  const onChangeChecked = (
    e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLElement>
  ) => {
    e.preventDefault();

    const id = Number(
      (e.currentTarget as HTMLLabelElement).getAttribute('for')
    );

    if (checkedItems.includes(id)) {
      setCheckedItems(prevState => prevState.filter(cartId => cartId !== id));

      return;
    }

    setCheckedItems(prevState => [...prevState, id]);
  };

  const onClickCheckedDeleteButton = () => {
    if (window.confirm(CART_MESSAGE.ASK_DELETE)) {
      checkedItems.forEach(cartId => {
        const accessToken = getAccessToken();

        if (!accessToken) return;

        cartAPI.delete(accessToken, String(cartId)).catch(error => {
          alert(CART_MESSAGE.FAIL_DELETE);
        });
      });
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
        {cartItems.map(({ product, quantity }) => (
          <CartItem
            product={product}
            quantity={quantity}
            checked={checkedItems.includes(product.id)}
            setChecked={onChangeChecked}
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
        <Button type="button" size="small">
          주문하기
        </Button>
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

export default CartContent;
