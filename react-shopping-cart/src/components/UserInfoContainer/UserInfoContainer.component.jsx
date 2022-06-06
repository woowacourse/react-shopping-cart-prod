import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import ArrowButton from 'components/@shared/ArrowButton/ArrowButton.component';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import InputBox from 'components/@shared/InputBox/InputBox.component';
import TextBox from 'components/@shared/TextBox/TextBox.component';

import { setAddress, setName, setPhone } from 'redux/actions/userInfo.action';

const UserInfoWrapper = styled(FlexBox).attrs({
  as: 'form',
  id: 'userInfo',
  width: '100%',
  direction: 'column',
  gap: '30px',
  alignItems: 'flex-end',
})`
  margin: 1rem 0;
`;

const PhoneInputBox = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr 7fr 1fr 7fr;
  text-align: center;
  align-items: center;
`;

function UserInfoContainer({ onClickNext }) {
  const dispatch = useDispatch();
  const { name, phone, address } = useSelector(state => state.userInfo);
  const isAllValid = !!(
    !name.error &&
    !phone.error &&
    !address.error &&
    name.value.length &&
    phone.first.length === 4 &&
    phone.second.length === 4 &&
    address.value.length
  );

  const handlePhoneInput = (e, place) => {
    if (e.target.value.length > 4) {
      return;
    }
    if (isNaN(e.nativeEvent.data)) {
      return;
    }

    dispatch(setPhone(place, e.target.value));
  };

  const handleShowNextForm = e => {
    e.preventDefault();
    onClickNext();
  };

  return (
    <UserInfoWrapper onSubmit={handleShowNextForm}>
      <InputBox
        {...name}
        onChange={e => {
          dispatch(setName(e.target.value));
        }}
        label="이름"
        type="text"
        placeholder="이름"
        errorMessage="이름을 30자 이내로 입력해주세요."
      />
      <FlexBox width="100%" direction="column" gap="5px">
        <label>전화번호</label>
        <PhoneInputBox>
          <span>010</span>-
          <InputBox
            value={phone.first}
            onChange={e => {
              handlePhoneInput(e, 'first');
            }}
            type="tel"
            placeholder="0000"
          />
          -
          <InputBox
            value={phone.second}
            onChange={e => {
              handlePhoneInput(e, 'second');
            }}
            type="tel"
            placeholder="0000"
          />
        </PhoneInputBox>
      </FlexBox>
      <InputBox
        {...address}
        onChange={e => {
          dispatch(setAddress(e.target.value));
        }}
        label="주소"
        type="text"
        placeholder="주소"
      />
      <FlexBox as="button" gap="5px" onClick={handleShowNextForm} disabled={!isAllValid}>
        <TextBox color={isAllValid ? 'BLACK_001' : 'GRAY_001'} fontSize="small">
          다음
        </TextBox>
        <ArrowButton direction="right" />
      </FlexBox>
    </UserInfoWrapper>
  );
}

export default UserInfoContainer;
