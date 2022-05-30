import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

const deviceSize = {
  mobile: '600px',
  tablet: '992px',
  laptop: '1200px',
};

const theme = {
  COLOR: {
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    CYAN_300: '#2AC1BC',
    GREY_100: '#BBBBBB',
    GREY_200: '#E4E4E7',
    GREY_300: '#DDDDDD',
    GREY_500: '#78716C',
    CYAN_TRANSPARENT: 'rgba(204, 255, 255, 0.5)',
  },
  DEVICE: {
    EXTRA_SMALL: `screen and (max-width:${deviceSize.mobile})`,
    MOBILE: `screen and (min-width:${deviceSize.mobile})`,
    TABLET: `screen and (min-width:${deviceSize.tablet})`,
    LAPTOP: `screen and (min-width:${deviceSize.laptop})`,
  },
  FONT: {
    PRIMARY: 'Do Hyeon',
    SECONDARY: 'Yeon Sung',
  },
};

const StyleTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

StyleTheme.propTypes = {
  children: PropTypes.node,
};

export default StyleTheme;
