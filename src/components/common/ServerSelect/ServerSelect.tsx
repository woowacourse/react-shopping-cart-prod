import { ChangeEventHandler, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { BASE_URLS } from '../../../constants/api';
import { isKeyOf } from '../../../types/typeGuards';
import useCart from '../../../hooks/useCart';
import useOrder from '../../../hooks/useOrder';
import usePoint from '../../../hooks/usePoint';
import { serverOriginState } from '../../../recoil/atoms/common';

const ServerSelect = () => {
  const [value, setValue] = useState('mock');
  const [serverOrigin, setServerOrigin] = useRecoilState(serverOriginState);
  const { updateCart } = useCart();
  const { updateOrders } = useOrder();
  const { updatePoint } = usePoint();

  const changeServer: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;

    if (isKeyOf(BASE_URLS, value)) {
      setValue(e.target.value);
      setServerOrigin(BASE_URLS[value]);
    }
  };

  useEffect(() => {
    updateCart();
    updateOrders();
    updatePoint();
  }, [serverOrigin]);

  return (
    <Label>
      <Select value={value} onChange={changeServer}>
        <option value="mock">MSW</option>
        <option value="baron">바론</option>
        <option value="blackCat">블랙캣</option>
        <option value="kkero">케로</option>
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
  font-size: 16px;
  text-align: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default ServerSelect;
