export type FetchMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export type Select = {
  id: number;
  isSelected: boolean;
  order: { id: number; quantity: number };
};
