import styled, { css } from 'styled-components';

const CheckDuplicateButton = styled.button`
  float: right;

  border-radius: 5px;

  margin-right: 10px;
  padding: 2px 10px;

  background: ${({ theme: { colors } }) => colors.pink};

  font-size: 11px;
`;

const ErrorSign = styled.span`
  margin: 0 24px 0 12px;

  font-size: 16px;

  ${({ isCorrect }: { isCorrect: boolean }) => css`
    color: ${({ theme: { colors } }) =>
      isCorrect ? colors.green : colors.black};
  `}
`;

const ErrorMessage = styled.span`
  margin-left: 30px;

  font-size: 11px;

  ${({ isCorrect }: { isCorrect: boolean }) => css`
    color: ${({ theme: { colors } }) =>
      isCorrect ? colors.green : colors.black};

    font-weight: ${isCorrect ? 800 : 500};
  `}
`;

export { CheckDuplicateButton, ErrorSign, ErrorMessage };
