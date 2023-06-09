import type { RuleSet } from 'styled-components';
import { css, styled } from 'styled-components';

type InputSize = 'small' | 'medium';

type InputContainerProps = {
  $size: InputSize;
};

const styledBySize: Record<InputSize, RuleSet<object>> = {
  small: css`
    padding: 16px;
    font-size: 16px;
  `,
  medium: css`
    padding: 24px;
    font-size: 24px;
  `,
};

const InputContainer = styled.input<InputContainerProps>`
  display: block;
  width: 100%;
  border: 1px solid #999999;

  ${(props) => styledBySize[props.$size]}
`;

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: InputSize;
};

const Input = (props: InputProps) => {
  const { size = 'medium', ...inputProps } = props;

  return <InputContainer $size={size} {...inputProps} />;
};

export default Input;
