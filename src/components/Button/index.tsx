import * as S from './style';

type ButtonProps = {
  text: string;
  width?: string;
  backgroundColor?: string;
  onClick?: () => void;
  disable?: boolean;
};

function Button({ text, width = '100%', backgroundColor = '#000000', onClick, disable = false }: ButtonProps) {
  return (
    <S.Button disable={disable} width={width} backgroundColor={backgroundColor} onClick={onClick}>
      {text}
    </S.Button>
  );
}

export default Button;
