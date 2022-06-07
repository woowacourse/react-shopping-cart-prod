import useFillInfoForm from './useFillInfoForm';

import * as S from 'pages/SignupPage//Steps/FillInfoStep/FillInfoStep.styled';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';

import ICONS from 'constants/icons';

function FillInfoStep() {
  const {
    addressData,
    errors,
    handleChange,
    handleClickIsEmailDuplicated,
    handleClickAddressButton,
    handleSubmit,
  } = useFillInfoForm();

  return (
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
          {errors?.email ? (
            <S.HintRedParagraph>{errors.email}</S.HintRedParagraph>
          ) : (
            <S.HintGreenParagraph>
              이메일 중복 확인되었습니다.
            </S.HintGreenParagraph>
          )}
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
            name="password"
            placeholder="비밀번호를 입력해주세요."
            minLength={8}
            maxLength={20}
            pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[!@#&()-\[{}\]:;',?/*~$^+=<>]).{8,20}"
            onChange={handleChange}
            required
          />
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
            name="confirm-password"
            placeholder="비밀번호를 한번 더 입력해주세요."
            minLength={8}
            maxLength={20}
            pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[!@#&()-\[{}\]:;',?/*~$^+=<>]).{8,20}"
            onChange={handleChange}
            required
          />
          {errors?.password ? (
            <S.HintRedParagraph>{errors.password}</S.HintRedParagraph>
          ) : (
            <S.HintGreenParagraph>비밀번호가 일치합니다.</S.HintGreenParagraph>
          )}
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
            name="name"
            placeholder="이름을 입력해주세요."
            minLength={2}
            maxLength={5}
            onChange={handleChange}
            required
          />
          {errors?.name ? (
            <S.HintRedParagraph>{errors.name}</S.HintRedParagraph>
          ) : (
            <S.HintGreenParagraph>이름이 입력되었습니다.</S.HintGreenParagraph>
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
            name="contact"
            placeholder="01012345678"
            pattern="[0-9]{8,11}"
            onChange={handleChange}
            required
          />
          {errors?.contact ? (
            <S.HintRedParagraph>{errors.contact}</S.HintRedParagraph>
          ) : (
            <S.HintGreenParagraph>
              전화번호가 입력되었습니다.
            </S.HintGreenParagraph>
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
            maxLength={20}
            placeholder="상세 주소"
            onChange={handleChange}
            disabled={!addressData}
          />
          {errors?.address ? (
            <S.HintRedParagraph>{errors.address}</S.HintRedParagraph>
          ) : (
            <S.HintGreenParagraph>
              주소가 정상적으로 입력되었습니다.
            </S.HintGreenParagraph>
          )}
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
              <input type="radio" value="male" name="gender" />
              남성
            </label>
            <label>
              <input type="radio" value="female" name="gender" />
              여성
            </label>
            <label>
              <input
                type="radio"
                value="undefined"
                name="gender"
                defaultChecked
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
            min="1900-01-01"
            max="2022-06-01"
          />
        </S.CenterFlexBox>
        <S.RightFlexBox />
      </S.FormFieldBox>
      <S.SubmitButtonBox>
        <Button type="submit">다음으로</Button>
      </S.SubmitButtonBox>
    </S.Form>
  );
}

export default FillInfoStep;
