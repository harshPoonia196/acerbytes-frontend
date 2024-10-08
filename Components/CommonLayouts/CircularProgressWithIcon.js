import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getColorForProgressBar } from 'utills/CommonFunction';

function CircularProgressWithIcon(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" thickness={2} size={40} {...props} />
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
                {props.icon}
            </Box>
        </Box>
    );
}

export default function CircularWithValueIcon({ icon, score, outOf }) {

    let resultedValue = (parseInt(score) / outOf) * 100

    return <CircularProgressWithIcon icon={icon} value={resultedValue} color={getColorForProgressBar(resultedValue)} />;
}