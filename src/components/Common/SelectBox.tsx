import type { SelectHTMLAttributes } from 'react';
import styled from 'styled-components';

type SelectBoxVariant = 'small';

interface SelectBoxProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  variant?: SelectBoxVariant;
  autoSize?: boolean;
}

const SelectBox = ({
  options,
  variant = 'small',
  autoSize = false,
  ...props
}: SelectBoxProps) => {
  return (
    <Select variant={variant} autoSize={autoSize} {...props}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};

const selectBoxStyles = {
  small: {
    width: '60px',
    height: '30px',
    padding: '0 4px',
  },
};

const Select = styled.select<{
  variant: SelectBoxVariant;
  autoSize: boolean;
}>`
  ${({ variant }) => selectBoxStyles[variant]}
  width: ${({ variant, autoSize }) =>
    autoSize ? '100%' : selectBoxStyles[variant].width};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray400};
  border-radius: 0;
`;

export default SelectBox;
