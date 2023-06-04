import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import clientState from '../recoil/atoms/clientState';
import ordersQuery from '../recoil/queries/ordersQuery';
import profileQuery from '../recoil/queries/profileQuery';
import userCartItemsRepository from '../recoil/user/userCartItemsRepository';
import userRemoteCartItemsState from '../recoil/user/userRemoteCartItemsState';
import useMutation from './useMutation';

type UseOrderMutationParams = {
  usedPoints: number;
};

const useOrderMutation = () => {
  const client = useRecoilValue(clientState);
  const { cartItems } = useRecoilValue(userRemoteCartItemsState);
  const { doDownstreamSync } = useRecoilValue(userCartItemsRepository);

  const refreshProfile = useRecoilRefresher_UNSTABLE(profileQuery({ client }));
  const refreshOrders = useRecoilRefresher_UNSTABLE(ordersQuery({ client }));

  const refreshStates = () => {
    refreshProfile();
    refreshOrders();
    doDownstreamSync();
  };

  const { mutate: order, ...mutationParams } = useMutation(
    ({ usedPoints }: UseOrderMutationParams) =>
      client
        .post('/orders', {
          usedPoints,
          cartItems: cartItems
            .filter((cartItem) => cartItem.checked)
            .map((cartItem) => ({
              id: cartItem.id,
              productId: cartItem.product.id,
              quantity: cartItem.quantity,
            })),
        })
        .then((response) => Number(response.acceptOrThrow(201).headers.location.split('/').pop()))
        .finally(refreshStates),
  );

  return { order, ...mutationParams };
};

export default useOrderMutation;
