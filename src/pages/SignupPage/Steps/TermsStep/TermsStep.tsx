import Checkbox from '../../../../components/Checkbox/Checkbox';
import DivideLine from '../../../../components/DivideLine/DivideLine';
import Button from '../../../../components/Button/Button';
import * as S from './TermsStep.styled';
import { useOutletContext } from 'react-router-dom';

function TermsStep() {
  const { goNextStep } = useOutletContext<{
    currentStepId: number;
    goNextStep: () => void;
  }>();

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
            <Checkbox />
            모든 이용약관에 동의합니다.
          </S.Label>
        </S.FormItem>
        <DivideLine color="lightGray" thickness="thin" />
        <S.FormItem>
          <S.Label>
            <Checkbox />
            (필수) 서비스 이용 약관
          </S.Label>
          <S.TermDetailButton>상세보기</S.TermDetailButton>
        </S.FormItem>
        <S.FormItem>
          <S.Label>
            <Checkbox />
            (필수) 개인 정보 취급 방침
          </S.Label>
          <S.TermDetailButton>상세보기</S.TermDetailButton>
        </S.FormItem>
        <S.SubmitButtonBox>
          <Button type="submit">다음으로</Button>
        </S.SubmitButtonBox>
      </S.Form>
    </S.TermsBox>
  );
}

export default TermsStep;
