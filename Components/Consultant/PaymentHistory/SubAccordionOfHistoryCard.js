import { Box, Typography } from '@mui/material';
import { CustomAccordion, CustomAccordionDetails, CustomAccordionSummary } from 'Components/CommonLayouts/CommonAccordion'
import React from 'react'
import { formatPoints, formatDate } from 'utills/CommonFunction';

function SubAccordionOfHistoryCard({ title, data = [], type = '' }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = () => {
        setExpanded(!expanded);
    };

    const calculateConsumedPoints = (childTransaction = []) => {
        let totalConsumedPoints = 0;
        for (let i = 0; i < childTransaction.length; i++) {
            const { consumedPoints = 0 } = childTransaction[i];
            totalConsumedPoints = totalConsumedPoints + Number(consumedPoints);
        }
        return totalConsumedPoints;
    }

    return (
        <CustomAccordion expanded={expanded} onChange={handleChange}>
            <CustomAccordionSummary>
                <Box sx={{ flex: 1, ml: 1 }}>
                    <Typography variant='subtitle2'>{title}</Typography>
                </Box>
                <Typography variant='subtitle2'>
                    {data.length + ' ' + type}, Consumed Points: {formatPoints(calculateConsumedPoints(data))}
                </Typography>
            </CustomAccordionSummary>
            <CustomAccordionDetails>
                {data.map((res) => {
                    const { createdAt, consumedPoints, details } = res;
                    return <Box sx={{ display: 'flex' }}>
                        <Typography variant='subtitle2' sx={{ flex: 1 }}>{`${formatDate(createdAt)} (${details})`}</Typography>
                        {/* <Typography variant='subtitle2' sx={{ flex: 1 }}>{details + ' on ' + formatDate(createdAt)}</Typography> */}
                        <Typography variant='h6'>{formatPoints(consumedPoints)} Points</Typography>
                    </Box>
                })
                }
            </CustomAccordionDetails>
        </CustomAccordion>
    )
}

export default SubAccordionOfHistoryCard