import React from 'react';
import CardMUI from '@mui/material/Card';
import useTheme from 'misc/hooks/useTheme';

const variants = {
  paper: 'paper',
  edit: 'edit',
  error: 'error',
  info: 'info',
  success: 'success',
  warning: 'warning',
  moonlight: 'moonlight',
};

function Card({
  customBackground,
  children,
  disablePaddings = false,
  variant = variants.paper,
  className,
  sx: sxOverride,
  ...rest
}) {
  const { theme } = useTheme();

  const baseSx = {
    background: customBackground || theme.card.color.background[variant],
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: `${theme.spacing(2)}px`,
    padding: disablePaddings ? 0 : `${theme.spacing(2)}px 0px`, // замість 'none' використовуй 0
    transition: 'all 0.2s ease-out',
    width: '100%',
  };

  return (
    <CardMUI
      className={className}          // 🔑 проброс у MUI Card
      sx={{ ...baseSx, ...sxOverride }} // 🔑 можна перевизначати стилі через sx
      {...rest}
    >
      {children}
    </CardMUI>
  );

}

export default Card;
