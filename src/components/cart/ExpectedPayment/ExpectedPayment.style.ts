import { styled } from 'styled-components';
import { theme } from '@styles/theme';

export const PayingBox = styled.div`
  column-gap: 1rem;
  width: 90%;
  margin: 1rem;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  border: ${({ theme }) => theme.colors.primaryColor} 1px solid;
  color: ${({ theme }) => theme.colors.lightColor};

  padding: 2rem 1.5rem;
  border-radius: 8px;
  justify-content: start;
`;

export const PayingContainer = styled.div`
  display: flex;
  flex: 50px;
  flex-direction: column;
  justify-content: start;
`;

export const Title = styled.h3`
  border: 1px solid ${theme.colors.secondaryColor};
  padding: 3rem;

  font-weight: 700;
  font-size: 2.8rem;
  line-height: 2.8rem;

  letter-spacing: 0.5px;

  color: ${theme.colors.primaryColor};
  background: ${theme.colors.grayColor};
`;

export const InformationWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 4rem 3rem;
  border: 1px solid ${theme.colors.secondaryColor};

  gap: 3rem;
`;

export const AmountWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  font-weight: 700;
  font-size: 2.4rem;
  line-height: 2.4rem;

  letter-spacing: 0.5px;

  color: ${theme.colors.primaryColor};
  background: ${theme.colors.lightColor};
`;

export const LastAmountWrapper = styled(AmountWrapper)`
  border-top: 2px solid ${theme.colors.secondaryColor};
  padding-top: 4rem;
`;
