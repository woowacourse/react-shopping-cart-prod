import { StyleCheckBox, StyleCheckMark, StyleLabel } from './CheckBox.style';

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'checkbox';
  checked?: boolean;
  onChange?: () => void;
  boxsize?: 'small' | 'medium' | 'large';
}

export const CheckBox = ({ type, boxsize, ...restProps }: CheckBoxProps) => (
  <StyleLabel>
    <StyleCheckBox data-testid="checkbox" boxsize={boxsize} type={type} {...restProps} />
    <StyleCheckMark boxsize={boxsize} />
  </StyleLabel>
);

export default CheckBox;
