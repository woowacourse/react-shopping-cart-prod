export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type ProductList = Product[];

// response for cart
export type Item = {
  id: number;
  quantity: number;
  product: Product;
};

export type CartList = Item[];

// type for globalState
export type ItemWithSelected = Item & {
  isSelected: boolean;
};

export type CartListWithSelected = ItemWithSelected[];
