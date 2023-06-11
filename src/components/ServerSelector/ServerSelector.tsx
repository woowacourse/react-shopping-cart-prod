import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constant';
import cartState from '../../globalState/atoms/cartState';
import serverNameState from '../../globalState/atoms/serverName';
import { isProperServerName } from '../../types/server';
import orderDetailState from '../../globalState/atoms/orderDetail';

const ServerSelector = () => {
  const [serverName, setServerName] = useRecoilState(serverNameState);
  const resetCart = useResetRecoilState(cartState);
  const resetOrderDetail = useResetRecoilState(orderDetailState);
  const navigate = useNavigate();

  useEffect(() => {
    resetCart();
    resetOrderDetail();
    navigate('/', { replace: true });
  }, [serverName]);

  const setProperServerName = (newServerName: string) => {
    if (!isProperServerName(newServerName)) return;
    setServerName(newServerName);
  };

  return (
    <Select onChange={({ target: { value } }) => setProperServerName(value)} value={serverName}>
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
