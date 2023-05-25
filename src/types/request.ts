export type CartUpdateBody = {
  itemId: number;
  quantity: number;
};

export type UserCredentialData = {
  id: number;
  email: string;
  password: string;
};

export type ServerNames = 'ROY' | 'SPLIT' | 'IRAE';
