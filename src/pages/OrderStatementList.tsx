import { getOrderStatement } from "api/orders";

import OrderStatement from "components/OrderStatement";
import OrderStatementModal from "components/OrderStatementModal";
import ErrorInfo from "components/common/ErrorInfo";
import LoadingSpinner from "components/common/LoadingSpinner";
import Page from "components/common/Page";
import { useFetch } from "hooks/useFetch";
import { useOrderStatementModal } from "hooks/useOrderStatementModal";

import { styled } from "styled-components";

import { EachOrderStatement } from "types/domain";

const OrderStatementList = () => {
  const { isLoading, data, error } =
    useFetch<EachOrderStatement[]>(getOrderStatement);
  const { itemForModal, isModalOpen, openModal, closeModal } =
    useOrderStatementModal<EachOrderStatement>(data);

  if (isLoading)
    return (
      <Page pageName="주문내역">
        <Wrapper>
          <LoadingSpinner />
        </Wrapper>
      </Page>
    );

  if (error)
    return (
      <Page pageName="주문내역">
        <Wrapper>
          <ErrorInfo size="M" />
        </Wrapper>
      </Page>
    );

  return (
    <>
      {isModalOpen && itemForModal && (
        <OrderStatementModal
          orderId={itemForModal.orderId}
          orders={itemForModal.orderItems}
          closeModal={closeModal}
        />
      )}
      <Page pageName="주문내역">
        <Wrapper>
          {data &&
            data.map((order) => (
              <OrderStatement
                key={order.orderId}
                orderId={order.orderId}
                orders={order.orderItems}
                openModal={openModal(order)}
              />
            ))}
        </Wrapper>
      </Page>
    </>
  );
};

const Wrapper = styled.main`
  margin: auto;
  width: 80%;

  @media (max-width: 575px) {
    width: 100%;
  }
`;

export default OrderStatementList;
