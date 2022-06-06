import { useSearchParams } from 'react-router-dom';

export const usePage = () => {
  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  return currentPage;
};
