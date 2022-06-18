import ICONS from 'constants/icons';
import * as S from 'components/Spinner/Spinner.styled';

function Spinner() {
  return (
    <S.SpinnerBox>
      {ICONS.SPINNER}
      <span className="visually-hidden">Loading...</span>
    </S.SpinnerBox>
  );
}

export default Spinner;
