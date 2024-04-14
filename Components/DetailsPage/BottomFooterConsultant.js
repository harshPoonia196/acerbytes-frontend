import { BottomNavigation, BottomNavigationAction, Box, Fab, Menu, MenuItem } from '@mui/material'
import AddLinkIcon from '@mui/icons-material/AddLink';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import React from 'react';

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
                    display: { xs: "block", evmd: "none" },
                }}
            >
                <BottomNavigation
                    showLabels
                    sx={{
                        justifyContent: 'space-evenly',
                        '& .MuiBottomNavigationAction-root': { padding: 1, width: '100%' },
                        '& .MuiBottomNavigationAction-label': {
                            fontSize: { xs: '0.6rem !important', sm: '0.8rem !important' },
                        },
                        '& .Mui-selected': {
                            fontSize: { xs: '0.6rem !important', sm: '0.8rem !important' },
                        },
                        '& .MuiSvgIcon-root': {
                            fontSize: '1.25rem',
                        },
                    }}
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction sx={{ flex: '0 1 auto', minWidth: 0 }}
                        label="Activate link" icon={<AddLinkIcon />} />
                    <BottomNavigationAction sx={{ flex: '0 1 auto', minWidth: 0 }}
                        label="Enquiries" icon={<FormatListBulletedIcon />} />
                    <BottomNavigationAction sx={{ flex: '0 1 auto', minWidth: 0 }}
                        label="More" icon={<MoreHorizIcon />} onClick={handleClick} />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </BottomNavigation>
            </Box>
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