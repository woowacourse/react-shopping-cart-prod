import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import * as S from 'pages/SignupPage/Steps/TermsStep/TermsStep.styled';

import Button from 'components/Button/Button';
import Checkbox from 'components/Checkbox/Checkbox';
import DivideLine from 'components/DivideLine/DivideLine';

function TermsStep() {
  const { goNextStep } = useOutletContext<{
    currentStepId: number;
    goNextStep: () => void;
  }>();

  const [checkedFlags, setCheckedFlags] = useState<Record<string, boolean>>({
    'term-of-service': false,
    'term-of-personal-info': false,
  });

  const handleCheck =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedFlags((prev) => ({ ...prev, [name]: e.target.checked }));
    };

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedFlags({
      'term-of-service': e.target.checked,
      'term-of-personal-info': e.target.checked,
    });
  };

  const isAllChecked = Object.values(checkedFlags).every((checked) => checked);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    goNextStep();
  };

  return (
    <S.TermsBox>
      <S.Title>약관동의</S.Title>
      <S.Paragraph>Woowa Shop 서비스 이용약관에 동의해주세요.</S.Paragraph>
      <S.Form onSubmit={handleSubmit}>
        <S.FormItem>
          <S.Label>
            <Checkbox checked={isAllChecked} onChange={handleCheckAll} />
            모든 이용약관에 동의합니다.
          </S.Label>
        </S.FormItem>
        <DivideLine color="lightGray" thickness="thin" />
        <S.FormItem>
          <S.Label>
            <Checkbox
              name="term-of-service"
              checked={checkedFlags['term-of-service']}
              onChange={handleCheck('term-of-service')}
              required
            />
            (필수) 서비스 이용 약관
          </S.Label>
          <S.TermDetailButton>상세보기</S.TermDetailButton>
        </S.FormItem>
        <S.FormItem>
          <S.Label>
            <Checkbox
              name="term-of-personal-info"
              checked={checkedFlags['term-of-personal-info']}
              onChange={handleCheck('term-of-personal-info')}
              required
            />
            (필수) 개인 정보 취급 방침
          </S.Label>
          <S.TermDetailButton>상세보기</S.TermDetailButton>
        </S.FormItem>
        <S.SubmitButtonBox>
          <Button type="submit" disabled={!isAllChecked}>
            다음으로
          </Button>
        </S.SubmitButtonBox>
      </S.Form>
    </S.TermsBox>
  );
}

export default TermsStep;
