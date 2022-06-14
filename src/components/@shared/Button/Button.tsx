import * as S from './Button.styled';
import { Props } from './Button.type';

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
    <S.Button
      type={type}
      onClick={onClick}
      width={width}
      height={height}
      marginTop={marginTop}
      reverse={reverse}
    >
      {children}
    </S.Button>
  );
}

export default Button;
