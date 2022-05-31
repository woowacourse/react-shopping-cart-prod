import PropTypes from 'prop-types';

import { COLORS } from 'styles/theme';
import * as CommonStyled from 'components/@common/CommonStyle/styles';

const PageHeader = ({ children }) => (
  <>
    <CommonStyled.PageTitle>{children}</CommonStyled.PageTitle>
    <CommonStyled.HR color={COLORS.BLACK} />
  </>
);

PageHeader.propTypes = {
  children: PropTypes.string,
};

PageHeader.defaultProps = {
  children: '예시 페이지 제목',
};

export default PageHeader;
