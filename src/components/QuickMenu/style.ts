import styled from 'styled-components';

import { QuickMenuAppear, QuickMenuDisAppear } from '@Animations/index';

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
  background-position: 0px 20px;

  width: 70px;
  height: 70px;

  z-index: 5;

  &:hover {
    height: 240px;
    background-position: 0px 190px;
    & > div {
      pointer-events: auto;
      opacity: 1;
    }
  }
`;

type OptionProps = {
  position: Partial<Record<'right' | 'bottom' | 'top' | 'left', string>>;
  avatar: string;
  hover: boolean;
};

export const Option = styled.div<OptionProps>`
  display: block;
  position: absolute;
  ${(props) => props.position};

  width: 50px;
  height: 50px;

  background-image: url(${(props) => props.avatar});
  background-size: 50px;
  background-repeat: no-repeat;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  border-radius: 50%;

  animation: ${(props) => (props.hover ? QuickMenuAppear(props.position) : QuickMenuDisAppear)} 0.3s ease forwards;

  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    transition: transform 0.3s ease;
    & ~ div {
      pointer-events: auto;
      opacity: 1;
    }
    pointer-events: auto;
    opacity: 1;
  }
`;
