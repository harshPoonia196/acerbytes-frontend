import { Avatar, BottomNavigation, BottomNavigationAction, Box, Chip, Fab, IconButton, Menu, MenuItem, Rating, Typography } from '@mui/material'
import AddLinkIcon from '@mui/icons-material/AddLink';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import React from 'react';
import { boxShadowTop } from 'utills/Constants';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function BottomFooterConsultant() {
    const [value, setValue] = React.useState(0);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    zIndex: 1000,
                    display: { xs: "flex", evmd: "none" },
                    background: 'white',
                    p: 1,
                    boxShadow: boxShadowTop
                }}
            >

                <Box sx={{ display: 'flex', flex: 1 }}>
                    <Box sx={{ display: 'flex', flex: 1 }}>
                        <Avatar src='' sx={{ mr: 1 }}>ff</Avatar>
                        <Box>
                            <Typography variant='h6'>Helllo</Typography>
                            <Rating
                                name="read-only"
                                size="small"
                                value={4}
                                readOnly
                            />
                        </Box>
                    </Box>
                    <Chip
                        // size="small"
                        sx={{
                            backgroundColor: "lightgoldenrodyellow",
                            border: "2px solid gold",
                            alignSelf: 'center',
                            mr: 1,
                        }}
                        label="👆 Activate your ad link"
                    // onClick={() => handleOpenActivateAdsPopup(propertyUrl)}
                    />
                </Box>
                <Box sx={{ alignSelf: 'center' }}>
                    <IconButton onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                </Box>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >

                    <MenuItem onClick={handleClose}>Activate link</MenuItem>
                    <MenuItem onClick={handleClose}>View leads</MenuItem>
                </Menu>
            </Box >
            <Box
                sx={{
                    position: "fixed",
                    right: 16,
                    bottom: 16,
                    display: { xs: "none", evmd: "flex" },
                    gap: 2,
                    flexDirection: "column",
                }}
            >
                <Fab
                    // size="small"
                    variant="extended"
                    sx={{ justifyContent: "flex-start" }}
                >
                    <AddLinkIcon fontSize='small' sx={{ mr: 1 }} />
                    Activate link
                </Fab>
                <Fab
                    // size="small"
                    variant="extended"
                    sx={{ justifyContent: "flex-start" }}
                >
                    <FormatListBulletedIcon fontSize='small' sx={{ mr: 1 }} />
                    Enquiries
                </Fab>
            </Box>
        </>
    )
}

export default BottomFooterConsultant