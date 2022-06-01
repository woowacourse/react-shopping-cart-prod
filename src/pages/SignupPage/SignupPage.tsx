import axios from 'axios';
import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import DivideLine from '../../components/DivideLine/DivideLine';
import Input from '../../components/Input/Input';
import Stepper from '../../components/Stepper/Stepper';
import ICONS from '../../constants/icons';
import useDaumPostcode from '../../hooks/useDaumPostcode';
import * as S from './SignupPage.styled';

const SIGNUP_STEPS = [
  {
    id: '/agree-to-term',
    title: '약관동의',
  },
  {
    id: '/fill-info',
    title: '정보입력',
  },
  {
    id: '/completion',
    title: '가입완료',
  },
];

function SignupPage() {
  const { postcode, addressData } = useDaumPostcode();
  const [values, setValues] = useState<Record<string, any>>({
    email: '',
  });

  const handleChange: React.FormEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { name, value } = target as HTMLInputElement;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickAddressButton = () => {
    postcode?.open();
  };

  const extractPayloadWithForm = (formElement: HTMLFormElement) => {
    const formData = new FormData(formElement);
    const {
      email,
      password,
      name,
      gender,
      birthday,
      contact,
      address,
      detailAddress,
      zoneCode,
    } = Object.fromEntries(formData.entries());

    return {
      email,
      password,
      profileImageUrl: `http://gravatar.com/avatar/${Date.now()}?d=identicon`,
      name,
      gender,
      birthday,
      contact,
      fullAddress: { address, detailAddress, zoneCode },
      terms: true,
    };
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const payload = extractPayloadWithForm(e.target as HTMLFormElement);

    try {
      axios({
        method: 'post',
        url: 'http://15.164.166.148:8080/api/customers',
        data: payload,
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert('유효하지 않은 이메일 형식입니다.');
      } else {
        alert(e);
      }
    }
  };

  const handleClickIsEmailDuplicated = () => {
    const email = values['email'];

    try {
      axios({
        method: 'get',
        url: `http://15.164.166.148:8080/api/validation?email=${email}`,
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert('중복된 이메일입니다.');
      } else {
        alert(e);
      }
    }
  };

  return (
    <S.PageBox>
      <Stepper stepList={SIGNUP_STEPS} currentStepId={SIGNUP_STEPS[1].id} />
      <DivideLine color="gray" thickness="thin" />
      <S.Form onSubmit={handleSubmit}>
        <S.FormFieldBox>
          <S.LeftFlexBox>
            <S.Label required>이메일</S.Label>
          </S.LeftFlexBox>
          <S.CenterFlexBox>
            <Input
              type="email"
              name="email"
              placeholder="woowashop@woowahan.com"
              pattern="[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.([a-zA-Z])+"
              required
              onChange={handleChange}
            />
          </S.CenterFlexBox>
          <S.RightFlexBox>
            <S.Button type="button" onClick={handleClickIsEmailDuplicated}>
              중복 확인
            </S.Button>
          </S.RightFlexBox>
        </S.FormFieldBox>
        {/* ------------------------------------ */}
        <S.FormFieldBox>
          <S.LeftFlexBox>
            <S.Label required>비밀번호</S.Label>
          </S.LeftFlexBox>
          <S.CenterFlexBox>
            <Input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              minLength={8}
              maxLength={20}
              pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[!@#&()–\[{}\]:;',?/*~$^+=<>]).{8,20}"
              required
            />
          </S.CenterFlexBox>
          <S.RightFlexBox />
        </S.FormFieldBox>
        {/* ------------------------------------ */}
        <S.FormFieldBox>
          <S.LeftFlexBox>
            <S.Label required>비밀번호 확인</S.Label>
          </S.LeftFlexBox>
          <S.CenterFlexBox>
            <Input
              type="password"
              name="confirm-password"
              placeholder="비밀번호를 한번 더 입력해주세요."
              minLength={8}
              maxLength={20}
              pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[!@#&()-\[{}\]:;',?/*~$^+=<>]).{8,20}"
              required
            />
          </S.CenterFlexBox>
          <S.RightFlexBox />
        </S.FormFieldBox>
        {/* ------------------------------------ */}
        <S.FormFieldBox>
          <S.LeftFlexBox>
            <S.Label required>이름</S.Label>
          </S.LeftFlexBox>
          <S.CenterFlexBox>
            <Input
              type="text"
              name="name"
              placeholder="이름을 입력해주세요."
              minLength={2}
              maxLength={5}
              required
            />
          </S.CenterFlexBox>
          <S.RightFlexBox />
        </S.FormFieldBox>
        {/* ------------------------------------ */}
        <S.FormFieldBox>
          <S.LeftFlexBox>
            <S.Label required>전화번호</S.Label>
          </S.LeftFlexBox>
          <S.CenterFlexBox>
            <Input
              type="tel"
              name="contact"
              placeholder="01012345678"
              pattern="[0-9]{8,11}"
              required
            />
          </S.CenterFlexBox>
          <S.RightFlexBox>
            <S.Button disabled>인증번호 받기</S.Button>
          </S.RightFlexBox>
        </S.FormFieldBox>
        {/* ------------------------------------ */}
        <S.FormFieldBox>
          <S.LeftFlexBox>
            <S.Label required>주소</S.Label>
          </S.LeftFlexBox>
          <S.CenterFlexBox>
            <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
              <Input
                type="text"
                name="zoneCode"
                placeholder="우편번호"
                value={addressData?.zonecode}
                readOnly
              />
              <S.Button type="button" onClick={handleClickAddressButton}>
                {ICONS.SEARCH}주소 검색
              </S.Button>
            </div>
            <Input
              type="text"
              name="address"
              placeholder="주소"
              value={addressData?.address}
              readOnly
            />
            <Input
              type="text"
              name="detailAddress"
              maxLength={20}
              placeholder="상세 주소"
              disabled={!addressData}
            />
          </S.CenterFlexBox>
          <S.RightFlexBox />
        </S.FormFieldBox>
        {/* ------------------------------------ */}
        <S.FormFieldBox>
          <S.LeftFlexBox>
            <S.Label>성별</S.Label>
          </S.LeftFlexBox>
          <S.CenterFlexBox>
            <S.RadioButtonBox>
              <label>
                <input type="radio" value="male" name="gender" />
                남성
              </label>
              <label>
                <input type="radio" value="female" name="gender" />
                여성
              </label>
              <label>
                <input type="radio" value="undefined" name="gender" checked />
                선택 안함
              </label>
            </S.RadioButtonBox>
          </S.CenterFlexBox>
          <S.RightFlexBox />
        </S.FormFieldBox>
        {/* ------------------------------------ */}
        <S.FormFieldBox>
          <S.LeftFlexBox>
            <S.Label>생년월일</S.Label>
          </S.LeftFlexBox>
          <S.CenterFlexBox>
            <Input
              type="date"
              name="birthday"
              min="1900-01-01"
              max="2022-06-01"
            />
          </S.CenterFlexBox>
          <S.RightFlexBox />
        </S.FormFieldBox>
        {/* ------------------------------------ */}
        <S.SubmitButtonBox>
          <Button type="submit">다음으로</Button>
        </S.SubmitButtonBox>
      </S.Form>
    </S.PageBox>
  );
}

export default SignupPage;
