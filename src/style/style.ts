import styled from 'styled-components';

/**
 * 레이아웃 관련 CSS 스타일은 Bootstrap 기준으로 적용했습니다.
 */

export const Container = styled.div`
  padding: 0 20px;
  margin: 0 auto;
  max-width: 100%;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 540px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 720px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 960px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    max-width: 1140px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xxl}) {
    max-width: 1320px;
    padding: 0 100px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
`;

export const Col = styled.div`
  width: 100%;
  box-sizing: border-box;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 50%;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 33.33%;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: 25%;
  }
`;

export const PageTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 37px;

  text-align: center;
  letter-spacing: 0.5px;

  margin: 60px 0px 30px 0px;
`;

export const FatBorder = styled.hr`
  border: solid 2px black;
`;
