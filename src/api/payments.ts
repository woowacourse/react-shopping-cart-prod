import { api } from 'api';
import { PaymentPostBody } from 'types/api/payments';

export const postPayment =
  (payment: PaymentPostBody) => async (server: string) => {
    await api.post(`${server}/payments`, payment);
  };
