import React from 'react';
import { createUseStyles } from 'react-jss';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import * as pages from 'constants/pages';
import pagesURLs from 'constants/pagesURLs';
import useTheme from 'misc/hooks/useTheme';

import RatingFilter from './filters/RatingFilter';
import CountryFilter from './filters/CountryFilter';
import CategoryFilter from './filters/CategoryFilter';

import {useFilters } from '../../misc/providers/FiltersProvider';

const getClasses = createUseStyles((theme) => ({
  container: {
    background: theme.pageContainer.content.color.background,
    position: 'fixed',
    top: 40,
    right: 0,
    height: 'calc(100vh - 70px)',
    // overflowY: 'scroll',
    width: '15%',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    border: '1px solid #ddd',
    overflowY: 'auto',
    gap: theme.spacing(4),

  },
  createPostButton: {
    textDecoration: 'none',
    paddingTop: '20px',
  },
  filterBlock: { display: 'flex', flexDirection: 'column', gap: '8px' },
}));

function RightNavBar() {
  const { formatMessage } = useIntl();
  const { theme } = useTheme();
  const classes = getClasses({ theme });

  const { filters, setFilters } = useFilters();

  const handleRatingChange = (value) => {
    setFilters(prev => ({ ...prev, minRating: prev.minRating === value ? null : value }));
  };

  return (
    <div className={classes.container}>
      <Link to={{ pathname: `${pagesURLs[pages.secretPage]}/new` }} className={classes.createPostButton} >
        <Button variant='primary' color="primary">
          {formatMessage({ id: 'createPost' })}
        </Button>
      </Link>

      <div className={classes.filterBlock}>
        <RatingFilter
          filters={filters}
          setFilters={setFilters}
          formatMessage={formatMessage}
          onChange={handleRatingChange}
        />
      </div>

      <div className={classes.filterBlock}>
        <CountryFilter
          filters={filters}
          setFilters={setFilters}
          formatMessage={formatMessage}
        />
      </div>

      <div className={classes.filterBlock}>
        <CategoryFilter
          filters={filters}
          setFilters={setFilters}
          formatMessage={formatMessage}
        />
      </div>
    </div>
  );
}

export default RightNavBar;