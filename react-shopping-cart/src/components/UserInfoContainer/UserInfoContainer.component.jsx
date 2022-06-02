import { useDispatch, useSelector } from 'react-redux';

import ArrowButton from 'components/@shared/ArrowButton/ArrowButton.component';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import InputBox from 'components/@shared/InputBox/InputBox.component';
import TextBox from 'components/@shared/TextBox/TextBox.component';

import { setAddress, setName, setPhoneNumber } from 'redux/actions/userInfo.action';

function UserInfoContainer({ onClickNext }) {
  const dispatch = useDispatch();
  const { name, phoneNumber, address } = useSelector(state => state.userInfo);

  return (
    <FlexBox id="userInfo" width="100%" direction="column" gap="17px" alignItems="flex-end">
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '4fr 1fr 7fr 1fr 7fr',
            textAlign: 'center',
            alignItems: 'center',
          }}
        >
          <span>010</span>-
          <InputBox
            {...phoneNumber.first}
            onChange={e => dispatch(setPhoneNumber('first', e.target.value))}
            type="tel"
            maxLength="4"
            placeholder="0000"
          />
          -
          <InputBox
            {...phoneNumber.second}
            onChange={e => {
              dispatch(setPhoneNumber('second', e.target.value));
            }}
            type="tel"
            maxLength="4"
            placeholder="0000"
          />
        </div>
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
      <FlexBox as="button" gap="5px" onClick={onClickNext}>
        <TextBox fontSize="small">다음</TextBox>
        <ArrowButton direction="right" />
      </FlexBox>
    </FlexBox>
  );
}

export default UserInfoContainer;
