import { getOrderStatement } from "api/orders";

import OrderStatement from "components/OrderStatement";
import OrderStatementModal from "components/OrderStatementModal";
import LoadingSpinner from "components/common/LoadingSpinner";
import Page from "components/common/Page";

import { useEffect, useState } from "react";

import { styled } from "styled-components";

import { EachOrderStatement } from "types/domain";

const OrderStatementList = () => {
  const [orderStatementList, setOrderStatementList] =
    useState<EachOrderStatement[]>();
  const [orderForModal, setOrderForModal] = useState<EachOrderStatement>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getOrderStatement().then((res) => {
      if (!res) return alert("주문목록 불러오기 실패!");

      setOrderStatementList(res);
    });
  }, []);

  const openModal = (orderId: number) => () => {
    setOrderForModal(
      orderStatementList?.find((order) => order.orderId === orderId)
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && orderForModal && (
        <OrderStatementModal
          orderId={orderForModal.orderId}
          orders={orderForModal.orderItems}
          closeModal={closeModal}
        />
      )}
      <Page pageName="주문내역">
        <Wrapper>
          {orderStatementList ? (
            orderStatementList.map((order) => (
              <OrderStatement
                key={order.orderId}
                orderId={order.orderId}
                orders={order.orderItems}
                openModal={openModal(order.orderId)}
              />
            ))
          ) : (
            <LoadingSpinner />
          )}
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
