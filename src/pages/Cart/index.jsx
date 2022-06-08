import * as Styled from './style';
import useCartPage from './hooks';
import CartContainer from 'components/Cart/CartContainer/CartContainer';
import CartItem from 'components/Cart/CartItem/CartItem';
import CartControlBar from 'components/Cart/CartControlBar/CartControlBar';
import Title from 'components/Common/Title/Title';
import PaymentBox from 'components/Cart/PaymentBox/PaymentBox';

import ImgWrapper from 'components/Common/ImgWrapper/ImgWrapper';
import spinner from 'assets/svg/spinner.svg';
import errorApiImg from 'assets/png/errorApiImg.png';
import itemAltImg from 'assets/png/itemAltImg.png';
import { includes } from 'utils';

const Cart = () => {
  const {
    isLoading,
    isError,
    cartItems,
    totalPrice,
    selectedItemList,
    handleToggleSelectAll,
    handleToggleSelect,
    handleDeleteSelectedItem,
  } = useCartPage();

  if (isLoading)
    return (
      <Styled.Wrapper>
        <Title contents="장바구니" />
        <ImgWrapper src={spinner} />
      </Styled.Wrapper>
    );

  if (isError) {
    <Styled.Wrapper>
      <Title contents="장바구니" />
      <ImgWrapper src={errorApiImg} />
    </Styled.Wrapper>;
  }

  return (
    <Styled.Wrapper>
      <Title contents="장바구니" />
      <Styled.MainContentsWrapper>
        <Styled.LeftBox>
          <CartControlBar
            isChecked={
              selectedItemList.length === cartItems?.length &&
              cartItems?.length > 0
            }
            onControlToggleCheck={handleToggleSelectAll(
              selectedItemList.length === cartItems?.length,
            )}
            onControlClickButton={handleDeleteSelectedItem}
          />

          <CartContainer>
            {cartItems &&
              cartItems.map(({ id, name, imageUrl, price, quantity }) => (
                <CartItem
                  key={id}
                  id={id}
                  name={name}
                  imageUrl={imageUrl || itemAltImg}
                  price={price}
                  quantity={quantity}
                  isSelected={includes(selectedItemList, id)}
                  onToggleSelect={handleToggleSelect(id)}
                />
              ))}
          </CartContainer>
        </Styled.LeftBox>
        <Styled.RightBox>
          <PaymentBox quantity={selectedItemList.length} price={totalPrice} />
        </Styled.RightBox>
      </Styled.MainContentsWrapper>
    </Styled.Wrapper>
  );
};

export default Cart;
