import { ComponentPropsWithoutRef } from 'react';

import * as S from './Select.styles';

interface SelectProps extends ComponentPropsWithoutRef<'select'> {
  options: { [key: string]: string | undefined };
}

const Select = ({ options, id, value, onChange }: SelectProps) => {
  return (
    <S.SelectLabel htmlFor={id}>
      <S.Select id={id} value={value} onChange={onChange}>
        {Object.entries(options).map(([key, value]) => (
          <S.SelectOption key={key} value={value ?? ''}>
            {key}
          </S.SelectOption>
        ))}
      </S.Select>
    </S.SelectLabel>
  );
};

export default Select;
