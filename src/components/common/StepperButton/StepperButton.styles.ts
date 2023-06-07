import styled, { css } from 'styled-components';

const StepperContainer = styled.div`
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.color.gray3};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

const StepperInput = styled.input`
  width: 40px;
  height: 24px;
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  border: none;
  outline: none;
`;

const buttonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    outline: 0;
    box-shadow: none;
  }

  &:disabled {
    background-color: white;

    & > svg > path {
      stroke: ${({ theme }) => theme.color.gray4};
    }
  }
`;

export { StepperContainer, StepperInput, buttonStyle };
