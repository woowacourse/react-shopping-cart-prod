import styled from '@emotion/styled';
import { ErrorIcon } from '../../../assets';
import { Text } from '../Text/Text';

type ErrorType = 'emptyList' | 'network' | 'emptyOrder';

const ErrorBox = ({ errorType }: { errorType: ErrorType }) => {
  const errorText = {
    emptyList: '상품 리스트가 없습니다.',
    emptyOrder: '잘못된 접근입니다.',
    network: '잠시 후 다시 시도해주세요.',
  };

  return (
    <ErrorWrapper>
      <ErrorIcon width={100} />
      <Text weight="normal" size="large">
        {errorText[errorType]}
      </Text>
    </ErrorWrapper>
  );
};

export default ErrorBox;

const ErrorWrapper = styled.div`
  display: flex;
  align-items: center;
`;
