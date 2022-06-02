import styled, { css } from 'styled-components';
import * as T from './FillInfoStep.types';

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

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
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

export const RightFlexBox = styled.div`
  flex: 1 1 0;
`;

export const Label = styled.label<T.LabelWithRequired>`
  align-self: flex-start;
  margin-top: 14px;

  ${({ theme: { colors }, required }) =>
    required &&
    css`
      :after {
        content: '*';
        color: ${colors.red};
      }
    `};
`;

export const Button = styled.button`
  width: 100%;
  height: 100%;
  font-weight: 700;
  border-radius: 4px;
  border: 1px solid ${({ theme: { colors } }) => colors.gray};
  box-sizing: border;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  :disabled {
    pointer-events: none;
    background-color: ${({ theme: { colors } }) => colors.lightGray};
    color: ${({ theme: { colors } }) => colors.gray};
  }
`;

export const RadioButtonBox = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const SubmitButtonBox = styled.div`
  width: 300px;
  margin: 24px auto 0;
`;
