import { styled } from "styled-components";

export const OrderItem = () => {
  return (
    <Wrapper>
      <ItemImage />
      <ItemDetail>
        <ItemName>친환경 실링용기 -ECO 19153</ItemName>
        <ItemInfo>{`${Number(3000).toLocaleString()}원 / 수량 : 3개`}</ItemInfo>
      </ItemDetail>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 30px;

  width: 100%;
  height: 220px;
  padding: 39px 26px;

  border: 1px solid #aaaaaa;
`;

const ItemImage = styled.img`
  width: 141px;
  height: 141px;
`;

const ItemDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
`;

const ItemName = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #333333;
`;

const ItemInfo = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #888888;
`;
