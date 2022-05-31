import { FormEvent, PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';

import Button from './Button';

interface AuthPage {
  title: string;
  onSubmitAuthForm: (e: FormEvent<HTMLFormElement>) => void;
  bottom?: ReactNode;
}

const AuthPage = ({ title, onSubmitAuthForm, bottom, children }: PropsWithChildren<AuthPage>) => {
  return (
    <StyledRoot>
      <StyledTitle>{title}</StyledTitle>
      <StyledForm onSubmit={onSubmitAuthForm}>
        {children}
        <Button
          type='submit'
          width='300px'
          height='36px'
          color='white'
          fontSize='14px'
          backgroundColor='primary'
          margin='24px 0 0'
          borderRadius='4px'
        >
          확인
        </Button>
      </StyledForm>
      {bottom}
    </StyledRoot>
  );
};

export default AuthPage;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const StyledTitle = styled.h2`
  font-weight: 600;
  font-size: 34px;
  text-align: center;
  margin-bottom: 46px;
`;
