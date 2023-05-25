import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { serverState } from '../store/ServerState';
import { ChangeEventHandler } from 'react';
import { serverUrlObj } from '../constants/url';

const ServerDropdown = () => {
  const options = ['주노', '헤나', '메리'];

  const setServerState = useSetRecoilState(serverState);

  const handlerChangeUrl: ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
    const { value } = target;

    setServerState(serverUrlObj[value]);
  };

  return (
    <S.Dropdown onChange={handlerChangeUrl}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </S.Dropdown>
  );
};

const S = {
  Dropdown: styled.select`
    width: 50px;
  `,
};

export default ServerDropdown;
