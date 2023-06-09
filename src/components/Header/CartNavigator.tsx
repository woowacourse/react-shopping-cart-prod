import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { ROUTE_PATH } from '../../constants';
import { useGoToAnotherPage } from '../../hooks/useGoToAnotherPage';
import { cartBadgeSelector } from '../../recoil';

const CartNavigator = () => {
  const goToPage = useGoToAnotherPage();

  const cartBadgeAmount = useRecoilValue(cartBadgeSelector);

  return (
    <Item>
      <StyledButton onClick={() => goToPage(ROUTE_PATH.CART_PAGE)}>장바구니</StyledButton>
      <Badge role="status" aria-label="장바구니에 담긴 상품 종류의 수">
        {cartBadgeAmount}
      </Badge>
    </Item>
  );
};

const Item = styled.li`
  display: flex;
  align-items: center;
`;

const StyledButton = styled.button`
  padding: 0;
  margin-right: 8px;
  font-size: 18px;
  font-weight: 500;
  background: none;
  color: #fff;
  cursor: pointer;
`;

const Badge = styled.span`
  width: 24px;
  height: 24px;
  background: var(--highlight-color);
  border-radius: 50%;
  font-size: 13px;
  font-weight: 400;
  text-align: center;
  line-height: 24px;
  color: #fff;
`;

export default CartNavigator;
