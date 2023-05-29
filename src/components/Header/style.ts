import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  background-color: #333333;
  padding: 10px 0;
  width: 100%;
`;

export const Layout = styled.div`
  display: flex;
  max-width: 1200px;
  margin: auto;
  justify-content: space-between;

  @media only screen and (max-width: 1200px) {
    // 테블릿
    max-width: 768px;
  }
  @media only screen and (max-width: 768px) {
    // 모바일
    max-width: 400px;
  }
`;

export const LogoWrapper = styled.div`
  color: #ffffff;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
`;

export const LogoImg = styled.img`
  margin-right: 15px;
  width: 40px;
`;

export const LogoText = styled.span`
  position: relative;
  top: 4px;
  font-size: 40px;
  font-weight: 900;
`;
