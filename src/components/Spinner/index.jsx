import potato from 'assets/potato-spinner.png';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import { Dimmer, SpinnerImg } from './styles';

const Spinner = () => (
  <CommonStyled.Container width="100%" justifyContent="center">
    <Dimmer />
    <SpinnerImg src={potato} />
  </CommonStyled.Container>
);

export default Spinner;
