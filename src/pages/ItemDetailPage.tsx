import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getCartList } from 'redux/action-creators/cartListThunk';
import { CartListAction } from 'redux/actions/cartList';
import { useDispatch } from 'react-redux';
import { updateSnackBar } from 'redux/actions/snackBar';
import useUpdateCartItem from 'hooks/useUpdateCartItem';
import { useFetch } from 'hooks/useFetch';
import useThunkFetch from 'hooks/useThunkFetch';
import CroppedImage from 'components/@common/CroppedImage';
import Button from 'components/@common/Button';
import RequestFail from 'components/@common/RequestFail';
import Loading from 'components/@common/Loading';
import { BASE_URL } from 'apis';
import type { Item } from 'types/domain';
import { MESSAGE } from 'constant/message';

const ItemDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = Number(params.id);
  const { data: item, loading, error } = useFetch<Item>(`${BASE_URL}/products/${id}`);
  const { data: cartList } = useThunkFetch<CartListAction>(
    state => state.cartListReducer,
    getCartList
  );
  const { increaseQuantity } = useUpdateCartItem(cartList);

  const onClick = () => {
    increaseQuantity(id);
    dispatch(updateSnackBar(`${item.name} ${MESSAGE.ADD_CART}`));
  };

  if (loading) return <Loading />;
  if (error) return <RequestFail />;

  return (
    <Styled.ItemDetailPage>
      <CroppedImage src={item.imageUrl} width='57rem' height='57rem' alt='상품' />
      <Styled.Title>{item.name}</Styled.Title>
      <Styled.Price>
        <Styled.PriceDescription>금액</Styled.PriceDescription>
        <Styled.PriceValue>{item.price}</Styled.PriceValue>
      </Styled.Price>
      <Button size='large' backgroundColor='brown' onClick={onClick}>
        장바구니에 담기
      </Button>
    </Styled.ItemDetailPage>
  );
};

export default ItemDetail;

const Styled = {
  ItemDetailPage: styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
    width: 64rem;
  `,

  Title: styled.div`
    font-weight: 700;
    font-size: 3.2rem;
    width: 100%;
    padding: 0 3.5rem;
    margin-top: 2.1rem;
    margin-bottom: 3.3rem;
  `,

  Price: styled.div`
    display: flex;
    justify-content: space-between;
    border-top: solid 0.4rem ${({ theme }) => theme.colors.grey};
    width: 100%;
    padding: 0 3.5rem;
    padding-top: 3.3rem;
    margin-bottom: 5.7rem;
  `,

  PriceDescription: styled.span`
    font-weight: 400;
    font-size: 2.4rem;
  `,

  PriceValue: styled.span`
    font-weight: 400;
    font-size: 3.2rem;
  `,
};
