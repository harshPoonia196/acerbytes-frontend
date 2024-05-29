import { Avatar, BottomNavigation, BottomNavigationAction, Box, Button, Chip, Container, Fab, IconButton, Menu, MenuItem, Rating, Typography } from '@mui/material'
import AddLinkIcon from '@mui/icons-material/AddLink';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import React from 'react';
import { boxShadowTop } from 'utills/Constants';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneIcon from '@mui/icons-material/Done';

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
            <Box sx={{
                width: '100%', position: 'fixed',
                bottom: 0,
                left: 0,
                zIndex: 1000,
            }}>
                <Container maxWidth='md' sx={{ px: { xs: '0 !important', evmd: '1rem !important' }, py: "0 !important" }}>
                    <Box sx={{
                        display: 'flex', background: 'ghostwhite',
                        boxShadow: boxShadowTop, p: 2
                    }}>
                        <Box sx={{ display: 'flex', flex: 1 }}>
                            <Avatar src="" sx={{ height: { xs: 24, evmd: 40 }, width: { xs: 24, evmd: 40 }, fontSize: { xs: '0.75rem', evmd: '1rem' } }}>FD</Avatar>
                            <Box sx={{ ml: 1, flex: 1 }}>
                                <Box sx={{ display: { xs: 'none', evmd: 'block' } }}>
                                    <Typography variant='h6'>
                                        first last | Project name | Noida
                                    </Typography>
                                    <Box>
                                        <Typography variant='h6'>
                                            +91 9625555559
                                        </Typography>
                                        <Typography variant='h6' sx={{ mt: 1 }}>
                                            4.5 | 12 ratings
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: { xs: 'block', evmd: 'none' } }}>
                                    <Typography variant='subtitle2'>
                                        first last | Project name | Noida
                                    </Typography>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant='subtitle2'>
                                                +91 9625555559
                                            </Typography>
                                            <Typography variant='subtitle2' sx={{ mt: 1 }}>
                                                4.5 | 12 ratings
                                            </Typography>
                                        </Box>
                                        <Box sx={{ textAlign: 'end', alignSelf: 'end', display: { xs: "block", evmd: 'none' } }}>
                                            <Button variant='contained' size="small" startIcon={<DoneIcon />} disabled sx={{}}>
                                                Activated
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ textAlign: 'end', alignSelf: 'end', display: { xs: "none", evmd: 'block' } }}>
                                <Button variant='contained' startIcon={<DoneIcon />} disabled sx={{ mb: 1 }}>
                                    Activated
                                </Button>
                                {/* <Button variant='contained' startIcon={<Phone />} sx={{ mb: 1 }}>
                Call First
              </Button>
              <Button startIcon={<GoogleIcon />} variant='contained' sx={{ mb: 1 }}>
                Log in
              </Button> */}
                                <Typography variant="p">26 days remaining</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ alignSelf: 'end' }}>
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
                    </Box>
                </Container>
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