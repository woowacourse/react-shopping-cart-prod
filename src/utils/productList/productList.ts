import { ProductItemType, ServerProductItemType } from '@type/productType';

export const productListApiWrapper = (productList: ServerProductItemType[]): ProductItemType[] => {
  return productList.map((product) => productApiWrapper(product));
};

export const productApiWrapper = (product: ServerProductItemType): ProductItemType => {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
  };
};
