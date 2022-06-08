export interface Item {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

export interface CartItem {
  id?: number;
  name?: string;
  imageUrl?: string;
  productId?: number;
  quantity: number;
  checked: boolean;
  price?: number;
}

export interface UserInfo {
  username: string;
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
