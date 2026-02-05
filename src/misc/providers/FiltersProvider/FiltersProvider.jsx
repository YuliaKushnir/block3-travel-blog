import React, { createContext, useState, useContext, useEffect } from 'react';

export const FiltersContext = createContext(null);

const defaultFilters = {
  minRating: null,
  countries: [],
  categories: [],
};

const FiltersProvider = ({
  children,
}) => {
  const [ready, setReady] = useState(false);
  const [filters, setFilters ] = useState(() => { 
    const saved = sessionStorage.getItem('FILTERS');
    return saved ? JSON.parse(saved) : defaultFilters;
  });

  useEffect(() => {
    sessionStorage.setItem('FILTERS', JSON.stringify(filters));
    setReady(true);
  }, [filters]);

  return (
    <FiltersContext.Provider value={{filters, setFilters, ready}}>
      {children}
    </FiltersContext.Provider>
  );
};

export default FiltersProvider;
export const useFilters = () => useContext(FiltersContext);
