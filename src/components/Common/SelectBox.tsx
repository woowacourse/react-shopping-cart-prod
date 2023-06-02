import { SelectHTMLAttributes } from 'react';
import { styled } from 'styled-components';

interface SelectBoxProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

const SelectBox = ({ options, ...props }: SelectBoxProps) => {
  return (
    <StyledSelectBox {...props}>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </StyledSelectBox>
  );
};

const StyledSelectBox = styled.select`
  &:disabled {
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.gray200};
  }
`;

export default SelectBox;
