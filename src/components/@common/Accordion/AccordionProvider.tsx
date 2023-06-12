import { PropsWithChildren, useCallback, useState } from 'react';
import AccordionContext from './context';

type AccordionProviderProps = {
  defaultOpen?: boolean;
};

const AccordionProvider = ({ children, defaultOpen = true }: PropsWithChildren<AccordionProviderProps>) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(defaultOpen);

  const toggleAccordion = useCallback(() => {
    setIsAccordionOpen((prev) => !prev);
  }, []);

  return <AccordionContext.Provider value={{ isAccordionOpen, toggleAccordion }}>{children}</AccordionContext.Provider>;
};

export default AccordionProvider;
