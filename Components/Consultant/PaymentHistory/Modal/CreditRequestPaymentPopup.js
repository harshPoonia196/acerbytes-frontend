import { Box, Button, Card, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useRouter } from 'next/navigation';
import { listOfPages } from 'Components/NavBar/Links';

function CreditRequestPaymentPopup({ open, handleClose }) {
    const router = useRouter()

    return (
        <Dialog sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }} open={open} onClose={handleClose}>
            <DialogTitle onClose={handleClose}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Credits (points) request generated
                </Typography>
                <Typography variant="body1">
                    Payment pending
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h2" sx={{ fontWeight: 600 }}>
                            <span style={{ fontSize: '1rem' }}>Rs&nbsp;</span>34,500
                        </Typography>
                        <Tooltip title='Copy'>
                            <IconButton size='small'>
                                <ContentCopyIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Typography variant="h3">
                        <span style={{ fontSize: '1rem' }}>for</span>&nbsp;45,500&nbsp;<span style={{ fontSize: '1rem' }}>credits (points)</span>
                    </Typography>
                    <Typography variant="h6">is pending for payment for request number</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h3" sx={{ mb: 2, mt: 2 }}>AB56TRT</Typography>
                        <Tooltip title='Copy'>
                            <IconButton size='small'>
                                <ContentCopyIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Button variant="contained" onClick={() => { router.push(listOfPages.consultantMakePayment) }}>
                        Pay Rs 34,500
                    </Button>
                </Box>
                <Divider sx={{ my: 2, borderColor: 'gainsboro' }} />
                <ul>
                    <li style={{ marginLeft: '16px' }}>
                        <Typography variant='body2'>
                            Please share credits (points) request number with AreaBytes representative (if any)
                        </Typography>
                    </li>
                    <li style={{ marginLeft: '16px' }}>
                        <Typography variant='body2'>
                            Send screenshot to <Chip onClick={() => { }} icon={<WhatsAppIcon fontSize="small" />}
                                label="+9198799877" size="small" sx={{ fontSize: '0.875rem' }} /> after making the payment
                        </Typography>
                    </li>
                </ul>
            </DialogContent>
        </Dialog>
    )
}

export default CreditRequestPaymentPopup