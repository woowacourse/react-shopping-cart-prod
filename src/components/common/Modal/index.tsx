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

  width: 120rem;

  padding: 3rem 0 6rem 0;
  border: 1px solid ${theme.colors.primaryColor};

  background: ${theme.colors.lightColor};
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 4rem;

  margin-bottom: 5rem;

  color: ${theme.colors.primaryColor};
`;

const Main = styled.main`
  height: 40rem;
  margin-bottom: 5rem;

  overflow-y: scroll;
`;

const ButtonWrapper = styled.div`
  width: 42rem;
`;

export default Modal;
