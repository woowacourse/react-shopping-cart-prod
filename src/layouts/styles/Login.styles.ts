import styled from 'styled-components';

export const LoginBox = styled.nav`
  display: flex;

  font-size: 24px;
  font-weight: 500;

  &:first-of-type {
    margin-right: 40px;
  }

  cursor: pointer;
`;

export const LoginWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginLabel = styled.label`
  width: 400px;
  height: 20px;
  margin-top: 32px;
  font-size: 16px;

  &:first-of-type {
    margin-top: 48px;
  }
`;

export const LoginInput = styled.input`
  width: 400px;
  height: 48px;
  border: 1px solid #333333;
  border-radius: 4px;
  padding: 12px;
  font-size: 16px;
  color: #333333;
`;

export const LoginButton = styled.button`
  width: 160px;
  height: 40px;
  background-color: var(--primary-color);
  margin-top: 48px;
  font-size: 16px;
  color: #ffffff;
  border-radius: 4px;
`;
