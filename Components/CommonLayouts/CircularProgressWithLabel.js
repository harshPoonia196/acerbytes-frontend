import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getColorForProgressBar } from 'utills/CommonFunction';
import { Tooltip } from '@mui/material';

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" thickness={4} size={props.islarge ? 50 : 40} {...props} />
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
                {props.tooltipText ? <Tooltip title={props.tooltipText}>
                    <Typography variant={props.islarge ? 'h3' : 'body1'} sx={{ fontWeight: 'bold' }}>
                        {`${Math.round(props.value)}`}
                    </Typography>
                </Tooltip> : <Typography variant={props.islarge ? 'h3' : 'body1'} sx={{ fontWeight: 'bold' }}>
                    {`${Math.round(props.value)}`}
                </Typography>}
            </Box>
        </Box >
    );
}

export default function CircularWithValueLabel({ progress, tooltipText, islarge }) {

    return <CircularProgressWithLabel value={progress} islarge={islarge} color={getColorForProgressBar(progress)} tooltipText={tooltipText} />
}