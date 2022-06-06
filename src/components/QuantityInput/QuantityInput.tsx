import React, { useRef } from 'react';

import * as S from 'components/QuantityInput/QuantityInput.styled';

import ICONS from 'constants/icons';

type Props = React.HTMLProps<HTMLInputElement>;

function QuantityInput(props: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <S.InputBox>
      <input {...props} ref={inputRef} />
      <S.InputStepButtonBox>
        <button
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.stepUp();
            }
          }}
        >
          {ICONS.UP}
        </button>
        <button
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.stepDown();
            }
          }}
        >
          {ICONS.DOWN}
        </button>
      </S.InputStepButtonBox>
    </S.InputBox>
  );
}

export default QuantityInput;
