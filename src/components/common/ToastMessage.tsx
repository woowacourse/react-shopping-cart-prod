import { ReactNode, useEffect } from 'react';
import { styled } from 'styled-components';

interface ToastMessageProps {
  children: ReactNode;
  setToast: (isToast:boolean) => void
}

export const ToastMessage = ({children, setToast}: ToastMessageProps) => {
    useEffect(()=>{
        setTimeout(() => {
            setToast(false);
          }, 1500)
    }, [setToast])
    
  return (
    <Style.Container>
      <Style.Text>{children}</Style.Text>
    </Style.Container>
  );
};

const Style = {
  Container: styled.div`
    position: fixed;
    z-index: 99;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24rem;
    height: 2.625rem;
    border-radius: 10px;
    box-shadow: 0 0 15px 0 var(--black-40);
    background-color: #323232;
  `,
  Text: styled.div`
    font-weight: bold;
    letter-spacing: 0.29px;
    text-align: center;
    margin-top: 0.6rem;
  `,
};
