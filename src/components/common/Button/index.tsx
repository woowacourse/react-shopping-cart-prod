import { styled } from 'styled-components';
import { theme } from '@styles/theme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  height?: string;
}

function Button({ text, height = '7.4rem', ...rest }: ButtonProps) {
  return (
    <Container height={height} {...rest}>
      {text}
    </Container>
  );
}

const Container = styled.button<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};

  text-align: center;
  font-weight: 400;
  font-size: 2.4rem;
  line-height: 3.5rem;

  color: ${theme.colors.lightColor};
  background-color: ${theme.colors.primaryColor};

  cursor: pointer;
`;

export default Button;
