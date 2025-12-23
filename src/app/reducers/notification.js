const initialState = {
  message: null,
  type: null,
};

export default function notifications(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        message: action.payload.message,
        type: action.payload.type,
      };
    case 'CLEAR_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
}

export const showNotification = (message, type = 'info') => ({
  type: 'SHOW_NOTIFICATION',
  payload: { message, type },
});

export const clearNotification = () => ({ type: 'CLEAR_NOTIFICATION' });