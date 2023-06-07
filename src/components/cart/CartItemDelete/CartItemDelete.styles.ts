import { css, styled } from 'styled-components';

const ContentContainer = styled.div`
  width: 300px;
`;

const messageStyle = css`
  margin: ${({ theme }) => theme.spacer.spacing4};
  padding: ${({ theme }) => theme.spacer.spacing3} 0;
  font-weight: 600;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.color.gray2};

  & button {
    &:focus {
      outline: 0;
      box-shadow: none;
    }
  }
`;

const cancelButtonStyle = css`
  border-right: 1px solid ${({ theme }) => theme.color.gray2};
  border-radius: 0 0 0 ${({ theme }) => theme.borderRadius.medium};
`;

const deleteButtonStyle = css`
  border-radius: 0 0 ${({ theme }) => theme.borderRadius.medium} 0;
`;

export { ContentContainer, messageStyle, ButtonContainer, cancelButtonStyle, deleteButtonStyle };
