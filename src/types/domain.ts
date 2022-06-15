export interface Item {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

export interface CartItem extends Item {
  productId: number;
  quantity: number;
  isChecked: boolean;
}

export type CartItemResponse = Omit<CartItem, 'isChecked'>;

export interface UserInfo {
  loginId: string;
  name: string;
}

export interface UserInfoWithPassword extends UserInfo {
  password: string;
}

export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse extends Pick<UserInfo, 'name'> {
  accessToken: string;
}

export type ItemInCart = Item & CartItem;
