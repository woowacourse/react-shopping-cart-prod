import { useRecoilValue } from 'recoil';

import { checkedCartProductCountSelector } from '../../states/checkedCartProducts';

export const useCheckedCount = () => {
  const checkedCount = useRecoilValue(checkedCartProductCountSelector);

  return checkedCount;
};
