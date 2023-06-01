import { styled } from 'styled-components';

export const Container = styled.section`
  width: 360px;
  padding: 24px;
  border: 1px solid ${(props) => props.theme.color.gray};
`;

export const Title = styled.p`
  margin-bottom: 20px;
  font: ${(props) => props.theme.font.medium};
  text-align: center;
`;

export const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.color.gray};
  margin: 0 0 20px 0;
`;
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Text = styled.p`
  margin-bottom: 20px;
  font: ${(props) => props.theme.font.small};
`;
