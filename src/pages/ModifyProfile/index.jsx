import Title from 'components/Common/Title/Title';
import Button from 'components/Common/Button/Button';
import Profile from 'components/User/Profile/Profile';
import * as Styled from './style';

const ModifyProfile = () => {
  return (
    <Styled.Wrapper>
      <Title contents="회원정보 수정" />
      <Styled.Contents>
        <Profile name="콜라" />
        <Styled.ButtonContainer>
          <Button colorType="primary">비밀번호 수정</Button>
          <Button colorType="tertiary">회원 탈퇴</Button>
        </Styled.ButtonContainer>
      </Styled.Contents>
    </Styled.Wrapper>
  );
};

export default ModifyProfile;
