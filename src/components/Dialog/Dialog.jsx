import React from 'react';
import DialogMui from '@mui/material/Dialog';

const maxWidthVariants = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
};

const Dialog = ({
  children,
  fullScreen = false,
  onClose,
  open,
  maxWidth = maxWidthVariants.sm,
}) => {
  return (
    <DialogMui
      fullScreen={fullScreen}
      fullWidth
      onClose={onClose}
      open={open}
      maxWidth={maxWidth}
      sx={{
        '& .MuiDialog-paper': {
          height: '30vh',
          maxHeight: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
        },
      }}

    >
      {children}
    </DialogMui>
  );
};

export default Dialog;
