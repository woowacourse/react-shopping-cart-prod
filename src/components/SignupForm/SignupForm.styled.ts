import styled, { css } from 'styled-components';

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

export { ErrorSign, ErrorMessage };
