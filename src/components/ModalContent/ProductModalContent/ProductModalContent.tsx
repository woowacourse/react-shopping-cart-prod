import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ProductItem } from '../../../types/types.ts';
import { modalOpenState } from '../../../recoil/modalAtoms.tsx';
import cartIcon from '../../../assets/cart.svg';
import { quantityByProductIdSelector } from '../../../recoil/cartAtoms.ts';
import * as S from './ProductModalContent.style.ts';
import { CartController } from './CartController/index.ts';

function ProductModalContent({ product }: { product: ProductItem }) {
  const { name, price, imageUrl } = product;
  const setModalOpen = useSetRecoilState(modalOpenState);

  const quantity = useRecoilValue(quantityByProductIdSelector(product.id));

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <S.ModalHeader>
        <S.ModalTitle>상품 정보</S.ModalTitle>
        <S.ModalCloseButton onClick={closeModal}>X</S.ModalCloseButton>
      </S.ModalHeader>
      <S.ProductModalContentWrapper>
        <S.ProductItemImageBox>
          <S.ProductItemImage src={imageUrl} />
        </S.ProductItemImageBox>
        <S.ProductDetails>
          <div>
            <S.ProductName>{name}</S.ProductName>
            <S.ProductPrice>{price.toLocaleString()}원</S.ProductPrice>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}
          >
            {quantity > 0 && (
              <div>
                <img src={cartIcon}></img>
              </div>
            )}
            <CartController product={product} />
          </div>
        </S.ProductDetails>
      </S.ProductModalContentWrapper>
    </>
  );
}

export default ProductModalContent;
