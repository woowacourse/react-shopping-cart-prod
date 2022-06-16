export interface Item {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

export interface CartItem {
  id?: number;
  productId?: number;
  price?: number;
  quantity: number;
  checked: boolean;
  imageUrl?: string;
  name?: string;
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
