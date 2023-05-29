import styled from 'styled-components';

type ButtonProps = {
  width: string;
  backgroundColor: string;
  disable: boolean;
};

export const Button = styled.button<ButtonProps>`
  border: none;
  background-color: ${(props) => props.backgroundColor};
  color: #ffffff;
  width: ${(props) => props.width};
  padding: 20px 0px;
  font-size: 20px;
  font-weight: 400;
  cursor: ${(props) => !props.disable && 'pointer'};
  opacity: ${(props) => props.disable && 0.4};
  transition: opacity 0.2s ease;
`;
