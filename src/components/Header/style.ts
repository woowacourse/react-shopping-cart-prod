import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  background-color: #333333;
  padding: 10px 0;
  width: 100%;
  z-index: 99;
`;

export const Layout = styled.div`
  display: flex;
  max-width: 1000px;
  margin: auto;
  justify-content: space-between;
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

export const RightContents = styled.div`
  display: flex;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 3px;
`;

export const ButtonName = styled.div`
  font-size: 11px;
`;

export const OrderPagebutton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;
  text-align: center;
  color: white;
  cursor: pointer;
`;
