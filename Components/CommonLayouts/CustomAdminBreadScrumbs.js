'use client'

import * as React from 'react';
import { useEffect, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Box, Card, CardActionArea, Container, Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import { listOfPages } from 'Components/NavBar/Links'
import { boxShadowTop } from 'utills/Constants';
function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

const PopupForLinks = ({ open, handleClose, router }) => (
    <Dialog sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }} open={open} onClose={handleClose}>
        <DialogTitle>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Access the links for <span style={{ color: "gray" }}>Admin</span>
            </Typography>
        </DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => {
                        router.push(listOfPages.adminEnquiries)
                        handleClose()
                    }}>
                        <Card>
                            <CardActionArea
                                sx={{
                                    textTransform: 'inherit !important',
                                    letterSpacing: 'inherit !important',
                                    p: 2,
                                    py: { xs: 1, sm: 2 },
                                    display: 'flex',
                                    justifyContent: 'left !important',
                                    alignItems: 'start',
                                }}
                            >
                                {/* <SupportAgentIcon sx={{ mr: 1 }} /> */}
                                <Box>
                                    <Typography variant="h5">Leads received</Typography>
                                    <Typography variant="body1">Enquiries</Typography>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => {
                        router.push(listOfPages.adminAddProperty)
                        handleClose()
                    }}>
                        <Card>
                            <CardActionArea
                                sx={{
                                    textTransform: 'inherit !important',
                                    letterSpacing: 'inherit !important',
                                    p: 2,
                                    py: { xs: 1, sm: 2 },
                                    display: 'flex',
                                    justifyContent: 'left !important',
                                    alignItems: 'start',
                                }}
                            >
                                {/* <SupportAgentIcon sx={{ mr: 1 }} /> */}
                                <Box>
                                    <Typography variant="h5">Add property</Typography>
                                    <Typography variant="body1">List new property</Typography>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => {
                        router.push(listOfPages.adminPropertyList)
                        handleClose()
                    }}>
                        <Card>
                            <CardActionArea
                                sx={{
                                    textTransform: 'inherit !important',
                                    letterSpacing: 'inherit !important',
                                    p: 2,
                                    py: { xs: 1, sm: 2 },
                                    display: 'flex',
                                    justifyContent: 'left !important',
                                    alignItems: 'start',
                                }}
                            >
                                {/* <SupportAgentIcon sx={{ mr: 1 }} /> */}
                                <Box>
                                    <Typography variant="h5">Property list</Typography>
                                    <Typography variant="body1">List of all property</Typography>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => {
                        router.push(listOfPages.adminManageUser)
                        handleClose()
                    }}>
                        <Card>
                            <CardActionArea
                                sx={{
                                    textTransform: 'inherit !important',
                                    letterSpacing: 'inherit !important',
                                    p: 2,
                                    py: { xs: 1, sm: 2 },
                                    display: 'flex',
                                    justifyContent: 'left !important',
                                    alignItems: 'start',
                                }}
                            >
                                {/* <SupportAgentIcon sx={{ mr: 1 }} /> */}
                                <Box>
                                    <Typography variant="h5">Manage user</Typography>
                                    <Typography variant="body1">User list</Typography>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => {
                        router.push(listOfPages.adminManageConsultant)
                        handleClose()
                    }}>
                        <Card>
                            <CardActionArea
                                sx={{
                                    textTransform: 'inherit !important',
                                    letterSpacing: 'inherit !important',
                                    p: 2,
                                    py: { xs: 1, sm: 2 },
                                    display: 'flex',
                                    justifyContent: 'left !important',
                                    alignItems: 'start',
                                }}
                            >
                                {/* <SupportAgentIcon sx={{ mr: 1 }} /> */}
                                <Box>
                                    <Typography variant="h5">Manage Consultant</Typography>
                                    <Typography variant="body1">Consultant list</Typography>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => {
                        router.push(listOfPages.adminConsultantLinks)
                        handleClose()
                    }}>
                        <Card>
                            <CardActionArea
                                sx={{
                                    textTransform: 'inherit !important',
                                    letterSpacing: 'inherit !important',
                                    p: 2,
                                    py: { xs: 1, sm: 2 },
                                    display: 'flex',
                                    justifyContent: 'left !important',
                                    alignItems: 'start',
                                }}
                            >
                                {/* <SupportAgentIcon sx={{ mr: 1 }} /> */}
                                <Box>
                                    <Typography variant="h5">Consultant Links</Typography>
                                    <Typography variant="body1">Consultant active links</Typography>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </DialogContent>
    </Dialog>
)

export default function CustomAdminBreadScrumbs({ text, maxWidthTill }) {


    const router = useRouter()

    const [openAdminLinkPopup, setOpenAdminLinkPopup] = React.useState(false)

    const handleOpenAdminLinkPopup = () => {
        setOpenAdminLinkPopup(true)
    }

    const handleCloseAdminLinkPopup = () => {
        setOpenAdminLinkPopup(false)
    }

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href={listOfPages.home} sx={{ textTransform: 'uppercase', fontSize: '0.875rem' }}>
            Home
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            sx={{ cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.875rem' }}
            onClick={handleOpenAdminLinkPopup}
        >
            Admin
        </Link>,
        <Typography key="3" color="text.primary" sx={{ textTransform: 'uppercase', fontSize: '0.875rem' }}>
            {text}
        </Typography>,
    ];

    return (
        
            <Box
        sx={{
          zIndex: 100,
          background: "white",
          position: "sticky",
          top: { xs: 48, sm: 64 },
          boxShadow: boxShadowTop
        }}
      >
        <Box>
            <Container
                maxWidth={maxWidthTill ? maxWidthTill : "lg"}
            >
                <Stack spacing={2}>
                    <PopupForLinks router={router} open={openAdminLinkPopup} handleClose={handleCloseAdminLinkPopup} />
                    <Breadcrumbs separator="›" aria-label="breadcrumb"
>
                        {breadcrumbs}
                    </Breadcrumbs>
                </Stack>
            </Container>
        </Box>
      </Box>
       
        
    );
}
