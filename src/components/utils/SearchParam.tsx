import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface SearchParamProps {
  key: string;
}

const SearchParam: React.FC<SearchParamProps> = ({ key }) => {
  const [data, setData] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchParam = searchParams.get(key);
    if (searchParam) {
      setData(searchParam);
    } else {
      setData(null);
    }
  }, [searchParams, key]);

  return data;
};

export default SearchParam;