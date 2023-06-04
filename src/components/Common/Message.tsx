import { Link } from 'react-router-dom';
import styled from 'styled-components';

type MessageType =
  | 'error'
  | 'empty'
  | 'notFound'
  | 'loading'
  | 'orderCompleted'
  | 'orderFailed';

interface MessageProps {
  type: MessageType;
  homeLink?: boolean;
  orderLink?: boolean;
  cartLink?: boolean;
}

const message = {
  error: {
    title: '에러가 발생했습니다.',
    description: '새로고침 해주세요.',
    imageSrc: 'images/error.png',
  },
  empty: {
    title: '상품을 찾을 수 없습니다.',
    description: '새로고침 해주세요.',
    imageSrc: 'images/error.png',
  },
  notFound: {
    title: '페이지를 찾을 수 없습니다.',
    description: '페이지가 존재하지 않거나 삭제되어 찾을 수 없어요.',
    imageSrc: 'images/error.png',
  },
  loading: {
    title: '로딩중입니다. ',
    description: '잠시만 기다려주세요.',
    imageSrc: 'images/loading.png',
  },
  orderCompleted: {
    title: '결제가 완료되었습니다. ',
    description:
      "해당 주문에 대한 정보는 '주문목록' 페이지에서 확인하실 수 있습니다.",
    imageSrc: 'images/배달.jpg',
  },
  orderFailed: {
    title: '결제가 실패하였습니다.',
    description: '다시 결제를 시도해주세요.',
    imageSrc: 'images/error.png',
  },
};

const Message = ({
  type,
  homeLink = false,
  orderLink = false,
  cartLink = false,
}: MessageProps) => {
  return (
    <MessageSection>
      <img
        width={170}
        height={170}
        src={`${process.env.PUBLIC_URL}/${message[type].imageSrc}`}
        alt='오류 발생 이미지'
      />
      <MessageTitle>{message[type].title}</MessageTitle>
      <MessageDesc>{message[type].description}</MessageDesc>
      <LinkBtnWrapper>
        {homeLink && <LinkBtn to='/'>홈으로 가기</LinkBtn>}
        {orderLink && <LinkBtn to='/orders'>주문목록</LinkBtn>}
        {cartLink && <LinkBtn to='/cart'>장바구니</LinkBtn>}
      </LinkBtnWrapper>
    </MessageSection>
  );
};

const MessageSection = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 320px;
  transform: translate(-50%, -50%);
`;

const MessageTitle = styled.h2`
  margin: 25px 0 0 0;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
`;

const MessageDesc = styled.p`
  margin: 15px 0 0 0;
`;

const LinkBtnWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

const LinkBtn = styled(Link)`
  width: 100px;
  height: 40px;
  margin: 36px 0 0 0;
  text-align: center;
  line-height: 40px;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
`;

export default Message;
