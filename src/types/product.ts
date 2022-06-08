import { productTypes } from 'redux/actions';

import CONDITION from 'constants/condition';

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
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
