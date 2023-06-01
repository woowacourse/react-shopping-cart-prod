import { styled } from 'styled-components';
import { theme } from '@styles/theme';

export const Container = styled.div`
  display: flex;

  height: 22rem;

  padding: 4rem 2.6rem;
  border: 1px solid ${theme.colors.secondaryColor};
`;

export const Image = styled.img`
  height: 100%;

  margin-right: 3.3rem;

  aspect-ratio: 1/1;
  object-fit: cover;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.h3`
  font-weight: 400;
  font-size: 2rem;
  line-height: 2.4rem;
  letter-spacing: 0.5px;

  color: ${theme.colors.primaryColor};
`;

export const PriceAndQuantity = styled.span`
  margin-top: 1.2rem;

  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2rem;
  letter-spacing: 0.5px;

  color: ${theme.colors.grayInfoColor};
`;
