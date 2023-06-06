import React from 'react';
import { styled } from 'styled-components';
import { selectedHostState } from '../recoil/atoms';
import { HOSTS, SERVER } from '../constants';
import { useSetRecoilState } from 'recoil';

export default function ServerSelectBox() {
  const setSelectedHost = useSetRecoilState<string>(selectedHostState);

  const load = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentServer = e.target.value;

    setSelectedHost(SERVER[currentServer]);
  };

  return (
    <Style.Wrapper>
      <Style.ServerSelectBox name="serverList" onChange={load}>
        {HOSTS.map((host) => (
          <option key={host}>{host}</option>
        ))}
      </Style.ServerSelectBox>
    </Style.Wrapper>
  );
}

const Style = {
  Wrapper: styled.div`
    padding: 5px;
  `,

  ServerSelectBox: styled.select`
    background-color: black;
    border: none;
    outline: 0;
    padding-right: 5px;

    color: white;
    cursor: pointer;

    /* 모바일 */
    @media screen and (max-width: 767px) {
      padding-right: 3px;

      font-size: 12px;
    }
  `,
};
