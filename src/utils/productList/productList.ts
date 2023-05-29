import { ProductItemType, ServerProductItemType } from '@type/productType';

export const productListApiWrapper = (productList: ServerProductItemType[]): ProductItemType[] => {
  return productList.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    };
  });
};
