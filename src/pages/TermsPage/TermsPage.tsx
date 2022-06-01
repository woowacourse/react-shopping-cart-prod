import Checkbox from '../../components/Checkbox/Checkbox';
import DivideLine from '../../components/DivideLine/DivideLine';
import Stepper from '../../components/Stepper/Stepper';
import Button from '../../components/Button/Button';
import * as S from './TermsPage.styled';

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

function TermsPage() {
  const handleSubmit = () => {};
  return (
    <S.PageBox>
      <Stepper stepList={SIGNUP_STEPS} currentStepId={SIGNUP_STEPS[0].id} />
      <DivideLine color="gray" thickness="thin" />
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
        </S.Form>
        <S.SubmitButtonBox>
          <Button type="submit">다음으로</Button>
        </S.SubmitButtonBox>
      </S.TermsBox>
    </S.PageBox>
  );
}

export default TermsPage;
