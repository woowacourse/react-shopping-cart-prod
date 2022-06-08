import { Cart, Product } from 'types';

export interface Props {
  cartItemId: Cart['id'];
  product: Product;
  quantity: number;
  checked: boolean;
  setChecked: (
    e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLElement>
  ) => void;
}
