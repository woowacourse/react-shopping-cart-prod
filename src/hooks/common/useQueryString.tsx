import { useLocation } from 'react-router-dom';
import { getQueries } from '../../utils/getQueries';

const useQueryString = <T extends string>(
  keyArr: Readonly<T[]>
): Record<T, string> => getQueries(useLocation().search, keyArr);

export default useQueryString;
