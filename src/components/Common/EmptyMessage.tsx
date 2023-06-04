import styled from 'styled-components';

import { EmptyMessageKey, EMPTY_MESSAGE } from '../../constants/message';

interface EmptyMessageProps {
  type: EmptyMessageKey;
}

const EmptyMessage = ({ type }: EmptyMessageProps) => {
  return (
    <MessageSection>
      <img
        width={160}
        height={160}
        src={`${process.env.PUBLIC_URL}/images/lay-down.png`}
        alt={EMPTY_MESSAGE[type].title}
      />
      <MessageTitle>{EMPTY_MESSAGE[type].title}</MessageTitle>
      <MessageDesc>{EMPTY_MESSAGE[type].description}</MessageDesc>
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
  margin: 16px 0 0 0;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
`;

const MessageDesc = styled.p`
  margin: 8px 0 0 0;
  white-space: pre-line;
  text-align: center;
  line-height: 1.8;
`;

export default EmptyMessage;
