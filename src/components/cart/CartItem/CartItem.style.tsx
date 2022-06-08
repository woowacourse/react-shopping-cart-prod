import styled from 'styled-components';
export const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: center;

  padding: 10px 0;
  gap: 20px;

  box-shadow: 5px 3px 8px -2px rgba(0, 0, 0, 0.43);
  -webkit-box-shadow: 5px 3px 8px -2px rgba(0, 0, 0, 0.43);

  box-sizing: border-box;

  padding: 10px;
`;
export const ImageWrapper = styled.div`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NameWrapper = styled.div`
  min-width: 50px;
  font-size: 1.3rem;

  cursor: pointer;

  flex: 1;

  ${({ theme }) => theme.tablet} {
    font-size: 1.1rem;
  }

  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

export const PriceWrapper = styled.div`
  min-width: 100px;
  display: flex;

  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  gap: 30px;
`;

export const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Text = styled.span``;
