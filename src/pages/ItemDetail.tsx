import Button from 'components/common/Button';
import CroppedImage from 'components/common/CroppedImage';
import Loading from 'components/common/Loading';
import RequestFail from 'components/common/RequestFail';
import Snackbar from 'components/common/Snackbar';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import useSnackBar, { MESSAGE } from 'hooks/useSnackBar';
import useThunkFetch from 'hooks/useThunkFetch';
import { useNavigate, useParams } from 'react-router-dom';
import { CartListAction } from 'redux/cartList/action';
import { getCartListRequest, postCartItemRequest, putCartItemRequest } from 'redux/cartList/thunk';
import { getItemRequest } from 'redux/item/thunk';
import { PATH } from 'Routers';
import styled from 'styled-components';
import theme from 'styles/theme';

const ItemDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch<CartListAction>();
  const navigate = useNavigate();
  const { isOpenSnackbar, openSnackbar } = useSnackBar();
  const {
    data: item,
    loading,
    error: error_itemList,
  } = useThunkFetch(state => state.item, getItemRequest(id));
  const { data: cartList, error: error_cartList } = useAppSelector(state => state.cartList);

  const isInCart = cartList?.some(cartItem => cartItem.productId === item?.id);

  const postCart = () => {
    const accessToken = localStorage.getItem('access-token');

    if (!accessToken) {
      if (window.confirm('로그인이 필요한 서비스입니다. 로그인 창으로 가시겠어요?')) {
        navigate(PATH.login);
      }

      return;
    }
    if (cartList.length === 0) {
      dispatch(getCartListRequest());
    }
    dispatch(postCartItemRequest(Number(id)));
    openSnackbar();
  };

  const updateCart = () => {
    const targetItem = cartList.find(cartItem => cartItem.productId === Number(id));

    dispatch(putCartItemRequest(targetItem.id, targetItem.quantity + 1));
    openSnackbar();
  };

  if (loading) return <Loading />;
  if (error_itemList || error_cartList) return <RequestFail />;

  const { imageUrl, name, price } = item;

  return (
    <StyledRoot>
      <CroppedImage src={imageUrl} width='570px' height='570px' alt='상품' />
      <StyledTitle>{name}</StyledTitle>
      <StyledPrice>
        <StyledPriceDescription>금액</StyledPriceDescription>
        <StyledPriceValue>{price.toLocaleString()}</StyledPriceValue>
      </StyledPrice>
      <Button
        width='63.8rem'
        height='9.8rem'
        fontSize='3.2rem'
        backgroundColor={theme.colors.brown}
        color='white'
        onClick={isInCart ? updateCart : postCart}
      >
        장바구니
      </Button>
      {isOpenSnackbar && <Snackbar message={MESSAGE.cart} />}
    </StyledRoot>
  );
};

export default ItemDetail;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  width: 64rem;
`;

const StyledTitle = styled.div`
  font-weight: 700;
  font-size: 3.2rem;
  width: 100%;
  padding: 0 3.5rem;
  margin-top: 2.1rem;
  margin-bottom: 3.3rem;
`;

const StyledPrice = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: solid 0.4rem ${({ theme }) => theme.colors.GRAY_aaa};
  width: 100%;
  padding: 0 3.5rem;
  padding-top: 3.3rem;
  margin-bottom: 5.7rem;
`;

const StyledPriceDescription = styled.span`
  font-weight: 400;
  font-size: 2.4rem;
`;

const StyledPriceValue = styled.span`
  font-weight: 400;
  font-size: 3.2rem;
`;
