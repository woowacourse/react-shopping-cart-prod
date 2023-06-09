import { useNavigate } from 'react-router-dom';

import type { HTTPErrorInfo } from '../../../api/utils/HTTPError';
import ErrorImage from '../../../assets/png/error-image.png';
import { PATH } from '../../../constants/path';
import Button from '../Button/Button';
import Heading from '../Heading/Heading';
import ServerSelect from '../ServerSelect/ServerSelect';
import { Text } from '../Text/Text.styles';
import * as S from './Error.styles';

export interface ErrorProps {
  message: string;
  information?: HTTPErrorInfo['payload'];
  resetError: () => void;
}

const Error = ({ message, information, resetError }: ErrorProps) => {
  const navigate = useNavigate();

  const handleServerChange = () => {
    navigate(PATH.ROOT);
  };

  return (
    <S.ContentWrapper>
      <S.Content>
        <S.Image src={ErrorImage} alt="error" />
        <Heading size="xSmall">{message}</Heading>
        {information?.BODY && <Text css={S.textStyle}>{information.BODY}</Text>}
        <Button css={S.buttonStyle} variant="primary" onClick={resetError}>
          {information?.BUTTON ?? '새로고침'}
        </Button>
        <ServerSelect onChange={handleServerChange} />
      </S.Content>
    </S.ContentWrapper>
  );
};

export default Error;
