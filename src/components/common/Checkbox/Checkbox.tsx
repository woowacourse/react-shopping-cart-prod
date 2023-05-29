import { ComponentPropsWithoutRef } from 'react';

import { CheckedIcon, UncheckedIcon } from '../../../assets/svg';
import * as S from './Checkbox.styles';

type CheckboxProps = ComponentPropsWithoutRef<'input'>;

const Checkbox = ({ id, checked, ...attributes }: CheckboxProps) => {
  return (
    <label htmlFor={id}>
      <S.CheckboxInput id={id} checked={checked} {...attributes} />
      <S.CheckboxIconWrapper aria-label={id}>
        {checked ? <CheckedIcon /> : <UncheckedIcon />}
      </S.CheckboxIconWrapper>
    </label>
  );
};

export default Checkbox;
