import PropTypes from 'prop-types';

import { COLORS } from 'styles/theme';
import * as CommonStyled from 'components/@common/CommonStyle/styles';

const PageHeader = ({ children, color }) => (
  <>
    <CommonStyled.PageTitle>{children}</CommonStyled.PageTitle>
    <CommonStyled.HR color={color || COLORS.BLACK} size="1px" />
  </>
);

PageHeader.propTypes = {
  children: PropTypes.string,
  color: PropTypes.string,
};

PageHeader.defaultProps = {
  children: '예시 페이지 제목',
  color: COLORS.BLACK,
};

export default PageHeader;
