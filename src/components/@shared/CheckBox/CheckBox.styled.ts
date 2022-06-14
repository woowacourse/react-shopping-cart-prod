import styled from 'styled-components';

import { Props } from './CheckBox.type';

const Input = styled.input`
  display: none;

  :checked + label {
    background: ${({ theme: { colors } }) => colors.redPink};
  }
`;

const Label = styled.label<{ marginBottom?: Props['marginBottom'] }>`
  display: inline-block;

  width: 15px;
  height: 15px;
  box-sizing: border-box;
  border: 1px solid ${({ theme: { colors } }) => colors.redPink};
  border-radius: 3px;

  margin-bottom: ${({ marginBottom }) => marginBottom};
  padding: 1px;

  background: ${({ theme: { colors } }) => colors.white};
  color: ${({ theme: { colors } }) => colors.white};

  cursor: pointer;

  div {
    width: 8px;
    height: 5px;
    border-bottom: 2px solid ${({ theme: { colors } }) => colors.white};
    border-left: 2px solid ${({ theme: { colors } }) => colors.white};
    transform: rotate(-45deg);
  }
`;

export { Input, Label };
