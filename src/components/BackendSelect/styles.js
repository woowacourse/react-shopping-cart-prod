import styled from '@emotion/styled';

import { COLORS } from 'styles/theme';

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem 0.5rem;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  background-color: ${COLORS.GRAY_250};
  margin: 0 auto 0.725rem;
  border: 2px solid ${COLORS.WHITE};
  text-shadow: 0 0 10px ${COLORS.BLACK_015};
`;

const Name = styled.p`
  width: 100%;
  text-align: center;
  font-size: 0.913rem;
  color: ${COLORS.GRAY_50};
  transition: color 0.3s ease;
`;

const Item = styled.div`
  cursor: pointer;
  padding: 0.7rem;
  transition: background-color 0.2s ease;
  border-radius: 0.5rem;
  border: none;

  &:hover {
    background-color: ${COLORS.BLUE_150};

    ${Name} {
      color: ${COLORS.WHITE};
    }
  }
`;

export { Container, Item, Icon, Name };
