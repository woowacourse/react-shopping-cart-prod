import { styled } from "styled-components";

const CartItemListSkeleton = () => {
  return (
    <>
      <ListSkeleton>
        <SelectorContainer>장바구니 목록 스켈레톤</SelectorContainer>
      </ListSkeleton>
      <PurchaseOrderSkeleton />
    </>
  );
};

const ListSkeleton = styled.div`
  width: 65%;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const SelectorContainer = styled.div`
  height: 40px;
  color: transparent;

  padding-bottom: 10px;
  border-bottom: 3px solid var(--primary-blue-color);
`;

const PurchaseOrderSkeleton = styled.div`
  width: 30%;
  height: 350px;

  border-radius: 3px;
  border: 1px solid var(--primary-blue-color);

  position: sticky;
  top: 0;
  margin-left: auto;
  padding: 2%;

  @media (max-width: 767px) {
    display: none;
  }
`;

export default CartItemListSkeleton;
