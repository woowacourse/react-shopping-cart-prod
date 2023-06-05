import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { API_URL, MESSAGE, USER } from 'src/constants';
import { $CartList, $CheckedCartIdList, $CurrentServerUrl } from 'src/recoil/atom';
import useMutation from './useMutation';

function usePurchase() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const curServer = useRecoilValue($CurrentServerUrl);
  const [cartList, setCartList] = useRecoilState($CartList(curServer));
  const setCartCheckedList = useSetRecoilState($CheckedCartIdList(curServer));

  const [orderId, setOrderId] = useState<string | null>(null);

  const { mutateQuery: paymentItemQuery } = useMutation<Record<string, number[]>, unknown>({
    onSuccess: data => {
      const regex = /[^0-9]/g;
      const id = data?.headers.get('Location')?.replace(regex, '');
      const requestBody = data?.fetchInformation.bodyData;

      if (requestBody) {
        const { cartItemIds } = requestBody;
        setOrderId(id ?? null);

        const updatedCartList = cartList.filter(item => !cartItemIds.includes(item.id));

        setCartList(updatedCartList);
        setCartCheckedList(updatedCartList.map(item => item.id));
        setMessage(MESSAGE.PAYMENTS_SUCCESSFUL);
      }
    },
    onFailure: errorMessage => {
      setError(true);
      setMessage(!errorMessage || errorMessage.length === 0 ? MESSAGE.PAYMENTS_FAILED : errorMessage);
    },
  });

  const purchaseCartItem = async (cartItemIds: number[]) => {
    await paymentItemQuery({
      url: `${curServer}${API_URL.ORDER}`,
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(USER)}`,
        'Content-Type': 'application/json',
      },
      bodyData: {
        cartItemIds,
      },
    });
  };

  return { purchaseCartItem, orderId, settledMessage: message, error };
}

export default usePurchase;
