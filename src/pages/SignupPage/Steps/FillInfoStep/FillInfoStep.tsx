import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useDaumPostcode from 'hooks/useDaumPostcode';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import ICONS from 'constants/icons';
import * as S from './FillInfoStep.styled';
import { useOutletContext } from 'react-router-dom';
import { Customer, StoreState } from 'types';
import { SERVER_URL } from 'configs/api';
import useForm from 'hooks/useForm';
import { formatDate } from 'utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'redux/actions';

function FillInfoStep() {
  const dispatch = useDispatch();
  const { isSignupSuccessful } = useSelector<
    StoreState,
    StoreState['customerState']
  >(({ customerState }) => customerState);
  const { goNextStep } = useOutletContext<{
    stepId: number;
    goNextStep: () => void;
  }>();
  const { postcode, addressData } = useDaumPostcode();

  const [isEmailUnique, setIsEmailUnique] = useState(false);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);
  const {
    isSubmitting,
    watchingValues,
    errors,
    touched,
    registerForm,
    registerInput,
  } = useForm({ validationMode: 'onchange', shouldUseReportValidity: false });

  const handleClickAddressButton = () => {
    postcode?.open();
  };

  const extractPayloadWithForm = (formElement: HTMLFormElement) => {
    const formData = new FormData(formElement);

    formData.delete('confirm-password');

    const customerInfo = Object.fromEntries(formData.entries());

    return {
      ...customerInfo,
      profileImageUrl: `http://gravatar.com/avatar/${Date.now()}?d=identicon`,
      terms: true,
    };
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    const payload = extractPayloadWithForm(
      e.target as HTMLFormElement
    ) as Customer;

    try {
      if (!isEmailUnique || !isValidConfirmPassword || !addressData) {
        throw new Error(
          '이메일, 비밀번호, 주소 중 유효하지 않은 값이 있습니다.'
        );
      }

      dispatch(actions.signUp(payload));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert('유효하지 않은 이메일 형식입니다.');
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

  const handleClickIsEmailDuplicated = async () => {
    const email = watchingValues['email'];

    try {
      await axios({
        method: 'get',
        url: `${SERVER_URL}/api/validation?email=${email}`,
      });

      setIsEmailUnique(true);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert('중복된 이메일입니다.');
      } else {
        alert(e);
      }
    }
  };

  useEffect(() => {
    if (isSignupSuccessful) {
      const payload = {
        email: watchingValues.email,
        password: watchingValues.password,
      } as { email: string; password: string };

      dispatch(actions.signIn(payload));

      goNextStep();
    }
  }, [
    isSignupSuccessful,
    dispatch,
    goNextStep,
    watchingValues.email,
    watchingValues.password,
  ]);

  return (
    <S.Form {...registerForm({ onSubmit: handleSubmit, onError: handleError })}>
      <S.FormFieldBox>
        <S.LeftFlexBox>
          <S.Label required>이메일</S.Label>
        </S.LeftFlexBox>
        <S.CenterFlexBox>
          <Input
            type="email"
            {...registerInput('email', {
              placeholder: 'woowashop@woowahan.com',
              maxLength: 50,
              pattern:
                '[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.([a-zA-Z])+',
              patternMessage: '이메일 형식에 맞지 않습니다.',
              required: true,
              watch: true,
              onChange: () => {
                setIsEmailUnique(false);
              },
            })}
          />
          {(touched['email'] && errors['email']?.length > 0 && (
            <S.HintParagraph>{errors['email']}</S.HintParagraph>
          )) ||
            (touched['email'] && !isEmailUnique && (
              <S.HintParagraph>이메일 중복 확인이 필요합니다.</S.HintParagraph>
            ))}
        </S.CenterFlexBox>
        <S.RightFlexBox>
          <S.Button type="button" onClick={handleClickIsEmailDuplicated}>
            중복 확인
          </S.Button>
        </S.RightFlexBox>
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
              name="zonecode"
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
                {...registerInput('gender', {})}
              />
              남성
            </label>
            <label>
              <input
                type="radio"
                value="female"
                {...registerInput('gender', {})}
              />
              여성
            </label>
            <label>
              <input
                type="radio"
                value="undefined"
                defaultChecked={true}
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
            {...registerInput('birthday', {
              min: '1900-01-01',
              max: formatDate(new Date(), 'yyyy-mm-dd'),
            })}
          />
          {touched['birthday'] && errors['birthday']?.length > 0 && (
            <S.HintParagraph>{errors['birthday']}</S.HintParagraph>
          )}
        </S.CenterFlexBox>
        <S.RightFlexBox />
      </S.FormFieldBox>

      <S.SubmitButtonBox>
        <Button type="submit" disabled={isSubmitting}>
          다음으로
        </Button>
      </S.SubmitButtonBox>
    </S.Form>
  );
}

export default FillInfoStep;
