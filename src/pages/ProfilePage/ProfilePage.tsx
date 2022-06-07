import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDaumPostcode from 'hooks/useDaumPostcode';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import ICONS from 'constants/icons';
import * as S from 'pages/ProfilePage/ProfilePage.styled';
import { SERVER_URL } from 'configs/api';
import useForm from 'hooks/useForm';
import Spinner from 'components/Spinner/Spinner';

function ProfilePage() {
  const navigate = useNavigate();
  const { postcode, addressData, setAddressData } = useDaumPostcode();
  const {
    isSubmitting,
    watchingValues,
    errors,
    touched,
    registerForm,
    registerInput,
  } = useForm({ validationMode: 'onchange', shouldUseReportValidity: false });
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);
  const [defaultValues, setDefaultValues] =
    useState<
      Record<
        HTMLInputElement['name'],
        React.InputHTMLAttributes<HTMLInputElement>['value']
      >
    >();

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
          url: `${SERVER_URL}/api/customers/${customerId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setDefaultValues((prev) => ({
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
    const payload = extractPayloadWithForm(e.target as HTMLFormElement);

    try {
      if (!isValidConfirmPassword || !addressData) {
        throw new Error('패스워드 확인, 주소 중 유효하지 않은 값이 있습니다.');
      }

      const accessToken = localStorage.getItem('accessToken');
      const customerId = localStorage.getItem('userId');

      await axios({
        method: 'put',
        url: `${SERVER_URL}/api/customers/${customerId}`,
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
        url: `${SERVER_URL}/api/customers/${customerId}`,
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

  const handleError: React.FormEventHandler<HTMLFormElement> = ({ target }) => {
    const { elements } = target as HTMLFormElement;
    const firstInvalidInput = Array.from(elements).find((element) => {
      const { validationMessage } = element as HTMLInputElement;

      return validationMessage !== '';
    }) as HTMLInputElement;

    alert(`${firstInvalidInput.validationMessage} [${firstInvalidInput.name}]`);
    firstInvalidInput.focus();
  };

  if (!defaultValues) return <Spinner />;

  return (
    <S.PageBox>
      <S.Form
        {...registerForm({ onSubmit: handleSubmit, onError: handleError })}
      >
        <S.FormFieldBox>
          <S.LeftFlexBox>
            <S.Label required>이메일</S.Label>
          </S.LeftFlexBox>
          <S.CenterFlexBox>
            <Input
              type="email"
              name="email"
              defaultValue={defaultValues['email']}
              required
              readOnly
            />
          </S.CenterFlexBox>
          <S.RightFlexBox></S.RightFlexBox>
        </S.FormFieldBox>

        <S.FormFieldBox>
          <S.LeftFlexBox>
            <S.Label required>비밀번호</S.Label>
          </S.LeftFlexBox>
          <S.CenterFlexBox>
            <Input
              type="password"
              {...registerInput('password', {
                placeholder: '비밀번호를 입력해주세요.',
                minLength: 8,
                maxLength: 20,
                pattern:
                  "(?=.*[0-9])(?=.*[a-z])(?=.*[!@#&()\\-\\[{}\\]:;',?/*~$^+=<>]).{8,20}",
                patternMessage:
                  '비밀번호는 하나 이상의 영문자, 숫자, 특수문자로 이루어져야 합니다.',
                required: true,
                watch: true,
                onChange: (e) => {
                  setIsValidConfirmPassword(
                    watchingValues['confirm-password'] === e.target.value
                  );
                },
              })}
            />
            {touched['password'] && errors['password']?.length > 0 && (
              <S.HintParagraph>{errors['password']}</S.HintParagraph>
            )}
          </S.CenterFlexBox>
          <S.RightFlexBox />
        </S.FormFieldBox>

        <S.FormFieldBox>
          <S.LeftFlexBox>
            <S.Label required>비밀번호 확인</S.Label>
          </S.LeftFlexBox>
          <S.CenterFlexBox>
            <Input
              type="password"
              {...registerInput('confirm-password', {
                placeholder: '비밀번호를 한번 더 입력해주세요.',
                minLength: 8,
                maxLength: 20,
                pattern:
                  "(?=.*[0-9])(?=.*[a-z])(?=.*[!@#&()\\-\\[{}\\]:;',?/*~$^+=<>]).{8,20}",
                patternMessage:
                  '비밀번호는 하나 이상의 영문자, 숫자, 특수문자로 이루어져야 합니다.',
                required: true,
                watch: true,
                onChange: (e) => {
                  setIsValidConfirmPassword(
                    watchingValues['password'] === e.target.value
                  );
                },
              })}
            />
            {(touched['confirm-password'] &&
              errors['confirm-password']?.length > 0 && (
                <S.HintParagraph>{errors['confirm-password']}</S.HintParagraph>
              )) ||
              (touched['confirm-password'] && !isValidConfirmPassword && (
                <S.HintParagraph>비밀번호가 다릅니다.</S.HintParagraph>
              ))}
          </S.CenterFlexBox>
          <S.RightFlexBox />
        </S.FormFieldBox>

        <S.FormFieldBox>
          <S.LeftFlexBox>
            <S.Label required>이름</S.Label>
          </S.LeftFlexBox>
          <S.CenterFlexBox>
            <Input
              type="text"
              defaultValue={defaultValues['name']}
              {...registerInput('name', {
                placeholder: '이름을 입력해주세요.',
                minLength: 2,
                maxLength: 5,
                required: true,
              })}
            />
            {touched['name'] && errors['name'] && errors['name'].length > 0 && (
              <S.HintParagraph>{errors['name']}</S.HintParagraph>
            )}
          </S.CenterFlexBox>
          <S.RightFlexBox />
        </S.FormFieldBox>

        <S.FormFieldBox>
          <S.LeftFlexBox>
            <S.Label required>전화번호</S.Label>
          </S.LeftFlexBox>
          <S.CenterFlexBox>
            <Input
              type="tel"
              defaultValue={defaultValues['contact']}
              {...registerInput('contact', {
                placeholder: '01012345678',
                minLength: 8,
                maxLength: 11,
                pattern: '[0-9]{8,11}',
                patternMessage: '전화번호는 8~11 자리 사이의 숫자여야 합니다.',
                required: true,
              })}
            />
            {touched['contact'] && errors['contact']?.length > 0 && (
              <S.HintParagraph>{errors['contact']}</S.HintParagraph>
            )}
          </S.CenterFlexBox>
          <S.RightFlexBox>
            <S.Button disabled>인증번호 받기</S.Button>
          </S.RightFlexBox>
        </S.FormFieldBox>

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
              defaultValue={defaultValues['detailAddress']}
              maxLength={20}
              placeholder="상세 주소"
              disabled={!addressData}
            />
          </S.CenterFlexBox>
          <S.RightFlexBox />
        </S.FormFieldBox>

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
                  defaultChecked={defaultValues['gender'] === 'male'}
                  {...registerInput('gender', {})}
                />
                남성
              </label>
              <label>
                <input
                  type="radio"
                  value="female"
                  defaultChecked={defaultValues['gender'] === 'female'}
                  {...registerInput('gender', {})}
                />
                여성
              </label>
              <label>
                <input
                  type="radio"
                  value="undefined"
                  defaultChecked={defaultValues['gender'] === 'undefined'}
                  {...registerInput('gender', {})}
                />
                선택 안함
              </label>
            </S.RadioButtonBox>
          </S.CenterFlexBox>
          <S.RightFlexBox />
        </S.FormFieldBox>

        <S.FormFieldBox>
          <S.LeftFlexBox>
            <S.Label>생년월일</S.Label>
          </S.LeftFlexBox>
          <S.CenterFlexBox>
            <Input
              type="date"
              name="birthday"
              defaultValue={defaultValues['birthday']}
              readOnly
            />
          </S.CenterFlexBox>
          <S.RightFlexBox />
        </S.FormFieldBox>

        <S.ButtonBox>
          <Button type="submit" disabled={isSubmitting}>
            다음으로
          </Button>
          <Button
            color="red"
            type="button"
            onClick={handleClickUnregisterButton}
            disabled={isSubmitting}
          >
            계정 삭제하기
          </Button>
        </S.ButtonBox>
      </S.Form>
    </S.PageBox>
  );
}

export default ProfilePage;
