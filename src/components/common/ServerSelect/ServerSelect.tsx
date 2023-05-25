import { ChangeEventHandler, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { serverOriginState } from '../../../recoil/atoms';
import { BASE_URLS } from '../../../constants/api';
import { isKeyOf } from '../../../types/typeGuards';
import useCartService from '../../../hooks/useCartService';

const ServerSelect = () => {
  const [value, setValue] = useState('baron');
  const [serverOrigin, setServerOrigin] = useRecoilState(serverOriginState);
  const { updateCart } = useCartService();

  const changeServer: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;

    if (isKeyOf(BASE_URLS, value)) {
      setValue(() => e.target.value);
      setServerOrigin(() => BASE_URLS[value]);
    }
  };

  useEffect(() => {
    updateCart();
  }, [serverOrigin]);

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
