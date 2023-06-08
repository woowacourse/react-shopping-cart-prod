import * as Styled from './CartPage.styles.tsx';
import CartSelectList from '../../components/CartPageComponents/CartSelectList/CartSelectList.tsx';
import CartPriceBox from '../../components/CartPageComponents/CartPriceBox/CartPriceBox.tsx';
import { MainPageText, MainTextBorder } from '../../styles/CommonStyles.tsx';

const CartPage = () => {
  return (
    <Styled.CartPageContainer>
      <MainPageText>장바구니</MainPageText>
      <MainTextBorder />

      <Styled.CartSelectListContainer>
        <CartSelectList />
        <CartPriceBox />
      </Styled.CartSelectListContainer>
    </Styled.CartPageContainer>
  );
};

export default CartPage;
