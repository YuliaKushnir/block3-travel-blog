import React, { useState, useEffect } from 'react';
import Typography from 'components/Typography';
import { createUseStyles } from 'react-jss';
import storage, { keys } from 'misc/storage';
import useTheme from 'misc/hooks/useTheme';
import Button from 'components/Button';

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
  }
  })
);

function CategoryFilter({ filters, setFilters, formatMessage }) {
  const { theme } = useTheme();
  const classes = getClasses({ theme });

  const [showAll, setShowAll] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const stored = storage.getItem(keys.CATEGORIES);
    if (stored) {
      setAllCategories(JSON.parse(stored));
    }
  }, []);

  const visibleCategories = showAll ? allCategories : allCategories.slice(0, 3);

  const toggleCategory = (value) => {
    const current = filters.categories || [];
    const updated = current.includes(value)
      ? current.filter(c => c !== value)
      : [...current, value];

    const newFilters = { ...filters, categories: updated };
    setFilters(newFilters);
  };

  return (
    <div className={classes.filterBlock}>
      <Typography variant="subtitle">{formatMessage({ id: 'category' })}</Typography>
      {visibleCategories.map(category => (
        <label key={category} className={classes.label}>
          <input
            type="checkbox"
            checked={filters.categories?.includes(category)}
            onChange={() => toggleCategory(category)}
          />
          {category}
        </label>
      ))}
      {allCategories.length > 3 && (
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

export default CategoryFilter;