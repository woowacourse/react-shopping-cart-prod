import { styled } from 'styled-components';
import { theme } from '@styles/theme';

export const MessageWrapper = styled.div`
  display: flex;
  justify-content: center;

  padding: 8rem 0;

  font-size: 3rem;
  line-height: 3.7rem;
  letter-spacing: 0.5px;

  color: ${theme.colors.primaryColor};
`;

export const BoldMessage = styled.span`
  font-weight: 700;
`;
export const NormalMessage = styled.span`
  font-weight: 400;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 12rem;
  gap: 10rem;
`;

export const Title = styled.h3`
  padding-bottom: 3.6rem;
  border-bottom: 1px solid ${theme.colors.primaryColor};

  font-weight: 700;
  font-size: 4rem;

  letter-spacing: 0.5px;

  color: ${theme.colors.primaryColor};
`;

export const EstimatedDate = styled(MessageWrapper)`
  justify-content: start;
  border-bottom: 1px solid ${theme.colors.primaryColor};
`;

export const OrderInformation = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

  padding-left: 4rem;
  border-left: 1px solid ${theme.colors.primaryColor};

  gap: 2rem;
`;

export const Information = styled.div`
  display: flex;

  font-weight: 400;
  font-size: 2.4rem;
  line-height: 3.7rem;
  letter-spacing: 0.5px;

  color: ${theme.colors.primaryColor};
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
  font-size: 3rem;
  line-height: 3.7rem;
`;
