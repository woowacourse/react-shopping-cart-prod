import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getCartList } from 'redux/action-creators/cartListThunk';
import { CartListAction } from 'redux/actions/cartList';
import useUpdateCartItem from 'hooks/useUpdateCartItem';
import { useFetch } from 'hooks/useFetch';
import useThunkFetch from 'hooks/useThunkFetch';
import useSnackBar from 'hooks/useSnackBar';
import CroppedImage from 'components/common/CroppedImage';
import Button from 'components/common/Button';
import RequestFail from 'components/common/RequestFail';
import Loading from 'components/common/Loading';
import { LOCAL_BASE_URL } from 'apis';
import type { Item } from 'types/domain';

const ItemDetail = () => {
  const params = useParams();
  const id = Number(params.id);
  const { data: item, loading, error } = useFetch<Item>(`${LOCAL_BASE_URL}/products/${id}`);
  const { data: cartList } = useThunkFetch<CartListAction>(
    state => state.cartListReducer,
    getCartList
  );
  const { updateCartItemQuantity } = useUpdateCartItem(cartList);
  const { openSnackbar } = useSnackBar();

  const onClick = () => {
    updateCartItemQuantity(id);
    openSnackbar({ type: 'cart', value: null });
  };

  if (loading) return <Loading />;
  if (error) return <RequestFail />;

  const { imageUrl, name, price } = item;

  return (
    <StyledRoot>
      <CroppedImage src={imageUrl} width='57rem' height='57rem' alt='상품' />
      <StyledTitle>{name}</StyledTitle>
      <StyldPrice>
        <StyledPriceDescription>금액</StyledPriceDescription>
        <StyledPriceValue>{price}</StyledPriceValue>
      </StyldPrice>
      <Button size='large' backgroundColor='brown' onClick={onClick}>
        장바구니에 담기
      </Button>
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

const StyldPrice = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: solid 0.4rem ${({ theme }) => theme.colors.grey};
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
