import { NavigateOptions, useNavigate } from 'react-router-dom';

export const useRouter = () => {
  const navigate = useNavigate();

  const goPage = (path: string, options?: NavigateOptions) => () => {
    navigate(path, options);
  };

  return { goPage };
};
