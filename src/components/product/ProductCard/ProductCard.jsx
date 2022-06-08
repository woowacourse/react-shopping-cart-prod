import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useModal } from 'hooks/useModal';

import { Image, Icon, Modal } from 'components/common';

import { CartAddForm } from 'components/product';
import * as S from 'components/product/ProductCard/ProductCard.style';

import { WARNING_MESSAGES } from 'constants/messages';

import * as GlobalStyled from 'styles/GlobalStyles';
import { color } from 'styles/Theme';

function ProductCard({ product, isLoggedIn }) {
  const { id, imageUrl, name, price, stock } = product;

  const { isModalOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const onClickCard = () => {
    navigate(`/products/${id}`);
  };

  const onClickCartButton = () => {
    if (!isLoggedIn) {
      alert(WARNING_MESSAGES.LOGIN_REQUIRED);
      return;
    }
    openModal();
  };

  return (
    <GlobalStyled.Position>
      <S.Container onClick={onClickCard}>
        <Image src={imageUrl} alt={name} />
        <S.Content>
          <S.Description>
            <S.Name>{name}</S.Name>
            <S.Price>{price.toLocaleString('ko-KR')} 원</S.Price>
          </S.Description>
        </S.Content>
      </S.Container>

      <GlobalStyled.Position position="absolute" bottom="5px" right="5px">
        {stock === 0 ? (
          <S.SoldOut>일시 품절</S.SoldOut>
        ) : (
          <S.TransparentButton type="button" onClick={onClickCartButton}>
            <Icon iconName="Cart" fill={color.DARK_GRAY} />
          </S.TransparentButton>
        )}
      </GlobalStyled.Position>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <CartAddForm product={product} closeModal={closeModal} />
        </Modal>
      )}
    </GlobalStyled.Position>
  );
}

ProductCard.skeleton = () => {
  return (
    <S.Container skeleton={true}>
      <S.Placeholder shape="square" />
      <S.Content>
        <S.Placeholder shape="line" />
      </S.Content>
    </S.Container>
  );
};

export default ProductCard;
