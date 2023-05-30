import ReactDOM from 'react-dom';
import * as S from './styles/Toast.styles';
import { useRecoilValue } from 'recoil';

import { toastInfoState } from '../../atom/state';

export default function Toast() {
  const { show, message, type } = useRecoilValue(toastInfoState);

  const root = document.querySelector('#root') as HTMLElement;
  return ReactDOM.createPortal(show && <S.Wrapper type={type}>{message}</S.Wrapper>, root);
}
