import { EmptyImageWrapper } from './styles';
import emptyPage from '@/assets/emptyPage.jpeg';

function Empty() {
  return (
    <EmptyImageWrapper>
      <img alt="emptyPage" src={emptyPage} />
    </EmptyImageWrapper>
  );
}

export default Empty;
