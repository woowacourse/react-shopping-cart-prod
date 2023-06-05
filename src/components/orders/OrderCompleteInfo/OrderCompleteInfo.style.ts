import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { theme } from '@styles/theme';

export const MessageWrapper = styled.div`
  display: flex;
  justify-content: center;

  padding: 4rem 0;

  font-size: 2rem;
  line-height: 3.7rem;
  letter-spacing: 0.5px;

  color: ${theme.colors.primaryColor};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2.4rem;
    padding: 6rem 0;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.8rem;
    padding: 7rem 0;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 3.2rem;
    padding: 8rem 0;
  }
`;

export const BoldMessage = styled.span`
  font-weight: 700;
`;

export const NormalMessage = styled.span`
  font-weight: 400;
`;

export const ButtonWrapperLink = styled.div`
  display: flex;
  justify-content: center;

  padding: 0 5rem;

  margin-bottom: 6rem;
  gap: 5rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 8rem;
    gap: 6rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 10rem;
    gap: 8rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-bottom: 12rem;
    gap: 10rem;
  }
`;

export const ButtonLink = styled(Link)`
  width: 100%;

  max-width: 30rem;
`;

export const Title = styled.h3`
  padding-bottom: 1.8rem;
  border-bottom: 1px solid ${theme.colors.primaryColor};

  font-weight: 700;
  font-size: 2.4rem;

  letter-spacing: 0.5px;

  color: ${theme.colors.primaryColor};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-bottom: 2.4rem;
    font-size: 2.8rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-bottom: 2.8rem;
    font-size: 3.2rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding-bottom: 3.2rem;
    font-size: 3.6rem;
  }
`;

export const EstimatedDate = styled(MessageWrapper)`
  justify-content: start;
  border-bottom: 1px solid ${theme.colors.primaryColor};
`;

export const OrderInformation = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const InformationWrapper = styled.div`
  padding: 4rem 0;
`;

export const InformationTitle = styled(Title)`
  padding: none;
  border-bottom: none;
`;

export const InformationMain = styled.div`
  display: flex;
  flex-direction: column;

  gap: 2rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-left: 4rem;
    border-left: 1px solid ${theme.colors.primaryColor};
  }
`;

export const Information = styled.div`
  display: flex;

  font-weight: 400;
  font-size: 1.8rem;
  line-height: 3.7rem;
  letter-spacing: 0.5px;

  color: ${theme.colors.primaryColor};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.2rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 2.4rem;
  }
`;

export const InformationLeft = styled(Information)`
  gap: 5rem;
`;

export const InformationRight = styled(Information)`
  justify-content: space-between;

  gap: 5rem;
  &:nth-child(3) {
    padding-bottom: 5rem;
    border-bottom: 1px solid ${theme.colors.primaryColor};
  }
`;

export const TotalPrice = styled(InformationRight)`
  font-weight: 700;
  font-size: 2rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2.4rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.4rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 2.8rem;
  }
`;
