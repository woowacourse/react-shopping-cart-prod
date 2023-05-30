import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import useAccordionContext from './hook/useAccordionContext';
import upArrowIcon from 'assets/up-arrow-icon.svg';

const AccordionTrigger = ({ children }: PropsWithChildren) => {
  const { isAccordionOpen, toggleAccordion } = useAccordionContext();
  const accordionIconAlt = isAccordionOpen ? '상품목록 열림' : '상품목록 닫힘';

  return (
    <Trigger onClick={toggleAccordion}>
      {children}
      <AccordionIcon src={upArrowIcon} alt={accordionIconAlt} isOpen={isAccordionOpen} />
    </Trigger>
  );
};

export default AccordionTrigger;

const Trigger = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const AccordionIcon = styled.img<{ isOpen: boolean }>`
  width: 20px;
  height: 20px;

  transform: ${({ isOpen }) => (isOpen ? '' : 'scaleY(-1)')};
`;
