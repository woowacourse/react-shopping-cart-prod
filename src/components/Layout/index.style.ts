import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
  `,

  RightSide: styled.div`
    display: flex;
    align-items: center;
  `,

  HomeLink: styled(Link)`
    display: flex;
    font-weight: 900;
    font-size: 30px;
    line-height: 58px;
    text-decoration: none;
    color: white;
    align-items: center;
  `,

  CartLink: styled(Link)`
    font-size: 15px;
    line-height: 12px;
    text-decoration: none;
    color: white;
    margin: 0 10px;
  `,

  OrderLink: styled(Link)`
    font-size: 15px;
    line-height: 12px;
    text-decoration: none;
    color: white;
    margin: 0 10px;
  `,

  LoginLink: styled(Link)`
    font-weight: 500;
    font-size: 20px;
    line-height: 12px;
    text-decoration: none;
    color: white;
    margin: 0 10px;
  `,

  OutletContainer: styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
  `,
};

export default Styled;
