import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { $CartList, $CheckedCartIdList, $CurrentServerUrl } from 'src/recoil/atom';
import useMutation from './useMutation';

function usePurchase() {
  const curServer = useRecoilValue($CurrentServerUrl);
  const setCartList = useSetRecoilState($CartList(curServer));
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
        setCartList(prev => prev.filter(item => !cartItemIds.includes(item.id)));
        setCartCheckedList([]);
      }
    },
  });

  const purchaseCartItem = async (cartItemIds: number[]) => {
    await paymentItemQuery({
      url: '/orders',
      method: 'POST',
      bodyData: {
        cartItemIds,
      },
    });
  };

  return { purchaseCartItem, orderId };
}

export default usePurchase;
