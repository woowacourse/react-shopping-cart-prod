import { styled } from 'styled-components';
import usePointsUpdater from './usePointsUpdater';
import colors from '../../../colors';

const PointsInput = () => {
  const { selectedPoints, maxPoints, updatePoints } = usePointsUpdater();

  return (
    <Container>
      <Input value={selectedPoints} onChange={updatePoints} />
      <MaxPoints>/ {maxPoints} P</MaxPoints>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  column-gap: 10px;
  font-weight: 700;
`;

const Input = styled.input`
  color: ${colors.lightGold};
  font-size: 28px;
  width: 140px;
  height: 32px;
  padding: 8px;
  text-align: right;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${colors.transparentGold};
`;

const MaxPoints = styled.span`
  color: ${colors.lightGold};
  font-size: 20px;
  align-self: flex-end;
`;

export default PointsInput;
