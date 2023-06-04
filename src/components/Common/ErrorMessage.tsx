import styled from 'styled-components';

import { ErrorMessageKey, ERROR_MESSAGE } from '../../constants/message';

interface ErrorMessageProps {
  type: ErrorMessageKey;
}

const ErrorMessage = ({ type }: ErrorMessageProps) => {
  return (
    <MessageSection>
      <img
        width={160}
        height={160}
        src={`${process.env.PUBLIC_URL}/images/error.png`}
        alt={ERROR_MESSAGE[type].title}
      />
      <MessageTitle>{ERROR_MESSAGE[type].title}</MessageTitle>
      <MessageDesc>{ERROR_MESSAGE[type].description}</MessageDesc>
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

export default ErrorMessage;
