import * as S from 'components/Spinner/Spinner.styled';

import ICONS from 'constants/icons';

function Spinner() {
  return (
    <S.SpinnerBox>
      {ICONS.SPINNER}
      <span className="visually-hidden">Loading...</span>
    </S.SpinnerBox>
  );
}

export default Spinner;
