import styled from 'styled-components';

import { Link } from 'react-router-dom';
const Styled = {
  Container: styled.div`
    margin: 10px 0;
  `,

  Guide: styled.span`
    font-size: 12px;
    color: #98989e;
    margin-right: 7px;
  `,

  Link: styled(Link)`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.mint_001};
    text-decoration: none;
    font-weight: bold;
  `,
};

export default Styled;
