import { getOrderStatement } from "api/orders";

import OrderStatement from "components/OrderStatement";
import OrderStatementModal from "components/OrderStatementModal";
import ErrorInfo from "components/common/ErrorInfo";
import Page from "components/common/Page";
import OrderStatementSkeleton from "components/skeleton/OrderStatementSkeleton";
import { useFetch } from "hooks/useFetch";
import { useOrderStatementModal } from "hooks/useOrderStatementModal";
import { useRecoilValue } from "recoil";
import { serverSelectState } from "recoil/server";

import { styled } from "styled-components";

import { OrderResultStatement } from "types/domain";

const OrderStatementList = () => {
  const selectedServer = useRecoilValue(serverSelectState);

  const { isLoading, data, error } = useFetch<OrderResultStatement[]>(() =>
    getOrderStatement(selectedServer)
  );
  const { itemForModal, isModalOpen, openModal, closeModal } =
    useOrderStatementModal<OrderResultStatement>(data);

  if (isLoading)
    return (
      <Page pageName="주문목록">
        <Wrapper>
          <OrderStatementSkeleton />
        </Wrapper>
      </Page>
    );

  if (error)
    return (
      <Page pageName="주문목록">
        <Wrapper>
          <ErrorInfo error={error} />
        </Wrapper>
      </Page>
    );

  return (
    <>
      {isModalOpen && itemForModal && (
        <OrderStatementModal
          itemForModal={itemForModal}
          closeModal={closeModal}
        />
      )}
      <Page pageName="주문목록">
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
