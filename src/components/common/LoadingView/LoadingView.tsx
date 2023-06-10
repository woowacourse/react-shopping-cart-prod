import styled from 'styled-components';
import LoadingSpinner, { SpinnerProps } from '../LoadingSpinner/LoadingSpinner';

const LoadingView = ({ diameter, spinnerWidth, color }: SpinnerProps) => {
  return (
    <LoadingViewWrapper>
      <LoadingSpinner
        diameter={diameter}
        spinnerWidth={spinnerWidth}
        color={color}
      />
    </LoadingViewWrapper>
  );
};

const LoadingViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 200px;
`;

export default LoadingView;
