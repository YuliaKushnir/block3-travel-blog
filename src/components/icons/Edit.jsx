import React from 'react';
import useTheme from 'misc/hooks/useTheme';

import SvgIcon from '../SvgIcon';

const Edit = ({
  color = 'primary',
  size = 32,
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
        d="M3 17.25V21h3.75L17.81 9.94
           l-3.75-3.75L3 17.25zm2.92 2.92H5v-1.17l9.06-9.06
           1.17 1.17-9.06 9.06zM20.71 7.04a1.003 1.003 0 0 0
           0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83
           1.83 3.75 3.75 1.84-1.82z"
      />
    </SvgIcon>
  );
};

export default Edit;