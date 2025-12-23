import React from 'react';
import Typography from 'components/Typography';
import { createUseStyles } from 'react-jss';
import useTheme from 'misc/hooks/useTheme';

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

function RatingFilter({ filters, setFilters, formatMessage }) {

    const { theme } = useTheme();
    const classes = getClasses({ theme });

    const handleRatingChange = (value) => {
        setFilters(prev => ({ ...prev, minRating: prev.minRating === value ? null : value }));
    };

  return (
    <div className={classes.filterBlock}>
      <Typography variant="subtitle">
        {formatMessage({ id: 'rating' })}
      </Typography>

      <label className={classes.label}>
        <input
          type="checkbox"
          checked={filters.minRating === 4.5}
          onChange={() => handleRatingChange(filters.minRating === 4.5 ? null : 4.5)}
        />
        {formatMessage({ id: 'rating45' })}
      </label>

      <label className={classes.label}>
        <input
          type="checkbox"
          checked={filters.minRating === 4}
          onChange={() => handleRatingChange(filters.minRating === 4 ? null : 4)}
        />
        {formatMessage({ id: 'rating4' })}
      </label>

      <label className={classes.label}>
        <input
          type="checkbox"
          checked={filters.minRating === 3.5}
          onChange={() => handleRatingChange(filters.minRating === 3.5 ? null : 3.5)}
        />
        {formatMessage({ id: 'rating35' })}
      </label>
    </div>
  );
}

export default RatingFilter;