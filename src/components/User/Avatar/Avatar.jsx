import * as Styled from './style';
import avatarImg from 'assets/png/avatarImg.png';

const Avatar = () => {
  return (
    <Styled.Wrapper>
      <Styled.Thumbnail src={avatarImg} />
    </Styled.Wrapper>
  );
};

export default Avatar;
