'use client'

import React from 'react'
import { Box, Card, IconButton, Typography, Grid, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import colors from 'styles/theme/colors';
import { CustomAccordion, CustomAccordionDetails, CustomAccordionSummary } from 'Components/CommonLayouts/CommonAccordion';
import SubAccordionOfHistoryCard from './SubAccordionOfHistoryCard';
import DescriptionIcon from '@mui/icons-material/Description';
import PriceFormatter from 'Components/CommonLayouts/PriceFormatter';

function HistoryCard() {
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
            <CustomAccordionSummary aria-controls="panel1d-content" id="panel1d-header" onIconClick={handleExpandedStateChange}>
                <Box sx={{ flex: 1, ml: 2 }} onClick={handleExpandedStateChange}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant='h6' sx={{ flex: 1 }}>
                            23rd April, 2023 &#183; Paid <PriceFormatter amount='25000' display='text' currency='inr' /> + 18% tax
                        </Typography>
                        <Typography variant='h6' sx={{ color: colors.BLUE }}>Balance: 32,000</Typography>
                    </Box>
                    <Typography variant='h6'>
                        New points: 25,000 | Opening: 8,000 | Consumed: 12,000
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