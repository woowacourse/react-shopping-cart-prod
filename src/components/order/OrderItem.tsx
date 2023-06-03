import { BiDetail } from 'react-icons/bi';
import { css, styled } from 'styled-components';
import { OrderItemInfo } from '../../types';
import Price from '../common/Price';
import Button from '../common/Button';

interface Props {
  orderItemInfo: OrderItemInfo;
  isDetail?: boolean;
}

export default function OrderItem({ orderItemInfo, isDetail = false }: Props) {
  const { orderNumber, date, products } = orderItemInfo;

  return (
    <>
      <Style.TitleContainer>
        <Style.Title>
          <span>주문번호: {orderNumber}</span>
          <span>({date})</span>
        </Style.Title>
        {!isDetail && (
          <Button designType="text" fontSize="20px" color="var(--grey-400)" aria-label="상세보기">
            <BiDetail />
          </Button>
        )}
      </Style.TitleContainer>
      <Style.Products isDetail={isDetail}>
        {products.map(({ id, name, price, imageUrl, quantity }) => (
          <Style.ProductContainer key={id}>
            <Style.ProductImageWrapper>
              <Style.ProductImage src={imageUrl} alt={name} />
            </Style.ProductImageWrapper>
            <div>
              <Style.ProductName>{name}</Style.ProductName>
              <Style.ProductPriceAndQuantity>
                <Price price={price} size="small" />
                <Style.Span>/</Style.Span>
                <span>수량: {quantity}개</span>
              </Style.ProductPriceAndQuantity>
            </div>
          </Style.ProductContainer>
        ))}
      </Style.Products>
    </>
  );
}

const Style = {
  TitleContainer: styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid var(--grey-300);
    padding: 20px;
  `,

  Title: styled.h3`
    display: flex;
    gap: 10px;
  `,

  ButtonContent: styled.p`
    margin-left: 5px;
    font-size: 12px;
  `,

  Products: styled.ul<{ isDetail: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 10px;

    ${({ isDetail }) =>
      isDetail
        ? ''
        : css`
            max-height: 350px;
            overflow-y: scroll;
          `};
  `,

  ProductContainer: styled.li`
    display: flex;

    height: 170px;

    padding: 20px;
    border-bottom: 1px ridge;
  `,

  ProductImageWrapper: styled.div`
    width: 130px;
    height: 130px;

    position: relative;
    overflow: hidden;
    margin-right: 20px;
  `,

  ProductImage: styled.img`
    width: 100%;
    height: 100%;

    position: absolute;
    object-fit: cover;
  `,

  ProductName: styled.h4`
    margin-bottom: 10px;
  `,

  ProductPriceAndQuantity: styled.p`
    display: flex;

    font-size: 10px;
    color: var(--grey-300);
  `,

  Span: styled.span`
    margin: 0 5px;
  `,
};
