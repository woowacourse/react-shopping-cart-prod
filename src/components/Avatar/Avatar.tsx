import { Customer } from '../../types';
import * as S from './Avatar.styled';

function Avatar({
  name,
  profileImageUrl,
}: Pick<Customer, 'name' | 'profileImageUrl'>) {
  return (
    <S.AvatarBox>
      <S.AvatarImage src={profileImageUrl} alt={`${name}의 프로필 이미지`} />
    </S.AvatarBox>
  );
}

export default Avatar;
