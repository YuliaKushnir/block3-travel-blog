import React, { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import useTheme from 'misc/hooks/useTheme';
import storage, { keys } from 'misc/storage';

import Button from 'components/Button';
import Card from 'components/Card';
import CardTitle from 'components/CardTitle';
import CardContent from 'components/CardContent';
import IconButton from 'components/IconButton';
import IconEdit from 'components/icons/Edit';
import TextField from 'components/TextField';
import Typography from 'components/Typography';

import { fetchPostById, updatePostById, createPost } from 'app/actions/posts';

import pagesURLs from 'constants/pagesURLs';
import * as pages from 'constants/pages';
import StarIcon from 'components/icons/StarIcon';
import CategoriesSelect from '../component/CategoriesSelect';
import { showNotification } from 'app/reducers/notification';

const getClasses = createUseStyles((theme) => ({
  container: { display: 'grid', gap: `${theme.spacing(1)}px`, padding: 16 },
  header: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    paddingTop: '15px' 
  },
  actions: { 
    display: 'flex', 
    gap: theme.spacing(4), 
    padding: '30px 0px'
  },
  contentFields: { 
    display: 'flex', 
    flexDirection: 'column',
    gap: theme.spacing(1),
    padding: '20px 0px',
  },
  fields: { 
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),   
  },
  errorText: { color: theme.header.color.text.error },
  successText: { color: theme.header.color.text.success },
  subtitleBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 0px',
  },
  titleBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 0px',
  },
  content: {
    boxShadow: '0 0 6px rgba(179, 178, 177, 0.2)',
  },

}));

const validate = (post) => {
  const errs = {};
  if (!post.title || post.title.trim().length < 3) {
    errs.title = 'Мінімум 3 символи';
  }
  if (!post.country) {
    errs.country = 'Поле обов’язкове';
  }
  if (!Array.isArray(post.categories)) {
    errs.categories = 'Список категорій невалідний';
  }
  return errs;
};

