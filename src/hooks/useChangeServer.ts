import { useEffect, useRef } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import cartState from '../globalState/atoms/cartState';
import serverNameState from '../globalState/atoms/serverName';

const useChangeServer = () => {
  const isMountCycle = useRef(true);
  const resetCartState = useResetRecoilState(cartState);
  const serverName = useRecoilValue(serverNameState);

  useEffect(() => {
    if (isMountCycle.current) {
      isMountCycle.current = false;
      return;
    }

    resetCartState();
  }, [serverName]);
};

export default useChangeServer;
