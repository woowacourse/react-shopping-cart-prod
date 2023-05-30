import ContentLayout from 'components/@common/ContentLayout';
import ProductItemList from 'components/Product/ProductItemList';
import { useToast } from 'components/@common/Toast/hooks/useToast';

const ProductList = () => {
  const { renderToast } = useToast();

  return (
    <ContentLayout title="상품 목록">
      <ProductItemList />
      {renderToast}
    </ContentLayout>
  );
};

export default ProductList;
