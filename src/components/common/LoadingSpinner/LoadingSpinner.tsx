import styled from 'styled-components';

export interface SpinnerProps {
  diameter?: string;
  spinnerWidth?: string;
  color?: string;
}

const LoadingSpinner = (props: SpinnerProps) => {
  const { diameter, spinnerWidth, color } = props;

  return (
    <SpinnerDiv
      style={{
        width: diameter ?? '77px',
        height: diameter ?? '77px',
        borderWidth: spinnerWidth ?? '7px',
        borderTopColor: color ?? '#06c09e',
      }}
    />
  );
};

const SpinnerDiv = styled.div`
  content: '';
  display: inline-flex;
  justify-content: center;
  align-items: center;

  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  border: 10px solid rgba(0, 0, 0, 0.2);
  border-top-color: #06c09e;
  border-radius: 50%;

  animation: spin 1.5s infinite;

  @keyframes spin {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingSpinner;
