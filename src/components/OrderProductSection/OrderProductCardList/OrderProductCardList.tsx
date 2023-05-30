import { useRecoilValue } from 'recoil';
import { getCheckedCartProductsState } from 'state/checkedCartProductIds';
import OrderProductCard from './OrderProductCard/OrderProductCard';
import styled from 'styled-components';
import Box from 'components/@common/Box';
import upArrowIcon from 'assets/up-arrow-icon.svg';
import { useState } from 'react';

const OrderProductCardList = () => {
  const checkedCartProducts = useRecoilValue(getCheckedCartProductsState);
  const totalOrderCountText = `(총 ${checkedCartProducts.length}개)`;
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const accordionIconAlt = isAccordionOpen ? '상품목록 열림' : '상품목록 닫힘';

  const toggleAccordion = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  return (
    <Box sizing={{ width: '100%' }} flex={{ flexDirection: 'column', align: 'flex-start' }} role="list">
      <AccordionTrigger onClick={toggleAccordion}>
        <Box sizing={{ width: '100%' }} flex={{ justify: 'flex-start' }}>
          <Title>주문상품</Title>
          <TotalOrderCount>{totalOrderCountText}</TotalOrderCount>
        </Box>
        <AccordionIcon src={upArrowIcon} alt={accordionIconAlt} isOpen={isAccordionOpen} />
      </AccordionTrigger>
      {isAccordionOpen && (
        <Box sizing={{ width: '100%' }} flex={{ flexDirection: 'column' }}>
          {checkedCartProducts.map((checkedCartProduct) => (
            <OrderProductCard key={checkedCartProduct.product.id} checkedCartProduct={checkedCartProduct} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default OrderProductCardList;

const AccordionTrigger = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 80px;
  z-index: 10;
  width: 100%;
  height: 60px;
  border: none;
  border-bottom: 1px solid var(--color-grayscale-200);
  background-color: var(--color-pure-white);
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
  text-align: left;
`;

const TotalOrderCount = styled.span`
  font-size: 18px;
  font-weight: 700;
  text-align: left;
`;

const AccordionIcon = styled.img<{ isOpen: boolean }>`
  width: 20px;
  height: 20px;

  transform: ${({ isOpen }) => (isOpen ? '' : 'scaleY(-1)')};
`;
