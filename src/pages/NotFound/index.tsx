import { useNavigate } from 'react-router-dom';

import Button from '@Components/Button';

import ROUTES from '@Constants/routes';

import NotFoundImage from '@Asset/notFound.png';

import * as S from './style';

type NotFoundProps = {
  error?: Error | null;
};

function NotFound({ error }: NotFoundProps) {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Layout>
        <S.Image src={NotFoundImage} />
        <S.MainGuideMessage>페이지를 찾을 수 없습니다.</S.MainGuideMessage>
        <S.SubGuideMessage>{error?.message}</S.SubGuideMessage>
        <Button text="홈으로 가기" onClick={() => navigate(ROUTES.home)} backgroundColor="#06C09E" width="180px" />
      </S.Layout>
    </S.Container>
  );
}

export default NotFound;
