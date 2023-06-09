import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1320px;
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 32px;
  text-align: center;
  line-height: 37px;
  color: ${(props) => props.theme.color.gray100};

  border-bottom: 2px solid ${(props) => props.theme.color.gray100};
  padding-bottom: 30px;
`;
