'use client'

import React from 'react'
import { Box, Card, IconButton, Typography, Grid } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import colors from 'styles/theme/colors';
import { CustomAccordion, CustomAccordionDetails, CustomAccordionSummary } from 'Components/CommonLayouts/CommonAccordion';
import SubAccordionOfHistoryCard from './SubAccordionOfHistoryCard';

function HistoryCard() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = () => {
        setExpanded(!expanded);
    };

    return (
        <CustomAccordion expanded={expanded} onChange={handleChange}>
            <CustomAccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Box sx={{ flex: 1, ml: 2 }}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant='h6' sx={{ flex: 1 }}>Paid rs 23,000 + 18% tax</Typography>
                        <Typography variant='h6' sx={{ color: colors.BLUE }}>Balance: 32,000</Typography>
                    </Box>
                    <Typography variant='h6'>
                        New points: 25,000 | Opening: 8,000 | Consumed: 12,000
                    </Typography>
                </Box>
                <Box>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </Box>
            </CustomAccordionSummary>
            <CustomAccordionDetails>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', px: 2, mb: 2 }}>
                            <Typography variant='subtitle2' sx={{ color: colors.DISABLED, flex: 1 }}>Points Consumed</Typography>
                            <Typography variant='h6'>12,000</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <SubAccordionOfHistoryCard title="Activated links" value="(1 link) 5,000" />
                    </Grid>
                    <Grid item xs={12}>
                        <SubAccordionOfHistoryCard title="Activated leads" value="(25 contacts) 7,000" />
                    </Grid>
                    <Grid item xs={12}>
                        <SubAccordionOfHistoryCard title="Notes panel" value="(3 months) 25,000" />
                    </Grid>
                </Grid>
            </CustomAccordionDetails>
        </CustomAccordion>
    )
}

export default HistoryCard