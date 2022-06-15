import Button from '@/components/common/Button/Button';
import Image from '@/components/common/Image/Image';
import Modal from '@/components/common/Modal/Modal';
import { ProductType } from '@/domain/product';
import { useExcludeCart } from '@/hooks/useExcludeCart';
import { useModal } from '@/hooks/useModal';
import useResponsive from '@/hooks/useResponsive';
import * as Styled from './ProductDetailCard.style';
import ProductAddCart from '../ProductAddCart/ProductAddCart';

function ProductDetailCard({ product }: { product: ProductType }) {
  const { imageURL, name, price } = product;
  const responsive = useResponsive();

  const { isShowModal, openModal, closeModal } = useModal();
  const { isShowCartButton } = useExcludeCart(product.id);

  return (
    <>
      <Styled.InformationWrapper>
        <Image src={imageURL} alt="" width={responsive === 'desktop' ? '400px' : '250px'} />
        <Styled.Name>{name}</Styled.Name>
        <Styled.Price>
          <span>금액 </span>
          <span>{price}원</span>
        </Styled.Price>
      </Styled.InformationWrapper>

      {isShowCartButton && (
        <Styled.ButtonWrapper onClick={openModal}>
          <Button width="100%" padding="20px">
            장바구니
          </Button>
        </Styled.ButtonWrapper>
      )}

      {isShowModal && (
        <Modal closeModal={closeModal}>
          <ProductAddCart product={product} onClickAddCartButton={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default ProductDetailCard;
