import { ChangeEventHandler, useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { cartState, serverOriginState } from '../../../recoil/atoms';
import { BASE_URLS } from '../../../constants/api';
import { isKeyOf } from '../../../types/typeGuards';

const ServerSelect = () => {
  const [value, setValue] = useState('baron');
  const setServerOrigin = useSetRecoilState(serverOriginState);
  const resetCart = useResetRecoilState(cartState);

  const changeServer: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;

    if (isKeyOf(BASE_URLS, value)) {
      setValue(e.target.value);
      resetCart();
      setServerOrigin(BASE_URLS[value]);
    }
  };

  return (
    <Select value={value} onChange={changeServer}>
      <option value="baron">바론</option>
      <option value="blackCat">블랙캣</option>
      <option value="kkero">케로</option>
    </Select>
  );
};

const Select = styled.select`
  width: 102px;
  height: 42px;
  font-size: 16px;
  text-align: center;
`;

export default ServerSelect;
