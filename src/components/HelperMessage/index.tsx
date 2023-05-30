import { useState } from 'react';

import * as S from './style';

function HelperMessage({ message, text }: { message: string; text: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <S.Container>
      {text}
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
