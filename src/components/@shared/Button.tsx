import styled, { css } from 'styled-components';

const getSizeDetail = (size: Props['size']) => {
  switch (size) {
    case 'small': {
      return {
        width: '60%',
        height: '35px',
      };
    }
    case 'medium': {
      return {
        width: '100%',
        height: '40px',
      };
    }
    default: {
      return { width: '', height: '' };
    }
  }
};

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium';
  marginTop?: string;
  reverse?: boolean;
  children: React.ReactNode;
}

function Button({
  type = 'submit',
  onClick,
  size = 'medium',
  marginTop,
  reverse = false,
  children,
}: Props) {
  const { width, height } = getSizeDetail(size);

  return (
    <StyledButton
      type={type}
      onClick={onClick}
      width={width}
      height={height}
      marginTop={marginTop}
      reverse={reverse}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  /* background: ${({ theme: { colors } }) => colors.redPink};
  color: ${({ theme: { colors } }) => colors.white}; */
  border-radius: 5px;

  font-size: 17px;
  font-weight: 900;

  ${({
    width,
    height,
    marginTop,
    reverse,
  }: {
    width: string;
    height: string;
    marginTop: Props['marginTop'];
    reverse: Props['reverse'];
  }) => css`
    width: ${width};
    height: ${height};
    margin-top: ${marginTop};
    ${reverse
      ? css`
          background: ${({ theme: { colors } }) => colors.white};
          color: ${({ theme: { colors } }) => colors.redPink};
          border: 1px solid ${({ theme: { colors } }) => colors.redPink};
        `
      : css`
          background: ${({ theme: { colors } }) => colors.redPink};
          color: ${({ theme: { colors } }) => colors.white};
        `}
  `}
`;

export default Button;
