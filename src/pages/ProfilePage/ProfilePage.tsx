import useProfileForm from './useProfileForm';

import * as S from 'pages/ProfilePage/ProfilePage.styled';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';

import ICONS from 'constants/icons';

function ProfilePage() {
  const {
    values,
    addressData,
    errors,
    handleChange,
    handleClickAddressButton,
    handleSubmit,
    handleClickUnregisterButton,
  } = useProfileForm();

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
              value={values['email']}
              pattern="[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.([a-zA-Z])+"
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
              name="password"
              placeholder="비밀번호를 입력해주세요."
              minLength={8}
              maxLength={20}
              pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[!@#&()-\[{}\]:;',?/*~$^+=<>]).{8,20}"
              value={values['password']}
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
              <S.HintGreenParagraph>
                비밀번호가 일치합니다.
              </S.HintGreenParagraph>
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
              value={values['name']}
              placeholder="이름을 입력해주세요."
              minLength={2}
              maxLength={5}
              onChange={handleChange}
              required
            />
            {errors?.name ? (
              <S.HintRedParagraph>{errors.name}</S.HintRedParagraph>
            ) : (
              <S.HintGreenParagraph>
                이름이 입력되었습니다.
              </S.HintGreenParagraph>
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
              value={values['contact']}
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
                name="zonecode"
                placeholder="우편번호"
                value={addressData?.zonecode}
                readOnly
              />
              <S.Button type="button" onClick={handleClickAddressButton}>
                {ICONS.SEARCH}주소 변경
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
              value={values['detailAddress']}
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
                <input
                  type="radio"
                  value="male"
                  name="gender"
                  checked={values['gender'] === 'male'}
                  onChange={handleChange}
                />
                남성
              </label>
              <label>
                <input
                  type="radio"
                  value="female"
                  name="gender"
                  checked={values['gender'] === 'female'}
                  onChange={handleChange}
                />
                여성
              </label>
              <label>
                <input
                  type="radio"
                  value="undefined"
                  name="gender"
                  checked={values['gender'] === 'undefined'}
                  onChange={handleChange}
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
              value={values['birthday']}
              readOnly
            />
          </S.CenterFlexBox>
          <S.RightFlexBox />
        </S.FormFieldBox>
        <S.ButtonBox>
          <Button type="submit">수정 완료</Button>
          <Button
            color="red"
            type="button"
            onClick={handleClickUnregisterButton}
          >
            계정 삭제
          </Button>
        </S.ButtonBox>
      </S.Form>
    </S.PageBox>
  );
}

export default ProfilePage;
