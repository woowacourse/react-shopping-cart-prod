import * as S from './Link.styled';
import { Props } from './Link.type';

function Link({ to, disabled = false, children }: Props) {
  return (
    <S.Link to={to} disabled={disabled}>
      {children}
    </S.Link>
  );
}

export default Link;
