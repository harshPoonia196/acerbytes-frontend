import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

const PopupForLinks = ({ open, handleClose }) => (
    <Dialog sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }} open={open} onClose={handleClose}>
        <DialogTitle>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Access the links for <span style={{ color: "gray" }}>Admin</span>
            </Typography>
        </DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>

            </Grid>
        </DialogContent>
    </Dialog>
)

export default function CustomBreadScrum({ text }) {

    const [openAdminLinkPopup, setOpenAdminLinkPopup] = React.useState()

    const handleOpenAdminLinkPopup = () => {
        setOpenAdminLinkPopup(true)
    }

    const handleCloseAdminLinkPopup = () => {
        setOpenAdminLinkPopup(false)
    }

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" sx={{ textTransform: 'uppercase' }}>
            Home
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            sx={{ cursor: 'pointer', textTransform: 'uppercase' }}
            onClick={handleOpenAdminLinkPopup}
        >
            Admin
        </Link>,
        <Typography key="3" color="text.primary" sx={{ textTransform: 'uppercase' }}>
            {text}
        </Typography>,
    ];

    return (
        <Stack spacing={2}>
            <PopupForLinks open={openAdminLinkPopup} handleClose={handleCloseAdminLinkPopup} />
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>
    );
}
