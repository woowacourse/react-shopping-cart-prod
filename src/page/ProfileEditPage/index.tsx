import Container from 'components/@shared/Container';
import Input from 'components/Input';
import Title from 'components/Title';
import Styled from './index.style';
import { ReactComponent as EmailIcon } from 'assets/email_icon.svg';
import { ReactComponent as NicknameIcon } from 'assets/nickname_icon.svg';
import AuthButton from 'components/AuthButton';

import { useState } from 'react';
import { validateNickname } from 'utils/validator';

const ProfileEditPage = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');

  const [isNicknameCorrect, setIsNicknameCorrect] = useState(false);

  return (
    <Styled.Container>
      <Container width="519px" height="612px">
        <div>
          <Title mainTitle="회원정보 수정" />
          <Input
            type="email"
            icon={<EmailIcon />}
            label="Email Address"
            inputValue={email}
            setInputValue={setEmail}
            isDisabled={true}
          />
          <Input
            icon={<NicknameIcon />}
            label="Nickname"
            inputValue={nickname}
            setInputValue={setNickname}
            validator={validateNickname}
            isCorrect={isNicknameCorrect}
            setIsCorrect={setIsNicknameCorrect}
          />
          <AuthButton
            actionType="Update Profile"
            action={() => {}}
            isDisabled={!isNicknameCorrect}
          />

          <Styled.Line />

          <Styled.ButtonContainer>
            <Styled.ChangePasswordButton onClick={() => {}}>
              Change password
            </Styled.ChangePasswordButton>

            <Styled.DeleteAccountButton onClick={() => {}}>
              Delete your account
            </Styled.DeleteAccountButton>
          </Styled.ButtonContainer>
        </div>
      </Container>
    </Styled.Container>
  );
};

export default ProfileEditPage;
