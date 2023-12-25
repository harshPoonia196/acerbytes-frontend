import { Box, Typography } from '@mui/material';
import { CustomAccordion, CustomAccordionDetails, CustomAccordionSummary } from 'Components/CommonLayouts/CommonAccordion'
import React from 'react'

function SubAccordionOfHistoryCard({ title, value }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = () => {
        setExpanded(!expanded);
    };

    return (
        <CustomAccordion expanded={expanded} onChange={handleChange}>
            <CustomAccordionSummary>
                <Box sx={{ flex: 1, ml: 1 }}>
                    <Typography variant='subtitle2'>{title}</Typography>
                </Box>
                <Typography variant='subtitle2'>
                    {value}
                </Typography>
            </CustomAccordionSummary>
            <CustomAccordionDetails>
                <Box sx={{ display: 'flex' }}>
                    <Typography variant='subtitle2' sx={{ flex: 1 }}>Item one</Typography>
                    <Typography variant='h6'>2,500</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Typography variant='subtitle2' sx={{ flex: 1 }}>Item two</Typography>
                    <Typography variant='h6'>2,500</Typography>
                </Box>
            </CustomAccordionDetails>
        </CustomAccordion>
    )
}

export default SubAccordionOfHistoryCard