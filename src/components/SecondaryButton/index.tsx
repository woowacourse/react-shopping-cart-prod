import * as S from './style';

function SecondaryButton({ text, onClick }: { text: string; onClick?: () => void }) {
  return <S.Button onClick={onClick}>{text}</S.Button>;
}

export default SecondaryButton;
