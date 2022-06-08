import { Customer } from 'types';
import * as S from 'components/Avatar/Avatar.styled';

function Avatar({ profileImageUrl }: Pick<Customer, 'profileImageUrl'>) {
  return (
    <S.AvatarBox>
      <S.AvatarImage src={profileImageUrl} alt="프로필 이미지" loading="lazy" />
    </S.AvatarBox>
  );
}

export default Avatar;
