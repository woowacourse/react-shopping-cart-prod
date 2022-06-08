import styled from '@emotion/styled';

import { rotate } from 'styles/animation';
import { COLORS } from 'styles/theme';

const Dimmer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  background-color: ${COLORS.GRAY_600};
`;

const SpinnerImg = styled.img`
  position: absolute;
  top: 30%;
  left: 30%;
  width: 500px;
  transform: translate(-50%, -50%);
  animation: 1s linear infinite ${rotate};
`;

export { Dimmer, SpinnerImg };
