import { URLSearchParamsInit, createSearchParams, useNavigate } from 'react-router-dom';

const useNavigateSearchParams = () => {
  const navigate = useNavigate();

  return (pathname: string, params: URLSearchParamsInit) => {
    navigate({
      pathname,
      search: createSearchParams(params).toString(),
    });
  };
};

export { useNavigateSearchParams };
