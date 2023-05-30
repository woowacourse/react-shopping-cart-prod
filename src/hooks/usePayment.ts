import { MESSAGE } from 'src/constants';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { $CartList, $CheckedCartIdList, $CurrentServerUrl } from 'src/recoil/atom';
import useMutation from './useMutation';
import useToast from './useToast';

function usePayment() {
  const Toast = useToast();
  const curServer = useRecoilValue($CurrentServerUrl);
  const setCartList = useSetRecoilState($CartList(curServer));
  const setCartCheckedList = useSetRecoilState($CheckedCartIdList(curServer));

  const { mutateQuery: paymentItemQuery } = useMutation<Record<string, number[]>, unknown>({
    onSuccess: data => {
      // const regex = /[^0-9]/g;
      // const orderId = data?.headers.get('Location')?.replace(regex, '');
      const requestBody = data?.fetchInformation.bodyData;

      if (requestBody) {
        const { cartItemIds } = requestBody;
        setCartList(prev => prev.filter(item => !cartItemIds.includes(item.id)));
        setCartCheckedList([]);
      }

      // 여기서 모달 띄우기
      Toast.success(MESSAGE.PAYMENTS_SUCCESSFUL);
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

  return { purchaseCartItem };
}

export default usePayment;
