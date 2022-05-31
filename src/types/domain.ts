export interface Item {
  id: number;
  thumbnailUrl: string;
  title: string;
  price: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  isSelected: boolean;
}

export interface UserInfo {
  loginId: string;
  name: string;
  password: string;
}

export interface LoginResponse extends Pick<UserInfo, 'name'> {
  accessToken: string;
}

export type ItemInCart = Item & CartItem;
