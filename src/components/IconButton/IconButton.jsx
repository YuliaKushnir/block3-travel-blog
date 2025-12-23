import React from 'react';
import IconButtonMUI from '@mui/material/IconButton';
import useTheme from 'misc/hooks/useTheme';

const colorVariants = {
  header: 'header',
  primary: 'primary',
  secondary: 'secondary',
};

const IconButton = ({
  children,
  colorVariant = colorVariants.secondary,
  disabled = false,
  disableHoverSpace = false,
  onClick,
  onPress,
  onRelease,
  className,
  sx: sxOverride,
}) => {
  const { theme } = useTheme();
  return (
    <IconButtonMUI
      className={className}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      sx={{
        '&.MuiIconButton-root': {
          '&.Mui-disabled': {
            background: theme.button.color[colorVariant].backgroundDisabled,
          },
          '&:hover': {
            background: theme.button.color[colorVariant].backgroundHovered,
          },
          background: theme.button.color[colorVariant].background,
          color: theme.button.color[colorVariant].text.secondary,
          padding: `${theme.spacing(1)}px`,
          opacity: disabled && '0.4',
        },
        ...sxOverride,
      }}
    >
      {children}
    </IconButtonMUI>
  );
};

export default IconButton;