function Secret() {
  const { formatMessage } = useIntl();
  const { theme } = useTheme();
  const classes = getClasses({ theme });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentPost, isFetchingCurrent, isSaving, errorSaving } = useSelector(s => s.posts);
  const { usersList } = useSelector(s => s.users);

  const params = useParams();
  const [mode, setMode] = useState(!params.id ? 'create' : 'view');

  const [edited, setEdited] = useState({
    title: '',
    content: '',
    country: '',
    categories: [],
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);

  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const stored = storage.getItem(keys.CATEGORIES);
    if (stored) {
      setAllCategories(JSON.parse(stored));
    }
  }, []);

  const getUserName = (userId) => {
    const user = usersList.find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  };

  // Завантаження сутності
  useEffect(() => {
    if (params.id) {
      dispatch(fetchPostById(params.id));
    } else {
      setEdited({ title: '', content: '', country: '', categories: [] });
    }
  }, [dispatch, params.id]);

  // Заповнення форми при отриманні currentPost
  useEffect(() => {
    if (currentPost) {
      setEdited({
        title: currentPost.title ?? '',
        content: currentPost.content ?? '',
        country: currentPost.country ?? '',
        categories: Array.isArray(currentPost.categories) ? currentPost.categories : [],
      });
    }
  }, [currentPost]);

  // Перемикання режиму при зміні params.id
  useEffect(() => {
    if (params.id) {
      setMode('view');
      dispatch(fetchPostById(params.id));
    } else {
      setMode('create');
      setEdited({ title: '', content: '', country: '', categories: [] });
    }
  }, [params.id, dispatch]);

  // Автоматичне очищення повідомлення
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const goBackToList = () => {
    navigate(pagesURLs[pages.secretPage]);
  };

  const onStartEdit = () => setMode('edit');

  const onCancel = () => {
    if (!params.id) {
      goBackToList();
    } else {
      if (currentPost) {
        setEdited({
          title: currentPost.title ?? '',
          content: currentPost.content ?? '',
          country: currentPost.country ?? '',
          categories: Array.isArray(currentPost.categories) ? currentPost.categories : [],
        });
      }
      setErrors({});
      setMode('view');
    }
  };

  const onSave = () => {
    const v = validate(edited);
    setErrors(v);
    if (Object.keys(v).length) {
      dispatch(showNotification(formatMessage({ id: 'error.validation' }), 'error'));
      return;
    }

    if (!params.id) {
      dispatch(createPost(edited))
        .then((created) => {
          if (created?.id) {
            dispatch(showNotification(formatMessage({ id: 'success.created' })));
            navigate(`${pagesURLs[pages.secretPage]}/${created.id}`);
            setMode('view');
          }
        })
        .catch(() => {
          dispatch(showNotification(formatMessage({ id: 'error.save' })));
        });
    } else {
      dispatch(updatePostById(params.id, edited))
        .then(() => {
          dispatch(showNotification(formatMessage({ id: 'success.updated' }) ));
          setMode('view');
        })
        .catch(() => {
          dispatch(showNotification(formatMessage({ id: 'error.save' })));
        });
    }
  };

  const headerActions = useMemo(() => (
    mode === 'view' ? (
      <IconButton onClick={onStartEdit} title={formatMessage({ id: 'edit' })}>
        <IconEdit size={36} />
      </IconButton>
    ) : null
  ), [mode, formatMessage]);

  return (
    <div className={classes.container}>
      <div className={classes.actions}>
        <Button onClick={goBackToList}>{formatMessage({ id: 'back' })}</Button>
      </div>

      {/* View */}
      {mode === 'view' && !isFetchingCurrent && currentPost && (
        <div>
          <div className={classes.header}>
            <Typography variant="subtitle">
              {!params.id
                ? formatMessage({ id: 'post.createTitle' })
                : formatMessage({ id: 'post.detailsTitle' })}
            </Typography>
            {headerActions}
          </div>
          <div className={classes.subtitleBlock}>
            <Typography variant='caption' color='secondary'>{getUserName(currentPost.userId)}</Typography>
            <Typography variant='caption' color='secondary'>{currentPost.createdAt || '-'}</Typography>
          </div>
        <Card>
          <div className={classes.titleBlock}>
            <CardTitle>{currentPost.title}</CardTitle>
            <CardContent>
                <Typography><StarIcon color="#ffd050" size={18} />  {currentPost.rating || '-'}</Typography>
            </CardContent>
          </div>
          <CardContent>
            <div className={classes.contentFields}>
              <Typography>{formatMessage({ id: 'country' })} {currentPost.country || '-'}</Typography>
              <Typography>{formatMessage({ id: 'categories' })} {(currentPost.categories || []).join(', ') || '-'}</Typography>
            </div>
          </CardContent>
        </Card>
        <Card className={classes.content}>
          <CardContent>
              <Typography>{currentPost.content || '-'}</Typography>
          </CardContent>
        </Card>
        </div>
      )}

      {/* Edit / Create */}
      {(mode === 'edit' || mode === 'create') && (
        <Card>
          <CardTitle>
              {mode === 'create'
                ? formatMessage({ id: 'post.create' })
                : formatMessage({ id: 'post.edit' })}
          </CardTitle>
          <CardContent>
            <div className={classes.fields}>
              <TextField
                label={formatMessage({ id: 'title' })}
                value={edited.title}
                onChange={({ target }) => setEdited({ ...edited, title: target.value })}
                isError={!!errors.title}
                helperText={errors.title}
                required
              />
              <TextField
                label={formatMessage({ id: 'content' })}
                value={edited.content}
                onChange={({ target }) => setEdited({ ...edited, content: target.value })}
                multiline
              />
              <TextField
                label={formatMessage({ id: 'country' })}
                value={edited.country}
                onChange={({ target }) => setEdited({ ...edited, country: target.value })}
                isError={!!errors.country}
                helperText={errors.country}
                required
              />
              {/* <TextField
                label={formatMessage({ id: 'categories' })}
                value={edited.categories.join(', ')}
                onChange={({ target }) =>
                  setEdited({ ...edited, categories: target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                isError={!!errors.categories}
                helperText={errors.categories}
              /> */}
              <CategoriesSelect 
              allCategories={allCategories}
              edited={edited}
              setEdited={setEdited}
              errors={errors}
              formatMessage={formatMessage}
              />
            </div>

            <div className={classes.actions}>
              <Button
                variant="primary"
                isLoading={isSaving}
                onClick={onSave}
              >
                <Typography color="inherit">
                  {mode === 'create'
                    ? formatMessage({ id: 'create' })
                    : formatMessage({ id: 'save' })}
                </Typography>
              </Button>
              <Button variant="primary" onClick={onCancel}>
                {formatMessage({ id: 'cancel' })}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {mode === 'view' && isFetchingCurrent && (
        <Typography variant='primary'>{formatMessage({ id: 'loading' })}</Typography>
      )}
      {mode === 'view' && !isFetchingCurrent && !currentPost && params.id && (
        <Typography variant='primary' className={classes.errorText}>
          {formatMessage({ id: 'notFound' })}
        </Typography>
      )}
    </div>
  );
}

export default Secret;
