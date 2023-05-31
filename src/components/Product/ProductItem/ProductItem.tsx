import type { ProductItem as ProductItemType } from '../../../types/types.ts';
import * as S from './ProductItem.style.ts';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalContentState, modalOpenState } from '../../../recoil/modalAtoms.tsx';
import ProductModalContent from '../../ModalContent/ProductModalContent/ProductModalContent.tsx';
import cartIcon from '../../../assets/cart.svg';
import { quantityByProductIdSelector } from '../../../recoil/cartAtoms.ts';

interface ProductItemProps {
  product: ProductItemType;
}

function ProductItem({ product }: ProductItemProps) {
  const { name, price, imageUrl } = product;
  const setModalState = useSetRecoilState(modalOpenState);
  const setModalContentState = useSetRecoilState(modalContentState);
  const quantity = useRecoilValue(quantityByProductIdSelector(product.id));

  const openModal = () => {
    setModalState(true);
    setModalContentState(<ProductModalContent product={product} />);
  };

  return (
    <>
      <S.ProductItemBox onClick={openModal}>
        <S.ProductItemImageBox>
          <S.ProductItemImage src={imageUrl} loading='lazy' />
        </S.ProductItemImageBox>
        <S.ProductDetails>
          <S.ProductInfo>
            <S.ProductName>{name}</S.ProductName>
            <S.ProductPrice>{price.toLocaleString()}원</S.ProductPrice>
          </S.ProductInfo>
          {quantity > 0 ? (
            <S.CartCountWrapper>
              <S.CartCount>{quantity}</S.CartCount>
            </S.CartCountWrapper>
          ) : (
            <img src={cartIcon} />
          )}
        </S.ProductDetails>
      </S.ProductItemBox>
    </>
  );
}

export default ProductItem;
