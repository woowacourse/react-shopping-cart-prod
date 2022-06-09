import axios from 'axios';
import { SERVER_URL } from 'configs/api';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StoreState } from 'types';

import { actions } from 'redux/actions';

type SelectedState = StoreState['productDetailState'];

const useProductDetail = (id: string) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, productDetail } = useSelector<
    StoreState,
    SelectedState
  >(({ productDetailState }) => ({
    isLoading: productDetailState.isLoading,
    productDetail: productDetailState.productDetail,
    error: productDetailState.error,
  }));
  const accessToken = localStorage.getItem('accessToken');
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const addItemToCart = () => {
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      navigate('/signin');
    }
    dispatch(actions.addItemToCart(accessToken as string, Number(id), 1));
    setIsAddedToCart(true);
  };

  useEffect(() => {
    if (id) {
      dispatch(actions.getProductDetail(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    axios({
      method: 'get',
      url: `${SERVER_URL}/api/customers/cart/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      setIsAddedToCart(res.data.exists);
    });
  }, [accessToken, id]);

  return {
    isLoading,
    productDetail,
    isAddedToCart,
    error,
    addItemToCart,
  };
};

export default useProductDetail;
