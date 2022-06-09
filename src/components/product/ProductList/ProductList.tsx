import Modal from '@/components/common/Modal/Modal';
import { ProductType } from '@/domain/product';
import { useModal } from '@/hooks/useModal';
import ProductCard from '../ProductCard/ProductCard';
import * as Styled from './ProductList.style';
import ProductAddCart from '../ProductAddCart/ProductAddCart';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAddCartAsync } from '@/store/cart/action';
import { ROUTE } from '@/route';
import { useState } from 'react';

interface ProductListType {
  productList: ProductType[];
}

function ProductList({ productList }: ProductListType) {
  const [currentProduct, setCurrentProduct] = useState<ProductType>();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isShowModal, openModal, closeModal } = useModal();

  const onClickCartButton = id => {
    openModal();

    const product = productList.find(product => product.id === id);

    setCurrentProduct(product);
  };

  const onClickAddCartButton = (id, count) => {
    dispatch(fetchAddCartAsync({ productId: id, quantity: count }) as any);

    if (confirm('장바구니로 이동하시겠습니까?')) {
      navigate(ROUTE.ShoppingCart);
    }

    closeModal();
  };

  return (
    <Styled.Container>
      {productList.map(product => (
        <ProductCard key={product.id} product={product} onClickCartButton={onClickCartButton} />
      ))}

      {isShowModal && currentProduct && (
        <Modal closeModal={closeModal}>
          <ProductAddCart product={currentProduct} onClickAddCartButton={onClickAddCartButton} />
        </Modal>
      )}
    </Styled.Container>
  );
}

ProductList.skeleton = () => {
  return (
    <Styled.Container>
      {Array.from({ length: 12 }).map((_, index) => (
        <ProductCard.skeleton key={index} />
      ))}
    </Styled.Container>
  );
};

export default ProductList;
