import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  width: 100vw;
  color: ${({ theme }) => theme.color.light};
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const BigLogoImage = styled.img`
  height: 35px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

export const SmallLogoImage = styled.img`
  height: 80px;
  display: none;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: block;
  }
`;
