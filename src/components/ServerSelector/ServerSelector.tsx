import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constant';
import cartState from '../../globalState/atoms/cartState';
import serverNameState from '../../globalState/atoms/serverName';
import { isProperServerName } from '../../types/server';
import { worker } from '../../mocks/browser';

const ServerSelector = () => {
  const [serverName, setServerName] = useRecoilState(serverNameState);
  const resetCart = useResetRecoilState(cartState);
  const navigate = useNavigate();

  useEffect(() => {
    resetCart();
    navigate('/', { replace: true });
  }, [serverName]);

  const handleServerNameSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const selectedServerName = event.target.value;

    if (!isProperServerName(selectedServerName)) return;

    if (serverName !== selectedServerName) {
      if (selectedServerName === '참새MSW') {
        worker.start({
          serviceWorker: {
            url: '/mockServiceWorker.js',
          },
        });
      } else {
        worker.stop();
      }
    }

    setServerName(selectedServerName);
  };

  return (
    <Select onChange={handleServerNameSelectChange} value={serverName}>
      {Object.keys(BASE_URL).map((serverNameOption) => (
        <option key={serverNameOption}>{serverNameOption}</option>
      ))}
    </Select>
  );
};

const Select = styled.select`
  margin: auto 0px auto auto;

  width: 100px;
  height: 40px;
`;

export default ServerSelector;
