import { ComponentPropsWithoutRef } from 'react';

export type Props = ComponentPropsWithoutRef<'input'>;

export interface LabelWithRequired extends React.HTMLProps<HTMLLabelElement> {
  required?: Props['required'];
}
