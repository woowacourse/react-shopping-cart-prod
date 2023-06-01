import styled from 'styled-components';

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

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Text = styled.p`
  margin-bottom: 20px;
  font: ${(props) => props.theme.font.small};
`;

export const SubText = styled.div`
  color: gray;
  text-align: center;
  margin-bottom: 20px;
  font: ${(props) => props.theme.font.small};
`;

export const OrderButton = styled.button`
  width: 100%;
  height: 60px;
  background: ${(props) => props.theme.color.primary};
  font: ${(props) => props.theme.font.medium};
  text-align: center;
  color: ${(props) => props.theme.color.white};
  cursor: pointer;
`;

export const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.color.gray};
  margin: 0 0 20px 0;
`;
