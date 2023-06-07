export type CartUpdateBody = {
  itemId: number;
  quantity: number;
};

export type UserCredentialData = {
  ID: number;
  EMAIL: string;
  PASSWORD: string;
};

export type ServerNames = 'ROY' | 'SPLIT' | 'IRAE';
