import { productTypes } from 'redux/actions';

import CONDITION from 'constants/condition';

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
};

export type ProductAction = {
  type: typeof productTypes[keyof typeof productTypes];
  payload?: any;
};

type condition = typeof CONDITION[keyof typeof CONDITION];

export type ProductStoreState = {
  condition: condition;
  productList: Array<Product>;
  productDetail: Product | null;
};
