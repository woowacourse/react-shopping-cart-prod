import { styled } from 'styled-components';
import CartListItem from '../../cart/CartListItem/CartListItem';
import Spacer from '../../common/Spacer/Spacer';
import CartTotal from '../../cart/CartTotal/CartTotal';
import Checkbox from '../../common/Checkbox/Checkbox';
import useCartPage from './useCartPage';
import empty from '../../../assets/image/empty.png';
import { ResetButton } from '../../common/ErrorFallback/ErrorFallback';
import { useNavigate } from 'react-router-dom';
import colors from '../../../colors';

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    checkedItemIds,
    isAllChecked,
    handleCheckboxChange,
    handleAllCheckboxChange,
    handleSelectedItemDelete,
  } = useCartPage();

  return (
    <Container>
      <TitleWrapper>
        <Title>장바구니</Title>
      </TitleWrapper>
      <Spacer height={34} />
      <Inner>
        <CartList>
          <AllCheckBoxContainer>
            <Checkbox
              id="all-checkbox"
              checked={isAllChecked}
              onChange={handleAllCheckboxChange}
            />
            <Spacer width={15} />
            <span>
              전체선택 ({checkedItemIds.size} / {cart.length})
            </span>
            <DeleteButton
              disabled={checkedItemIds.size === 0}
              onClick={handleSelectedItemDelete}
            >
              선택삭제
            </DeleteButton>
          </AllCheckBoxContainer>
          {cart.length > 0 ? (
            cart.map((cartItem) => (
              <CartListItem
                key={cartItem.id}
                cartItem={cartItem}
                checked={checkedItemIds.has(cartItem.id)}
                onChangeCheckbox={handleCheckboxChange}
              />
            ))
          ) : (
            <ImageContainer>
              <Image src={empty} alt="텅 빈 장바구니 이미지" />
              <span>장바구니에 담긴 상품이 없어요.</span>
              <HomeButton onClick={() => navigate('/')}>
                상품 담으러 가기
              </HomeButton>
            </ImageContainer>
          )}
          <Spacer height={20} />
        </CartList>
        <TotalWrapper>
          <CartTotal />
        </TotalWrapper>
      </Inner>
    </Container>
  );
};

const Container = styled.div``;

const TitleWrapper = styled.div`
  height: 67px;
  border-bottom: 4px solid ${colors.transparentGold};
`;

const Title = styled.h2`
  font-family: 'Noto Sans KR';
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  letter-spacing: 0.5px;
  color: ${colors.gold};
`;

const CartList = styled.ul`
  width: 735px;

  & > li {
    border-bottom: 1.5px solid ${colors.transparentGold};
  }

  & > li:last-child {
    border: none;
  }

  @media only screen and (max-width: 768px) {
    width: 600px;
  }

  @media only screen and (max-width: 600px) {
    width: 400px;
  }
`;

const Inner = styled.div`
  display: flex;
  column-gap: 104px;

  @media only screen and (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
`;

const AllCheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  border-bottom: 2px solid ${colors.transparentGold};

  & > span {
    font-size: 18px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
`;

const Image = styled.img`
  padding: 30px;
  width: 250px;
`;

const HomeButton = styled(ResetButton)`
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  width: 98px;
  height: 35px;
  margin-left: auto;
  font-family: 'Noto Sans KR';
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  color: ${colors.gold};
  border: 1px solid ${colors.gold};

  &:disabled {
    border-color: ${colors.transparentGold};
    color: ${colors.transparentGold};
  }
`;

const TotalWrapper = styled.div`
  position: relative;
  padding-top: 54px;
`;

export default CartPage;
