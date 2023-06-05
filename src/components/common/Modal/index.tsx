import React, { PropsWithChildren, useRef } from 'react';
import { styled } from 'styled-components';
import { theme } from '@styles/theme';
import Button from '../Button';

interface ModalProps extends PropsWithChildren {
  title: string;
  onModalClose: () => void;
}

function Modal({ title, onModalClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <Container ref={dialogRef}>
      <Content>
        <Title>{title}</Title>
        <Main>{children}</Main>
        <ButtonWrapper>
          <Button text="닫기" onClick={onModalClose} />
        </ButtonWrapper>
      </Content>
    </Container>
  );
}

const Container = styled.dialog`
  position: fixed;
  top: 0;
  bottom: 0;

  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.2);

  &::backdrop {
    width: 100vw;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 40rem;

  padding: 3rem 0 6rem 0;
  border: 1px solid ${theme.colors.primaryColor};

  background: ${theme.colors.lightColor};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 70rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 80rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: 120rem;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 2.4rem;

  margin-bottom: 3rem;

  color: ${theme.colors.primaryColor};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3.2rem;
    margin-bottom: 5rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    font-size: 4rem;
  }
`;

const Main = styled.main`
  height: 12rem;
  margin-bottom: 3rem;

  overflow-y: scroll;

  @media screen and (min-height: 400px) {
    height: 20rem;
    margin-bottom: 5rem;
  }

  @media screen and (min-height: 600px) {
    height: 24rem;
  }

  @media screen and (min-height: 800px) {
    height: 36rem;
  }
`;

const ButtonWrapper = styled.div`
  width: 20rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 24rem;
  }
`;

export default Modal;
