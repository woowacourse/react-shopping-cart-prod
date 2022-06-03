import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Styled = {
  HomeLink: styled(Link)`
    font-weight: 900;
    font-size: 30px;
    line-height: 58px;
    text-decoration: none;
    color: white;
    background-color: ${({ theme }) => theme.colors.mint_001};
    border-radius: 5px;
    padding: 0 20px;
  `,
};

export default Styled;
