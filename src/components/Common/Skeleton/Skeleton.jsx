import { skeletonSize } from './style';
import * as Styled from './style';
import PropTypes from 'prop-types';

const Skeleton = ({ size }) => {
  return (
    <Styled.Wrapper size={size}>
      <Styled.LargeBox />
      <Styled.Container>
        <Styled.MediumBox />
        <Styled.SmallBox />
      </Styled.Container>
    </Styled.Wrapper>
  );
};

Skeleton.propTypes = {
  size: PropTypes.oneOf(Object.keys(skeletonSize)),
};

export default Skeleton;
