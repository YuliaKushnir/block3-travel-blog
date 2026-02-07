import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import useTheme from 'misc/hooks/useTheme';
import React, { useEffect, useState } from 'react';
import Typography from 'components/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, fetchPosts } from 'app/actions/posts';
import { fetchUsers } from 'app/actions/users';
import Card from 'components/Card';
import Button from 'components/Button';
import CardContent from 'components/CardContent';
import CardActions from 'components/CardActions';
import IconButton from 'components/IconButton';
import Delete from 'components/icons/Delete';
import Dialog from 'components/Dialog';
import { Link, useNavigate } from 'react-router-dom';

import * as pages from 'constants/pages';
import pagesURLs from 'constants/pagesURLs';
import RightNavBar from 'app/components/RightNavBar';
import useLocationSearch from 'misc/hooks/useLocationSearch';
import { useFilters } from 'misc/providers/FiltersProvider';
import StarIcon from 'components/icons/StarIcon';
import { fetchProfile } from 'app/actions/user';

const getClasses = createUseStyles((theme) => ({
  container: { display: 'grid', gap: `${theme.spacing(5)}px`, padding: 16 },
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: `${theme.spacing(4)}px`,
  },
  card: {
    flex: '1 1 calc(50% - 16px)',
    '@media (max-width: 768px)': {
      flex: '1 1 100%',
    },
    height: '220px',
    position: 'relative',
    '&:hover $deleteButton': {
      opacity: 1,
      visibility: 'visible',
    },
  },
  cardBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '35px',
  },
  deleteButton: {
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 0.2s ease',
  },
  pagination: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    fontSize: '1.2rem',    
  },
  
  errorText: { color: theme.header.color.text.error },
  successText: { color: theme.header.color.text.success },
}));

function Default() {
  const { theme } = useTheme();
  const classes = getClasses({ theme });
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filters, ready } = useFilters();

    const [setComponentDidMount] = useState(false);
  
    const {  isFetchingUser } = useSelector(s => s.user);
  
    useEffect(() => {
      dispatch(fetchProfile());
      setComponentDidMount(true); 
    }, [dispatch, setComponentDidMount]);
    console.log(isFetchingUser);

  const { postsList, isLoading,  deleteSuccess, deleteError, totalPages } = useSelector(s => s.posts);

  const { page: currentPage, size: pageSize } = useLocationSearch();

  const currentUserId = useSelector(s => s.user?.user?.userId);
    
  useEffect(() => {
    if(!ready) return;

    dispatch(fetchPosts({ 
      page: currentPage - 1, 
      size: pageSize,
      minRating: filters.minRating,
      countries: filters.countries,
      categories: filters.categories,
    }))
    .catch(err => console.error("Error fetching posts", err));

    dispatch(fetchUsers());
  }, [ready, dispatch, currentPage, pageSize, filters]);


  const { usersList } = useSelector(s => s.users);
    
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (deleteSuccess) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_DELETE_SUCCESS' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [deleteSuccess, dispatch]);

  const getUserName = (userId) => {
    const user = usersList.find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  }

  const isOwner = (post) => currentUserId && post.userId === currentUserId;

  const handleDeleteClick = (post) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedPost) {
      dispatch(deletePost(selectedPost.id));
      setOpenDialog(false);
      setSelectedPost(null);
    }
  };

  const goToPage = (page) => {
    navigate(`?page=${page}&size=${pageSize}`);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  return (
    <div className={classes.container}>
      <RightNavBar />
      <Typography variant="h1">{formatMessage({ id: 'title' })}</Typography>
      <Typography variant="h4">{formatMessage({ id: 'discoverStories' })}</Typography>
      <Typography variant="h5">{formatMessage({ id: 'postsList' })}</Typography>

      {isLoading && <Typography>{formatMessage({ id: 'loading' })}</Typography>}

      <div className={classes.cardsContainer}>     
      {!isLoading && postsList.map(post => (
      
        <Card key={post.id} variant="moonlight" sx={{ width: '50%' }} className={classes.card} >
            <Link 
              to={{pathname: `${pagesURLs[pages.secretPage]}/${post.id}`,}}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
            <CardContent>
              <Typography variant="title">{`${post.title}`}</Typography>
              <div className={classes.cardBlock}>
                <Typography variant="subtitle" >{formatMessage({ id: 'country' })}: {post.country}</Typography>
                <Typography variant="subtitle">{formatMessage({ id: 'author' })}: {getUserName(post.userId)}</Typography>
                {/* <Typography variant="subtitle">{formatMessage({ id: 'author' })}: {post?.author?.name || 'Unknown'}</Typography> */}
              </div>
              <div className={classes.cardBlock}>
                <Typography variant="default">{post.categories.join(', ')}</Typography>
                <Typography variant="default">
                  <StarIcon color="#ffd050" size={18} /> 
                  {post.rating}
                </Typography>
              </div>
            </CardContent>
          </Link>

          {isOwner(post) && (
          <CardActions>
            <IconButton onClick={() => handleDeleteClick(post)} className={classes.deleteButton}>
              <Delete />
            </IconButton>
          </CardActions>
          )}
        </Card>
      ))}
      </div>

      {/* Пагінація */}
      <div className={classes.pagination}>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>{formatMessage({ id: 'previousPage' })}</Button>
        <Typography variant="default" style={{ margin: '0 10px' }}>
          {formatMessage({ id: 'page' })} {currentPage} {formatMessage({ id: 'of' })} {totalPages}
        </Typography>
        <Button onClick={handleNextPage} disabled={currentPage >= totalPages}>{formatMessage({ id: 'nextPage' })}</Button>
      </div>


      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <CardContent>
          <Typography>
            {formatMessage({ id: 'deleteConfirmation' })}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleConfirmDelete}>{formatMessage({ id: 'confirm' })}</Button>
          <Button onClick={() => setOpenDialog(false)}>{formatMessage({ id: 'cancel' })}</Button>
          {deleteError && <Typography color="error">{deleteError}</Typography>}
        </CardActions>
      </Dialog>

      {deleteSuccess && (
        <div style={{
          position: 'fixed', bottom: 20, right: 20,
          background: 'lightgreen', padding: 10, borderRadius: 4
        }}>
          {deleteSuccess}
        </div>
      )}


    </div>
  );
}

export default Default;

