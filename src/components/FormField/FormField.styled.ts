import styled, { css } from 'styled-components';

import * as T from 'components/FormField/FormField.types';

export const FormFieldBox = styled.div`
  display: flex;
  gap: 12px;
`;

export const LeftFlexBox = styled.div`
  flex: 1 1 0;
  display: flex;
  align-items: center;
  font-weight: 700;
`;

export const CenterFlexBox = styled.div`
  flex: 3 1 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const RightFlexBox = styled.div`
  flex: 1 1 0;
`;

export const Label = styled.label<T.LabelWithRequired>`
  ${({ theme: { colors }, required }) =>
    required &&
    css`
      :after {
        content: '*';
        color: ${colors.red};
      }
    `}
`;

export const Button = styled.button`
  width: 100%;
  height: 100%;
  font-weight: 700;
  border-radius: 4px;
  border: 1px solid ${({ theme: { colors } }) => colors.gray};
  box-sizing: border;

  :disabled {
    pointer-events: none;
    background-color: ${({ theme: { colors } }) => colors.lightGray};
    color: ${({ theme: { colors } }) => colors.gray};
  }
`;
