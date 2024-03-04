import React from 'react';
import LoadingButton from '@mui/material/Button';
import Button from '@mui/material/Button';

const CustomButton = ({ loading, loadingText, ButtonText, disabled, onClick, startIcon, ...props }) => (
  <>
    {
      loading ?
        <LoadingButton
          loading={loading}
          loadingPosition="start"
          startIcon={startIcon && startIcon}
          {...props}
        >
          {loadingText && loading ? loadingText : ButtonText}
        </LoadingButton>
        :
        <Button
          startIcon={startIcon && startIcon}
          onClick={onClick}
          disabled={disabled}
          {...props}>
          {ButtonText}
        </Button>
    }
  </>
);

export default CustomButton;