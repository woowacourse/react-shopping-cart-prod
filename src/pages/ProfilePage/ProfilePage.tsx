import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useDaumPostcode from '../../hooks/useDaumPostcode';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import ICONS from '../../constants/icons';
import * as S from './ProfilePage.styled';
import { useNavigate } from 'react-router-dom';

// 이메일 생일 수정 x

function ProfilePage() {
  const { postcode, addressData, setAddressData } = useDaumPostcode();
  const navigate = useNavigate();
  const [watchingValues, setWatchingValues] = useState({
    password: '',
    'confirm-password': '',
    name: '',
    contact: '',
    email: '',
    detailAddress: '',
    gender: '',
    birthday: '',
  });

  const [isConfirmPasswordSame, setIsConfirmPasswordSame] = useState(false);

  const handleChange: React.FormEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { name, value } = target as HTMLInputElement;

    if (name === 'password') {
      setIsConfirmPasswordSame(
        watchingValues['confirm-password'] === value && value !== ''
      );
    }

    if (name === 'confirm-password') {
      setIsConfirmPasswordSame(
        watchingValues['password'] === value && value !== ''
      );
    }

    setWatchingValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const customerId = localStorage.getItem('userId');

      const loadUserInfo = async () => {
        const {
          data: {
            name,
            contact,
            email,
            fullAddress: { zoneCode, address, detailAddress },
            gender,
            birthday,
          },
        } = await axios({
          method: 'get',
          data: '',
          url: `http://15.164.166.148:8080/api/customers/${customerId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setWatchingValues((prev) => ({
          ...prev,
          name,
          contact,
          email,
          gender,
          detailAddress,
          birthday,
        }));

        setAddressData({
          zonecode: zoneCode,
          address,
        });
      };

      loadUserInfo();
    } catch (e) {
      console.error('error');
    }
  }, [setAddressData]);

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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const payload = extractPayloadWithForm(e.target as HTMLFormElement);

    try {
      if (!isConfirmPasswordSame || !addressData) {
        throw new Error('패스워드 확인, 주소 중 유효하지 않은 값이 있습니다.');
      }

      const accessToken = localStorage.getItem('accessToken');
      const customerId = localStorage.getItem('userId');

      await axios({
        method: 'put',
        url: `http://15.164.166.148:8080/api/customers/${customerId}`,
        data: payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      alert('회원 정보가 수정되었습니다.');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert('유효하지 않은 이메일 형식입니다.');
      } else {
        alert(e);
      }
    }
  };

  const handleClickUnregisterButton = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const customerId = localStorage.getItem('userId');

    try {
      await axios({
        method: 'delete',
        url: `http://15.164.166.148:8080/api/customers/${customerId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');

      alert('계정이 삭제되었습니다.');

      navigate('/');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert('요청을 실패했습니다.');
      } else {
        alert(e);
      }
    }
  };

  return (
    <S.PageBox>
      <S.Form onSubmit={handleSubmit}>
        <S.FormFieldBox>
          <S.LeftFlexBox>
            <S.Label required>이메일</S.Label>
          </S.LeftFlexBox>
          <S.CenterFlexBox>
            <Input
              type="email"
              name="email"
              value={watchingValues['email']}
              pattern="[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.([a-zA-Z])+"
              required
              readOnly
            />
          </S.CenterFlexBox>
          <S.RightFlexBox></S.RightFlexBox>
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
              pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[!@#&()-\[{}\]:;',?/*~$^+=<>]).{8,20}"
              value={watchingValues['password']}
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
            {isConfirmPasswordSame && (
              <S.HintParagraph>비밀번호가 일치합니다.</S.HintParagraph>
            )}
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
              value={watchingValues['name']}
              placeholder="이름을 입력해주세요."
              minLength={2}
              maxLength={5}
              onChange={handleChange}
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
              value={watchingValues['contact']}
              placeholder="01012345678"
              pattern="[0-9]{8,11}"
              onChange={handleChange}
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
              value={watchingValues['detailAddress']}
              onChange={handleChange}
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
                <input
                  type="radio"
                  value="male"
                  name="gender"
                  checked={watchingValues['gender'] === 'male'}
                  onChange={handleChange}
                />
                남성
              </label>
              <label>
                <input
                  type="radio"
                  value="female"
                  name="gender"
                  checked={watchingValues['gender'] === 'female'}
                  onChange={handleChange}
                />
                여성
              </label>
              <label>
                <input
                  type="radio"
                  value="undefined"
                  name="gender"
                  checked={watchingValues['gender'] === 'undefined'}
                  onChange={handleChange}
                />
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
              value={watchingValues['birthday']}
              readOnly
            />
          </S.CenterFlexBox>
          <S.RightFlexBox />
        </S.FormFieldBox>
        {/* ------------------------------------ */}
        <S.ButtonBox>
          <Button type="submit">다음으로</Button>
          <Button
            color="red"
            type="button"
            onClick={handleClickUnregisterButton}
          >
            계정 삭제하기
          </Button>
        </S.ButtonBox>
      </S.Form>
    </S.PageBox>
  );
}

export default ProfilePage;
