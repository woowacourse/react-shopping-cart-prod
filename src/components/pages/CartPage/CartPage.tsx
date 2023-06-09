import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CartListItem from '../../cart/CartListItem/CartListItem';
import Spacer from '../../common/Spacer/Spacer';
import CartTotal from '../../cart/CartTotal/CartTotal';
import Checkbox from '../../common/Checkbox/Checkbox';
import useCartPage from './useCartPage';
import empty from '../../../assets/image/empty.png';
import { ResetButton } from '../../common/ErrorFallback/ErrorFallback';

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    checkedItemIds,
    isAllChecked,
    calcTotalPrice,
    handleCheckboxChange,
    handleAllCheckboxChange,
    handleSelectedItemDelete,
  } = useCartPage();

  return (
    <div>
      <TitleWrapper>
        <Title>장바구니</Title>
      </TitleWrapper>
      <Spacer height={20} />
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
            <CartListContainer>
              {cart.map((cartItem) => (
                <CartListItem
                  key={cartItem.id}
                  cartItem={cartItem}
                  checked={checkedItemIds.has(cartItem.id)}
                  onChangeCheckbox={handleCheckboxChange}
                />
              ))}
            </CartListContainer>
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
          <CartTotal
            selectedCartItemIds={checkedItemIds}
            totalProductPrice={calcTotalPrice()}
          />
        </TotalWrapper>
      </Inner>
    </div>
  );
};

const TitleWrapper = styled.div`
  height: 67px;
`;

const Title = styled.h2`
  font-family: 'Noto Sans KR';
  font-weight: 700;
  font-size: 26px;
  line-height: 37px;
  text-align: center;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.BLACK};
`;

const CartListContainer = styled.div`
  & > li {
    border-bottom: 1.5px solid ${(props) => props.theme.color.GRAY_350};
  }

  & > li:last-child {
    border: none;
  }
`;

const CartList = styled.ul`
  width: 735px;

  @media only screen and (max-width: 768px) {
    width: 600px;
  }

  @media only screen and (max-width: 600px) {
    width: 400px;
  }
`;

const Inner = styled.div`
  display: flex;
  column-gap: 50px;

  @media only screen and (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
`;

const AllCheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid ${(props) => props.theme.color.GRAY_350};

  & > span {
    font-size: ${(props) => props.theme.fontSize.LARGE};
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
`;

const Image = styled.img`
  width: 250px;
`;

const HomeButton = styled(ResetButton)`
  font-size: ${(props) => props.theme.fontSize.MEDIUM};
  font-weight: 600;
  margin-top: 10px;
  background-color: ${(props) => props.theme.color.PRIMARY};
`;

const DeleteButton = styled.button`
  width: 98px;
  height: 35px;
  margin-left: auto;
  font-family: 'Noto Sans KR';
  font-size: ${(props) => props.theme.fontSize.MEDIUM};
  line-height: 21px;
  text-align: center;
  color: ${(props) => props.theme.color.BLACK};
  border: 1px solid ${(props) => props.theme.color.GRAY_350};
  border-radius: 4px;

  &:disabled {
    background-color: ${(props) => props.theme.color.GRAY_100};
    color: ${(props) => props.theme.color.GRAY_350};
  }
`;

const TotalWrapper = styled.div`
  position: relative;
  padding-top: 56px;
`;

export default CartPage;
