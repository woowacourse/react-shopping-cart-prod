import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../constants';

export const useGoToAnotherPage = () => {
  const navigator = useNavigate();
  const location = useLocation().pathname;

  const goToPage = (path: (typeof ROUTE_PATH)[keyof typeof ROUTE_PATH]) => {
    if (location !== path) navigator(path);
  };

  return goToPage;
};
