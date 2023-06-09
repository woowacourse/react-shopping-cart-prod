import { postOrder } from '../../apis/order';
import { waitForMutation } from '../../utils/waitFor';

export const useMutateOrder = () => {
  const postOrderMutation = waitForMutation(postOrder);

  return { postOrderMutation };
};
