import { createContext } from 'react';

type AccordionContextType = {
  isAccordionOpen: boolean;
  toggleAccordion: () => void;
};

const AccordionContext = createContext<AccordionContextType | null>(null);

export default AccordionContext;
