'use client'

import React from 'react'
import { Box, Card, IconButton, Typography, Grid, Menu, MenuItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import colors from 'styles/theme/colors';
import { CustomAccordion, CustomAccordionDetails, CustomAccordionSummary } from 'Components/CommonLayouts/CommonAccordion';
import SubAccordionOfHistoryCard from './SubAccordionOfHistoryCard';
import DescriptionIcon from '@mui/icons-material/Description';
import PriceFormatter from 'Components/CommonLayouts/PriceFormatter';
import { formatPoints, formatDate, formatAmount, shortPriceFormatter } from 'utills/CommonFunction';
import { transactionType } from 'utills/Constants';

function HistoryCard({ history }) {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const handleExpandedStateChange = () => {
        setIsExpanded(!isExpanded);
    };

    const [anchorElMenuState, setAnchorElMenuState] = React.useState(null);
    const openMenu = Boolean(anchorElMenuState);
    const handleOpenMenu = (event) => {
        setAnchorElMenuState(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorElMenuState(null);
    };

    const calculateConsumedPoints = (childTransaction = []) => {
        let totalConsumedPoints = 0;
        for (let i = 0; i < childTransaction.length; i++) {
            const { consumedPoints = 0 } = childTransaction[i];
            totalConsumedPoints = totalConsumedPoints + Number(consumedPoints);
        }

        return totalConsumedPoints;
    }

    const calculateItems = (childTransaction = [], type) => {
        let data = []
        for (let i = 0; i < childTransaction.length; i++) {
            const history = childTransaction[i];
            if (type === history?.transactionType) {
                data.push(history)
            }
        }

        return data;
    }


    return (
        <CustomAccordion expanded={isExpanded} >
            <CustomAccordionSummary handleIconClick={handleExpandedStateChange} sx={{ pt: 2, pb: 2}}>
                <Box sx={{ flex: 1, ml: 2 }} onClick={handleExpandedStateChange}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant='h5' sx={{ flex: 1 }}>
                            {formatDate(history?.createdAt)} &#183; Paid {formatAmount(history?.paymentPaid)}
                            {/* + 18% tax */}
                        </Typography>
                        {/* <Typography variant='h6' sx={{ color: colors.BLUE }}>Balance: 32,000</Typography> */}
                    </Box>
                    <Typography variant='subtitle2'>
                        New points: {history?.newPoints} | Opening: {formatPoints(history?.openingPoints)} | Consumed: {formatPoints(calculateConsumedPoints(history?.childTransaction))}
                    </Typography>
                </Box>
                <Box>
                {/* <Tooltip title="More">
                    <IconButton onClick={handleOpenMenu}>
                        <MoreVertIcon />
                    </IconButton>
                    </Tooltip> */}
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorElMenuState}
                        open={openMenu}
                        onClose={handleCloseMenu}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleCloseMenu}>
                            <ListItemIcon>
                                <DescriptionIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Request for Invoice</ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
            </CustomAccordionSummary>
            <CustomAccordionDetails>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', px: 2, mb: 2 }}>
                            <Typography variant='h5' sx={{ flex: 1 }}>Credit points consumed</Typography>
                            <Typography variant='h5'>{formatPoints(calculateConsumedPoints(history?.childTransaction))} Points</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <SubAccordionOfHistoryCard title="Activated links" data={calculateItems(history?.childTransaction, transactionType.ACTIVATE_URL)} type='Activation' />
                    </Grid>
                    <Grid item xs={12}>
                        <SubAccordionOfHistoryCard title="Suggested leads" data={calculateItems(history?.childTransaction, transactionType.SUGGESTED_LEAD_BUY)} type='Leads' />
                    </Grid>
                    <Grid item xs={12}>
                        <SubAccordionOfHistoryCard title="Consultant subscription" data={calculateItems(history?.childTransaction, transactionType.CONSULTANT_SUBSCRIPTION)} type='Consultant subscriptions' />
                    </Grid>
                    <Grid item xs={12}>
                        <SubAccordionOfHistoryCard title="Notes panel" data={calculateItems(history?.childTransaction, transactionType.NOTE_SUBSCRIPTION)} type='Notes subscription' />
                    </Grid>
                </Grid>
            </CustomAccordionDetails>
        </CustomAccordion>
    )
}

export default HistoryCard