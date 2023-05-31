import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState, useRecoilRefresher_UNSTABLE } from 'recoil';
import { BASE_URL } from '../../../constant';
import cartState from '../../../globalState/atoms/cartState';
import serverNameState from '../../../globalState/atoms/serverName';
import fetchCartItems from '../../../globalState/selectors/fetchCartItems';
import { isProperServerName } from '../../../types/server';

const ServerSelector = () => {
  const [serverName, setServerName] = useRecoilState(serverNameState);
  const resetCart = useResetRecoilState(cartState);
  const resetCartFetcher = useRecoilRefresher_UNSTABLE(fetchCartItems);

  useEffect(() => {
    resetCartFetcher();
    resetCart();
  }, [serverName]);

  const handleServerNameSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const selectedServerName = event.target.value;

    if (!isProperServerName(selectedServerName)) return;

    setServerName(selectedServerName);
  };

  return (
    <select onChange={handleServerNameSelectChange} value={serverName}>
      {Object.keys(BASE_URL).map((serverNameOption) => (
        <option key={serverNameOption}>{serverNameOption}</option>
      ))}
    </select>
  );
};

export default ServerSelector;
