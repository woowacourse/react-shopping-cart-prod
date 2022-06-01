export interface Item {
  id: number;
  thumbnailUrl: string;
  title: string;
  price: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  willPurchase: boolean;
}

export interface UserInfo {
  name: string;
  email: string;
  password?: string;
  token?: string;
}

export interface SignUpInfo extends UserInfo {
  password: string;
}

export interface SignInInfo {
  email: string;
  password: string;
}

export interface EditPasswordInfo {
  password: string;
  newPassword: string;
}
