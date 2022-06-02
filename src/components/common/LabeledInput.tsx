import React from 'react';
import styled from 'styled-components';
import { PartialRequired } from 'types/utilities';

interface LabeledInputProps
  extends PartialRequired<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder' | 'type'> {
  label: string;
  id: string;
}

const LabeledInput = ({ label, id, ...props }: LabeledInputProps) => {
  return (
    <StyledRoot>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledInput required id={id} {...props} />
    </StyledRoot>
  );
};

export default LabeledInput;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

const StyledLabel = styled.label`
  font-size: 16px;
`;

const StyledInput = styled.input`
  padding-left: 15px;
  border-radius: 4px;
  height: 36px;
  width: 100%;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_bbb};
  ::placeholder {
    color: ${({ theme }) => theme.colors.GRAY_888};
  }
`;
