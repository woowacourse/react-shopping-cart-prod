import { useState } from 'react';

import * as S from './style';

type HelperMessageProps = {
  message: string;
  text: string;
  isLoading?: boolean;
};

function HelperMessage({ message, text, isLoading = false }: HelperMessageProps) {
  const [visible, setVisible] = useState(false);

  return (
    <S.Container>
      <S.HelperTitle isLoading={isLoading}>{text}</S.HelperTitle>
      <S.Layout>
        <S.QuestionMark onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
          ?
        </S.QuestionMark>
        {visible && <S.HelperMessage>{message}</S.HelperMessage>}
      </S.Layout>
    </S.Container>
  );
}

export default HelperMessage;
