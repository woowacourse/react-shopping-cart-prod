import React, { ComponentPropsWithoutRef } from 'react';

export type Props = {
  label: string;
  hasButton?: boolean;
  buttonTitle?: string;
  onClickButton?: React.MouseEventHandler<HTMLButtonElement>;
} & ComponentPropsWithoutRef<'input'>;

export interface LabelWithRequired extends React.HTMLProps<HTMLLabelElement> {
  required?: Props['required'];
}
