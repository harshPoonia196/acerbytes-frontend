import React from 'react';
import LoadingButton from '@mui/material/Button';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SaveIcon from '@mui/icons-material/Save';

const CustomButton = ({ loading,loadingText,ButtonText ,disabled,  onClick,icon,variant, ...props }) => (
  <>
    {
    loading ?
     
	<LoadingButton
  loading={loading}
  loadingPosition="start"
  startIcon={icon && icon}
  variant={variant ? variant : 'contained'}
>
  loading...
</LoadingButton>
     :
     
<Button 
  startIcon={icon}
  variant="contained"
  onClick={onClick}
  disabled={disabled}>
    {ButtonText}</Button>
    
  }
  </>
);

export default CustomButton;