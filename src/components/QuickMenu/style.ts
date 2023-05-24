import styled from 'styled-components';

import ServersIcon from '@Asset/servers.png';

export const Container = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
`;

export const Button = styled.div`
  background-image: url(${ServersIcon});
  background-size: 50px;
  background-repeat: no-repeat;
  background-position: 0px 70px;

  width: 70px;
  height: 120px;

  &:hover {
    & > div {
      display: block;
    }
  }
`;

type OptionProps = {
  position: Partial<Record<'right' | 'bottom' | 'top' | 'left', string>>;
  avatar: string;
};

export const Option = styled.div<OptionProps>`
  display: none;
  position: absolute;
  ${(props) => props.position};

  width: 50px;
  height: 50px;

  background-image: url(${(props) => props.avatar});
  background-size: 50px;
  background-repeat: no-repeat;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  border-radius: 50%;

  animation: scale(2) 1s ease-in;

  cursor: pointer;

  &:hover {
    & ~ div {
      display: block;
    }
    display: block;
  }
`;
