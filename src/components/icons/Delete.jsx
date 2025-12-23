import React from 'react';
import useTheme from 'misc/hooks/useTheme';

import SvgIcon from '../SvgIcon';

const Delete = ({
  color = 'error',
  size = 30,
}) => {
  const { theme } = useTheme();
  const actualColor = theme.icon.color[color] || color;

  return (
    <SvgIcon
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
      viewBox="0 0 24 24"
    >
      <path
        fill={actualColor}
        d="M6 19c0 1.1.9 2 2 2h8c1.1 
           0 2-.9 2-2V7H6v12zm3.46-9.12l1.41-1.41L12 
           10.59l1.12-1.12 1.41 1.41L13.41 12l1.12 
           1.12-1.41 1.41L12 13.41l-1.12 1.12-1.41-1.41L10.59 
           12l-1.13-1.12zM15.5 4l-1-1h-5l-1 
           1H5v2h14V4h-3.5z"
      />
    </SvgIcon>
  );
};

export default Delete;