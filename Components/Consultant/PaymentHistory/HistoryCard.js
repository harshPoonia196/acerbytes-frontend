'use client'

import React from 'react'
import { Box, Card, IconButton, Typography, Grid, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import colors from 'styles/theme/colors';
import { CustomAccordion, CustomAccordionDetails, CustomAccordionSummary } from 'Components/CommonLayouts/CommonAccordion';
import SubAccordionOfHistoryCard from './SubAccordionOfHistoryCard';
import DescriptionIcon from '@mui/icons-material/Description';
import PriceFormatter from 'Components/CommonLayouts/PriceFormatter';
import { formatPoints, formatDate, formatAmount } from 'utills/CommonFunction';

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


    return (
        <CustomAccordion expanded={isExpanded} >
            <CustomAccordionSummary handleIconClick={handleExpandedStateChange}>
                <Box sx={{ flex: 1, ml: 2 }} onClick={handleExpandedStateChange}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant='h5' sx={{ flex: 1 }}>
                            {formatDate(history?.createdAt)} &#183; Paid {formatAmount(history?.paymentPaid)}
                            {/* + 18% tax */}
                        </Typography>
                        {/* <Typography variant='h6' sx={{ color: colors.BLUE }}>Balance: 32,000</Typography> */}
                    </Box>
                    <Typography variant='subtitle2'>
                        New points: {formatPoints(history?.newPoints)} | Opening: {formatPoints(history?.openingPoints)} | Consumed: {formatPoints(history?.consumedPoints)}
                    </Typography>
                </Box>
                <Box>
                    <IconButton onClick={handleOpenMenu}>
                        <MoreVertIcon />
                    </IconButton>
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
                            <Typography variant='subtitle2' sx={{ flex: 1 }}>Credit points consumed</Typography>
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