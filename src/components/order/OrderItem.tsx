import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  length: number;
  buttonHidden?: boolean;
}

export default function OrderItem({ length, buttonHidden = false }: Props) {
  return (
    <Wrapper>
      <Header>
        <span>주문번호 : 1</span>
        {!buttonHidden && <HeaderLink to="/order/1">{'상세보기 >'}</HeaderLink>}
      </Header>
      {Array.from({ length }).map(() => (
        <Item>
          <Box>
            <Image src="/emptyProduct.svg" />
            <InfoBox>
              <Label>친환경 실링용기-ECO 19153</Label>
              <Price>
                {(180600).toLocaleString()}원 / 수량 : {3}개
              </Price>
            </InfoBox>
          </Box>
        </Item>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;

  & + & {
    margin-top: 64px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 92px;
  border: 1px solid #aaaaaa;
  padding: 28px;
  background: #f6f6f6;

  font-size: 20px;
  color: #333333;
`;

const HeaderLink = styled(Link)`
  background: transparent;

  font-size: 20px;
  color: #333333;
`;

const Item = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 220px;
  border: 1px solid #aaaaaa;
  padding: 24px;

  & + & {
    border-top: none;
  }
`;

const Box = styled.div`
  display: flex;

  width: 100%;
  height: 142px;
`;

const Image = styled.img`
  width: 142px;
  height: 142px;
`;

const InfoBox = styled.div`
  height: 142px;
  margin-left: 32px;
`;

const Label = styled.p`
  margin-bottom: 32px;

  font-size: 20px;
`;

const Price = styled.p`
  font-size: 16px;
  color: #888888;
`;
