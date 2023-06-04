import { useRecoilValue } from 'recoil';

import { checkedCartProductCountState } from '../../states/checkedCartProducts';

export const useCheckedCount = () => {
  const checkedCount = useRecoilValue(checkedCartProductCountState);

  return checkedCount;
};
