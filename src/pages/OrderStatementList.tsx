import { getOrderStatement } from "api/orders";
import Header from "components/Header";
import OrderStatement from "components/OrderStatement";
import OrderStatementModal from "components/OrderStatementModal";
import LoadingSpinner from "components/common/LodingSpinner";
import Page from "components/common/Page";
import Skeleton from "components/common/Skeleton";
import { Suspense, useEffect, useState } from "react";
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
      <Suspense
        fallback={
          <Skeleton
            {...{ background: "#333333", width: "100%", height: "70px" }}
          />
        }
      >
        <Header />
      </Suspense>
      <Page pageName="주문내역">
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
      </Page>
    </>
  );
};

export default OrderStatementList;
