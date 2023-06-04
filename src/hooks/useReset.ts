import { useNavigate } from 'react-router-dom';

export const useReset = () => {
  const navigate = useNavigate();

  const onReset = () => {
    navigate(0);
  };

  return { onReset };
};
