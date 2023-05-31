import styled from "styled-components";
import { useRecoilValue } from "recoil";
import type { LocalProductType } from "../types/domain";
import { selectedProductsState } from "../recoil/atom";
import { OrderHistory } from "./OrderHistory";

export const OrderHistoryList = () => {
  const selectedProducts = useRecoilValue<LocalProductType[]>(
    selectedProductsState
  );

  return (
    <Wrapper>
      {selectedProducts.map((product) => (
        <OrderHistory key={product.id} {...product} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 85%;
  max-width: 1000px;

  max-height: 500px;
  overflow: scroll;
`;
