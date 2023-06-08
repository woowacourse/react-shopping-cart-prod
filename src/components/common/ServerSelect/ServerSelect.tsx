import { ChangeEventHandler, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { BASE_URLS, SERVER_NAMES } from '../../../constants/api';
import { isKeyOf } from '../../../types/typeGuards';
import useCart from '../../../hooks/useCart';
import { serverOriginState } from '../../../recoil/atoms/common';

const ServerSelect = () => {
  const [value, setValue] = useState('mock');
  const [serverOrigin, setServerOrigin] = useRecoilState(serverOriginState);
  const { updateCart } = useCart();

  const changeServer: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;

    if (isKeyOf(BASE_URLS, value)) {
      setValue(e.target.value);
      setServerOrigin(BASE_URLS[value]);
    }
  };

  useEffect(() => {
    updateCart();
  }, [serverOrigin]);

  return (
    <Label>
      <Select value={value} onChange={changeServer}>
        {Object.entries(SERVER_NAMES).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </Select>
    </Label>
  );
};

const Label = styled.label`
  display: flex;
  justify-content: center;
  width: 120px;
  height: 36px;
  border: 1px solid ${(props) => props.theme.color.GRAY_300};
  border-radius: 4px;
  padding-right: 10px;
`;

const Select = styled.select`
  width: 100%;
  font-size: ${(props) => props.theme.fontSize.MEDIUM};
  text-align: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default ServerSelect;
