import { useMemo } from 'react';
import {
  useSearchParams,
} from 'react-router-dom';

const useLocationSearch = () => {
  const [ searchParams ] = useSearchParams();

  return useMemo(
    () => {
      const params = Object.fromEntries(new URLSearchParams(searchParams));
      const page = Number(params.page);

      return {
        page: Number.isInteger(page) > 0 ? page : 1,
        size: Number(params.size) > 0 ? Number(params.size) : 10,
        lang: params.lang || 'ua',
      };
    }, [searchParams]
);
};

export default useLocationSearch;
