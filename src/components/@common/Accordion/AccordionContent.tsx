import { PropsWithChildren } from 'react';
import useAccordionContext from './hook/useAccordionContext';

const AccordionContent = ({ children }: PropsWithChildren) => {
  const { isAccordionOpen } = useAccordionContext();

  return <>{isAccordionOpen && children}</>;
};

export default AccordionContent;
