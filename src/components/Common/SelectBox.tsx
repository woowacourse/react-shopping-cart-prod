import type { OptionHTMLAttributes, SelectHTMLAttributes } from 'react';
import styled from 'styled-components';

import {
  ComponentVariant,
  SelectBoxStyleProps,
  selectBoxStyles,
} from '../../styles/component';

interface SelectOption extends OptionHTMLAttributes<HTMLOptionElement> {
  text: string;
}

interface SelectBoxProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  variant?: Extract<ComponentVariant, 'small'>;
  title?: string;
  autoSize?: boolean;
}

const SelectBox = ({
  options,
  title,
  variant = 'small',
  autoSize = false,
  ...props
}: SelectBoxProps) => {
  return (
    <Select variant={variant} autoSize={autoSize} {...props}>
      {title && (
        <option value='' selected disabled>
          {title}
        </option>
      )}
      {options.map(({ value, text, disabled }, index) => (
        <option key={`${text}-${index}`} value={value} disabled={disabled}>
          {text}
        </option>
      ))}
    </Select>
  );
};

const Select = styled.select<SelectBoxStyleProps>`
  ${({ variant }) => selectBoxStyles[variant]}
  width: ${({ variant, autoSize }) =>
    autoSize ? '100%' : selectBoxStyles[variant].width};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray400};
  border-radius: 0;
`;

export default SelectBox;
