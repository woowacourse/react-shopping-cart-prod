import { useRecoilValue } from 'recoil';
import clientState from '../recoil/atoms/clientState';
import userRemoteCartItemsState from '../recoil/user/userRemoteCartItemsState';
import useMutation from './useMutation';

type UseOrderMutationParams = {
  usedPoints: number;
};

const useOrderMutation = () => {
  const client = useRecoilValue(clientState);
  const { cartItems } = useRecoilValue(userRemoteCartItemsState);

  const { mutate: order, ...mutationParams } = useMutation(
    ({ usedPoints }: UseOrderMutationParams) =>
      client
        .post('/orders', {
          usedPoints,
          cartItems: cartItems.map((cartItem) => ({
            id: cartItem.id,
            productId: cartItem.product.id,
            quantity: cartItem.quantity,
          })),
        })
        .acceptOrThrow(201)
        .then((response) => Number(response.headers.location.split('/').pop())),
  );

  return { order, ...mutationParams };
};

export default useOrderMutation;
