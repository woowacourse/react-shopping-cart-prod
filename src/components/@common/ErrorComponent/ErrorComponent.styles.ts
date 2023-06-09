import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ErrorMessage = styled.p`
  margin-bottom: 20px;
  font: ${(props) => props.theme.font.large};
`;

export const ReloadButton = styled.button`
  padding: 8px;
  border: 2px solid ${(props) => props.theme.color.gray};
  border-radius: 10px;
  font: ${(props) => props.theme.font.medium};
  cursor: pointer;
`;
