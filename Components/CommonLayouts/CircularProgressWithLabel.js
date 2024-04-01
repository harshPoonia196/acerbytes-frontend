import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getColorForProgressBar } from 'utills/CommonFunction';

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" thickness={4} size={40} {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {`${Math.round(props.value)}`}
                </Typography>
            </Box>
        </Box>
    );
}

export default function CircularWithValueLabel({ progress }) {

    return <CircularProgressWithLabel value={progress} color={getColorForProgressBar(progress)} />;
}