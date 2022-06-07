import styled from 'styled-components';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 240px;
`;

const Title = styled.h1`
  border-bottom: 3px solid ${({ theme }) => theme.colors.GRAY_800};
  text-align: center;
  padding-bottom: 10px;
  font-size: 25px;
  width: 100%;
`;

export { Body, Title };
