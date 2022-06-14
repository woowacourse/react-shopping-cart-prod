import * as S from './Link.styled';
import { Props } from './Link.type';

function Link({ to, children }: Props) {
  return <S.Link to={to}>{children}</S.Link>;
}

export default Link;
