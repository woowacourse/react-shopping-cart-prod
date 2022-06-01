import ArrowButton from 'components/@shared/ArrowButton/ArrowButton.component';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import InputBox from 'components/@shared/InputBox/InputBox.component';
import TextBox from 'components/@shared/TextBox/TextBox.component';

function LoginInfoContainer({ onClickPrev }) {
  return (
    <FlexBox id="loginInfo" width="100%" direction="column" gap="17px" alignItems="flex-end">
      <InputBox label="이메일" type="email" placeholder="이메일" />
      <InputBox label="비밀번호" type="password" placeholder="비밀번호" />
      <InputBox label="비밀번호 확인" type="password" placeholder="비밀번호 확인" />
      <FlexBox as="button" gap="5px" onClick={onClickPrev}>
        <TextBox fontSize="small">다음</TextBox>
        <ArrowButton direction="right" />
      </FlexBox>
    </FlexBox>
  );
}

export default LoginInfoContainer;
