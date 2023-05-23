import { useRecoilValue } from 'recoil';

import { checkedCartProductCountState } from '../states/checkedCartProducts';
import { serverNameState } from '../states/serverName';

const useCheckedCount = () => {
  const serverName = useRecoilValue(serverNameState);
  const checkedCount = useRecoilValue(checkedCartProductCountState(serverName));

  return checkedCount;
};

export default useCheckedCount;
