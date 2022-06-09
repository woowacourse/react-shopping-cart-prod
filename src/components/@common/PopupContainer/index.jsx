import PropTypes from 'prop-types';

import * as S from './styles';

function PopupContainer({ target, width, minHeight, padding, children }) {
  return (
    <S.Container>
      {target}
      <S.HoverContainer width={width}>
        <S.ContentContainer minHeight={minHeight} padding={padding}>
          {children}
        </S.ContentContainer>
      </S.HoverContainer>
    </S.Container>
  );
}

PopupContainer.propTypes = {
  width: PropTypes.number.isRequired,
  minHeight: PropTypes.number,
};

PopupContainer.defaultProps = {
  minHeight: 60,
};

export default PopupContainer;
