import React from 'react';
import LoadingButton from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SaveIcon from '@mui/icons-material/Save';

const CustomButton = ({ loading, onClick, children, ...props }) => (
  <>
    {loading ? (
      <LoadingButton
        // onClick={!loading}
        disabled={loading}
        {...props}
      >
        {loading && <CircularProgress size={15} color="inherit" sx={{ m: '0 0.5rem' }} />}
        {props.loadingPosition === 'start' && !loading && props.startIcon}
        <span>  Loading</span>
        {props.loadingPosition !== 'start' && !loading && props.startIcon}
      </LoadingButton>
    ) : (
      <LoadingButton
        onClick={!loading ? onClick : onClick()}
        disabled={loading}
        {...props}
      >
        {/* {loading && <CircularProgress size={24} color="inherit" />} */}
        {/* {props.loadingPosition === 'start' && !loading && props.startIcon} */}
        <span>{children}</span>
        {/* {props.loadingPosition !== 'start' && !loading && props.startIcon} */}
      </LoadingButton>
    )}
  </>
);

export default CustomButton;