import { styled } from 'styled-components';

export const Container = styled.li`
  width: 100%;
  padding: 20px;

  display: flex;
`;

export const Thumbnail = styled.img`
  width: 150px;
  height: 130px;

  margin-right: 20px;
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.h3`
  margin-bottom: 20px;
`;

export const PriceAndQuantity = styled.span`
  color: gray;
`;
