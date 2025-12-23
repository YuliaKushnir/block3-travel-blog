import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createUseStyles } from 'react-jss';
import useTheme from 'misc/hooks/useTheme';
import { clearNotification } from 'app/reducers/notification';

const getClasses = createUseStyles((theme) => ({
  notification: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    padding: '20px',
    borderRadius: 4,
    zIndex: 9999,
  },
  error: {
    background: theme.colors.background.error,
    color: theme.typography.color.error,
  },
  success: {
    background: theme.colors.background.success,
    color: theme.typography.color.success,
  },
}));

function Notification() {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const classes = getClasses({ theme });
  const { message, type } = useSelector((state) => state.notifications);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => dispatch(clearNotification()), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null;

  return (
    <div
      className={`${classes.notification} ${
        type === 'error' ? classes.error : classes.success
      }`}
    >
      {message}
    </div>
  );
}

export default Notification;