import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';

interface Props extends React.PropsWithChildren {
  isLoading: boolean;
}
const CartControllerSuspense = ({ isLoading, children }: Props) => {
  return isLoading ? (
    <LoadingSpinner diameter="40px" spinnerWidth="3px" color="white" />
  ) : (
    <>{children}</>
  );
};

export default CartControllerSuspense;
