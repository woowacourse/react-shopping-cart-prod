import ArrowButton from 'components/@shared/ArrowButton/ArrowButton.component';
import Button from 'components/@shared/Button/Button.component';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import Input from 'components/@shared/Input/Input.component';
import InputBox from 'components/@shared/InputBox/InputBox.component';
import TextBox from 'components/@shared/TextBox/TextBox.component';

function UserInfoContainer({ onClickNext }) {
  return (
    <FlexBox id="userInfo" width="100%" direction="column" gap="17px">
      <InputBox label="이름" type="text" placeholder="이름" />
      <FlexBox width="100%" direction="column" gap="5px">
        <label>전화번호</label>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '4fr 1fr 7fr 1fr 7fr',
            textAlign: 'center',
            alignItems: 'center',
          }}
        >
          <span>010</span>-<Input type="number" placeholder="0000" />-
          <Input type="number" placeholder="0000" />
        </div>
      </FlexBox>
      <InputBox label="주소" type="text" placeholder="주소" />
      <FlexBox as="button" gap="5px" onClick={onClickNext}>
        <ArrowButton direction="left" />
        <TextBox fontSize="small">이전</TextBox>
      </FlexBox>
      <Button width="100%" borderRadius="10px">
        <TextBox color="WHITE_001">회원가입</TextBox>
      </Button>
    </FlexBox>
  );
}

export default UserInfoContainer;
