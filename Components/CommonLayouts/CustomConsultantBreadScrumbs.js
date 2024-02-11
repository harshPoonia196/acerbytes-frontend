import * as React from 'react';
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
                Access the links for <span style={{ color: "gray" }}>Consultant</span>
            </Typography>
        </DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => {
                        router.push(listOfPages.consultantMakePayment)
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
                                    <Typography variant="h5">Make payment</Typography>
                                    <Typography variant="body1">Payment</Typography>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => {
                        router.push(listOfPages.consultantMyLeads)
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
                                    <Typography variant="h5">My leads</Typography>
                                    <Typography variant="body1">List of all leads</Typography>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => {
                        router.push(listOfPages.consultantLinks)
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
                                    <Typography variant="h5">My links</Typography>
                                    <Typography variant="body1">List of all links</Typography>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => {
                        router.push(listOfPages.consultantMyNotes)
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
                                    <Typography variant="h5">My notes</Typography>
                                    <Typography variant="body1">List of all notes</Typography>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => {
                        router.push(listOfPages.consultantPaymentHistory)
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
                                    <Typography variant="h5">Payment history</Typography>
                                    <Typography variant="body1">List of all past payment</Typography>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => {
                        router.push(listOfPages.consultantProfile)
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
                                    <Typography variant="h5">Consultant profile</Typography>
                                    <Typography variant="body1">Modify profile</Typography>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </DialogContent>
    </Dialog>
)

export default function CustomConsultantBreadScrumbs({ text }) {

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
            Consultant
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
            boxShadow:boxShadowTop
          }}
        >
  <Box sx={{ backgroundColor: "white", borderBottom: "1px solid whitesmoke" }}>
            <Container
                maxWidth="lg"
            >
                <Stack spacing={2}>
                    <PopupForLinks router={router} open={openAdminLinkPopup} handleClose={handleCloseAdminLinkPopup} />
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        {breadcrumbs}
                    </Breadcrumbs>
                </Stack>
            </Container>
        </Box>
        </Box>
      
    );
}
