import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 60px;

  place-items: center;
  min-height: 80vh;
`;

export const Image = styled.img`
  width: 260px;
`;

export const GuideMessage = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
