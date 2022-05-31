import * as Styled from './style';
import PropTypes from 'prop-types';

const Avatar = ({ name = '코카콜라' }) => {
  return (
    <Styled.Wrapper>
      <Styled.Thumbnail>{name[0]}</Styled.Thumbnail>
    </Styled.Wrapper>
  );
};

Avatar.propTypes = {
  name: PropTypes.string,
};

export default Avatar;
