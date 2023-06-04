import { styled } from 'styled-components';
import { OrderDetailsType } from '../types';

interface OrderedProductProps {
  orderDetail: OrderDetailsType;
}

export const OrderedProduct = ({ orderDetail }: OrderedProductProps) => {
  return (
    <>
      <Style.Product>
        <Style.ProductImage path={orderDetail.product.imageUrl} />
        <Style.ProductInformation>
          <Style.ProductName>{orderDetail.product.name}</Style.ProductName>
          <Style.ProductPriceAndQuantity>
            {orderDetail.product.price.toLocaleString('ko-KR')}원 / 수량 : {orderDetail.quantity}개
          </Style.ProductPriceAndQuantity>
        </Style.ProductInformation>
      </Style.Product>
    </>
  );
};

const Style = {
  Product: styled.div`
    display: flex;

    background: #ffffff;
    border: 1px solid #aaaaaa;
  `,

  ProductImage: styled.div<{ path: string }>`
    width: 141px;
    height: 142px;

    object-fit: cover;

    margin: 40px 20px;

    background-image: ${(props) => `url(${props.path})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    @media screen and (max-width: 500px) {
      width: 96px;
      height: 98px;

      margin: 10px;
    }
  `,

  ProductInformation: styled.div`
    display: flex;
    flex-direction: column;
  `,

  ProductName: styled.span`
    font-size: 20px;
    line-height: 24px;

    letter-spacing: 0.5px;

    margin: 42px 0 30px 0;

    color: #333333;

    @media screen and (max-width: 500px) {
      margin: 30px 0 10px 0;
    }
  `,

  ProductPriceAndQuantity: styled.span`
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;

    letter-spacing: 0.5px;

    color: #888888;

    @media screen and (max-width: 500px) {
      font-size: 15px;
    }
  `,
};
