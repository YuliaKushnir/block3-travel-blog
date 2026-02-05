import React, { useState, useEffect } from 'react';
import Typography from 'components/Typography';
import { createUseStyles } from 'react-jss';
import storage, { keys } from 'misc/storage';
import useTheme from 'misc/hooks/useTheme';
import Button from 'components/Button';
import { COUNTRIES } from 'app/constants/filters';

const getClasses = createUseStyles((theme) => 
  ({
  filterBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
  label: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '14px',
  },
  })
);

function CountryFilter({ filters, setFilters, formatMessage }) {
  const { theme } = useTheme();
  const classes = getClasses({ theme });
  const [showAll, setShowAll] = useState(false);
  // const [allCountries, setAllCountries] = useState([]);

  // useEffect(() => {
  //   const stored = storage.getItem(keys.COUNTRIES);
  //   if (stored) {
  //     setAllCountries(JSON.parse(stored));
  //   }
  // }, []);

  const allCountries = COUNTRIES;
  const visibleCountries = showAll ? allCountries : allCountries.slice(0, 3);

  const toggleCountry = (value) => {
    const current = filters.countries || [];
    let updated;

    if(current.includes(value)){
      updated = [];
    } else {
      updated = [value];
    }

    const newFilters = { ...filters, countries: updated };
    setFilters(newFilters);
    // const current = filters.countries || [];
    // const updated = current.includes(value)
    //   ? current.filter(c => c !== value)
    //   : [...current, value];

    // const newFilters = { ...filters, countries: updated };
    // setFilters(newFilters);
  };

  

  return (
    <div className={classes.filterBlock}>
      <Typography variant="subtitle">{formatMessage({ id: 'country' })}</Typography>
      {visibleCountries.map(country => (
        <label key={country} className={classes.label}>
          <input
            type="checkbox"
            checked={filters.countries?.includes(country)}
            onChange={() => toggleCountry(country)}
          />
          {country}
        </label>
      ))}
      {allCountries.length > 3 && (
        <Button colorVariant='tertiary' variant="text" onClick={() => setShowAll(!showAll)} fontSize='16px' padding='1px'>
          {showAll 
          ? formatMessage({ id: 'less' })
          : formatMessage({ id: 'more' })
          }
        </Button>
      )}
    </div>
  );
}

export default CountryFilter;