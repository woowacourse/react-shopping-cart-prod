import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import Image from 'components/@shared/Image/Image.component';
import TextBox from 'components/@shared/TextBox/TextBox.component';

import ModifyQuantityBox from 'components/ModifyQuantityBox/ModifyQuantityBox.component';

import useDebounce from 'hooks/useDebounce';
import useFetch from 'hooks/useFetch';

import { ReactComponent as ShoppingCart } from 'assets/images/shoppingCart.svg';
import { API_URL_PATH } from 'constants/api';

function ProductListItem({ id, thumbnail, name, price, quantity, loadProducts }) {
  const isStored = quantity !== 0;
  const { accessToken } = useSelector(state => state.auth);
  const { fetchData: storeProductToCart } = useFetch({
    url: `${API_URL_PATH.CARTS}`,
    method: 'post',
    headers: { Authorization: `Bearer ${accessToken}` },
    skip: true,
  });
  const { fetchData: modifyStoredProductQuantity } = useFetch({
    url: `${API_URL_PATH.CARTS}`,
    method: 'patch',
    headers: { Authorization: `Bearer ${accessToken}` },
    skip: true,
  });

  const debounce = useDebounce();
  const [modifyQuantityShow, setModifyQuantityShow] = useState(false);
  const isModified = useRef();
  const handleShowModifyQuantityBox = () => {
    setModifyQuantityShow(prev => !prev);
    setTimeout(() => {
      if (isModified.current) {
        return;
      }

      isModified.current = false;
      setModifyQuantityShow(false);
    }, 2500);
  };
  const handleChangeQuantity = async quantity => {
    if (!accessToken) {
      alert('로그인 해주세요!');
      return;
    }
    isModified.current = true;

    debounce(async () => {
      setModifyQuantityShow(false);
      isModified.current = false;
      await modifyStoredProductQuantity({ productId: id, quantity });
      await loadProducts();
    }, 1000);
  };

  const handleStoreProductToCart = async () => {
    await storeProductToCart({ productId: id, quantity: 1 });
    await loadProducts();
  };

  return (
    <ItemContainer>
      <ProductImageBox>
        <ProductImage type="medium" src={thumbnail} />
      </ProductImageBox>
      <TextBox className="product-name" fontSize="small">
        {name}
      </TextBox>
      <TextBox className="product-price" fontSize="medium">
        {price.toLocaleString()}원
      </TextBox>
      <CartIconBox onClick={handleShowModifyQuantityBox} className="icon-box">
        {isStored ? (
          <StoredQuantityBox onClick={handleShowModifyQuantityBox}>{quantity}</StoredQuantityBox>
        ) : (
          <ShoppingCart role="button" onClick={handleStoreProductToCart} />
        )}
      </CartIconBox>
      <CartQuantityBox show={modifyQuantityShow}>
        <ModifyQuantityBox
          onChange={handleChangeQuantity}
          quantity={quantity !== 0 ? quantity : 1}
        />
      </CartQuantityBox>
    </ItemContainer>
  );
}

export default React.memo(ProductListItem);

const ItemContainer = styled.div`
  position: relative;
  display: grid;
  gap: 5px;
  width: 282px;
  grid-template-areas:
    'img img'
    'name icon'
    'price icon';

  ${Image} {
    grid-area: img;
  }
  ${TextBox}.product-name {
    grid-area: name;
    margin-left: 11px;
    margin-top: 5px;
  }
  ${TextBox}.product-price {
    grid-area: price;
    margin-left: 11px;
  }

  .icon-box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    grid-area: icon;
    place-self: center end;
    cursor: pointer;
  }

  path {
    fill: ${({ theme, isContained }) =>
      isContained ? theme.colors['MINT_001'] : theme.colors['BLACK_001']};
  }
`;

const ProductImageBox = styled.div`
  width: fit-content;
  height: ${({ theme }) => theme.imageSizes['medium']};
  overflow: hidden;
`;

const ProductImage = styled(Image).attrs({ type: 'medium' })`
  transition: all ease-in-out 0.1s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const CartIconBox = styled.div`
  width: 50px;
  height: 50px;
  &:active {
    transform: scale(0.9);
  }
`;

const CartQuantityBox = styled(FlexBox).attrs({
  justifyContent: 'space-around',
  alignItems: 'center',
})`
  display: ${({ show }) => (show ? 'display' : 'none')};
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  height: 40px;
  font-size: 20px;
  border-radius: 25px;
  opacity: 0.9;
  ${({ theme }) => css`
    background-color: ${theme.colors['MINT_001']};
    color: ${theme.colors['WHITE_001']};
  `};
`;

const StoredQuantityBox = styled(FlexBox).attrs({
  justifyContent: 'center',
  alignItems: 'center',
})`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  font-weight: bold;
  font-size: 18px;
  background-color: ${({ theme }) => theme.colors['MINT_001']};
`;
