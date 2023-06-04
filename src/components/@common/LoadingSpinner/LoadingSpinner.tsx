import * as S from './LoadingSpinner.style';

type LoadingSpinnerProps = {
  $width: number;
  $height: number;
};

function LoadingSpinner({ $width = 48, $height = 48 }: LoadingSpinnerProps) {
  return <S.Spinner width={$width} height={$height}></S.Spinner>;
}

export default LoadingSpinner;
