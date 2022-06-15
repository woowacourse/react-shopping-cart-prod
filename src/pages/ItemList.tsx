import Loading from 'components/common/Loading';
import Pagination from 'components/common/Pagination';
import ItemContainer from 'components/ItemList/ItemContainer';
import { MAX_RESULT_ITEM_LIST } from 'constants/index';
import useSnackBar from 'hooks/useSnackBar';
import useThunkFetch from 'hooks/useThunkFetch';
import { useParams } from 'react-router-dom';
import { getCartListRequest } from 'redux/cartList/thunk';
import { getItemList } from 'redux/itemList/thunk';
import styled from 'styled-components';

const ItemList = () => {
  const { id } = useParams();
  const { loading, data: allItemList } = useThunkFetch(state => state.itemList, getItemList(), {
    useErrorBoundary: true,
  });
  const { data: cartList } = useThunkFetch(state => state.cartList, getCartListRequest(), {
    useErrorBoundary: true,
  });
  const { openSnackbar, SnackbarComponent } = useSnackBar();

  if (loading) return <Loading />;

  return (
    <StyledRoot>
      {allItemList?.length > 0 &&
        allItemList
          .slice(MAX_RESULT_ITEM_LIST * (Number(id) - 1), MAX_RESULT_ITEM_LIST * Number(id))
          .map(item => (
            <ItemContainer
              key={item.id}
              item={item}
              cartItem={cartList.find(cartItem => cartItem.productId === item.id)}
              openSnackbar={openSnackbar}
            />
          ))}
      <Pagination
        endpoint='main'
        count={10}
        lastIndex={Math.floor(allItemList?.length / MAX_RESULT_ITEM_LIST) + 1}
      />
      <SnackbarComponent />
    </StyledRoot>
  );
};

export default ItemList;

const StyledRoot = styled.div`
  width: 1300px;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  gap: 2.7rem 5.73rem;
`;
