import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import Toast from './Toast';
import { toastState } from '../../../recoil/atoms/common';

const ToastList = () => {
  const toastList = useRecoilValue(toastState);

  return (
    <Container>
      {toastList.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  left: 50%;
  bottom: 40px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column-reverse;
  row-gap: 10px;
`;

export default ToastList;
