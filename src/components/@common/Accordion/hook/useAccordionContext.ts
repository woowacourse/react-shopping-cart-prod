import { useContext } from 'react';
import AccordionContext from '../context';

const useAccordionContext = () => {
  const accordionState = useContext(AccordionContext);
  if (!accordionState) throw new Error('아코디언 context에 제공되는 값이 없습니다.');

  return accordionState;
};

export default useAccordionContext;
