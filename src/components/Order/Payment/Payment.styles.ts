import styled from 'styled-components';

export const Container = styled.div`
  width: 360px;
  height: fit-content;
  padding: 24px;
  border: 1px solid ${(props) => props.theme.color.gray};

  @media (min-width: 320px) and (max-width: 479px) {
    width: 100%;
  }
`;

export const Title = styled.p`
  margin-bottom: 20px;
  padding-bottom: 20px;
  font: ${(props) => props.theme.font.medium};
  text-align: center;
  border-bottom: 1px solid ${(props) => props.theme.color.gray};
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Text = styled.p`
  margin-bottom: 20px;
  font: ${(props) => props.theme.font.small};
`;
