import React from 'react';
import SvgIcon from '../SvgIcon';

const StarIcon = ({ color = '#ffd050', size = 20 }) => {
  return (
    <SvgIcon
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
      viewBox="0 0 24 24"
    >
      <path
        d="M12 17.27L18.18 21l-1.64-7.03
           L22 9.24l-7.19-.61L12 2 9.19 8.63
           2 9.24l5.46 4.73L5.82 21z"
        fill={color}
      />
    </SvgIcon>
  );
};

export default StarIcon;