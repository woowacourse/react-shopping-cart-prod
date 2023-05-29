import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 20px;
  display: grid;
  row-gap: 40px;
  margin-bottom: 60px;

  @media only screen and (max-width: 768px) {
    // 모바일
    margin-bottom: 160px;
  }
`;
