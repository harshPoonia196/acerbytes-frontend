import { Box, Button, Card, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from '@mui/material'
import React, { useState } from 'react'
import CreditRequestPaymentPopup from './CreditRequestPaymentPopup'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

function ConsultantAddCreditPopup({ open, handleClose }) {
    const [openCreditRequestPaymentPopup, setCreditRequestPaymentPopup] = useState(false)

    const handleOpenCreditRequestPaymentPopup = () => {
        setCreditRequestPaymentPopup(true)
    }

    const handleCloseCreditRequestPaymentPopup = () => {
        setCreditRequestPaymentPopup(false)
    }

    return (
        <>
            <CreditRequestPaymentPopup open={openCreditRequestPaymentPopup} handleClose={handleCloseCreditRequestPaymentPopup} />
            <Dialog sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }} open={open} onClose={handleClose}>
                <DialogTitle onClose={handleClose}>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        Request for credits (points)
                    </Typography>
                    <Typography variant="body1">
                        Potential to buy leads from the panel
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Card sx={{ display: 'flex', p: 1 }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant='body1' >25,000 points</Typography>
                            <Typography variant='subtitle2'><span style={{ fontWeight: 600 }}>Rs 25,000</span> (0% discount)</Typography>
                        </Box>
                        <Box sx={{ ml: 2 }}>
                            <Button variant='contained' size='small' onClick={handleOpenCreditRequestPaymentPopup}>Get 25,000 points</Button>
                        </Box>
                    </Card>
                    <Divider />
                    <Card sx={{ display: 'flex', p: 1 }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant='body1' >50,000 points</Typography>
                            <Typography variant='subtitle2'><span style={{ fontWeight: 600 }}>Rs 40,000</span> (20% discount)</Typography>
                        </Box>
                        <Box sx={{ ml: 2 }}>
                            <Button variant='contained' size='small' onClick={handleOpenCreditRequestPaymentPopup}>Get 50,000 points</Button>
                        </Box>
                    </Card>
                    <Divider />
                    <Card sx={{ display: 'flex', p: 1 }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant='body1' >1,00,000 points</Typography>
                            <Typography variant='subtitle2'><span style={{ fontWeight: 600 }}>Rs 70,000</span> (30% discount)</Typography>
                        </Box>
                        <Box sx={{ ml: 2 }}>
                            <Button variant='contained' size='small' onClick={handleOpenCreditRequestPaymentPopup}>Get 1,00,000 points</Button>
                        </Box>
                    </Card>
                    <Divider sx={{ my: 2, borderColor: 'gainsboro' }} />
                    <Typography variant='body1'>
                        Post requesting you will receive a service request number that can be shared with AreaBytes representative (if any) and send screenshot to
                        <Chip onClick={() => { }} icon={<WhatsAppIcon fontSize="small" />}
                            label="+9198799877" size="small" sx={{ fontSize: '0.875rem' }} />
                    </Typography>
                    <Divider sx={{ my: 2, borderColor: 'gainsboro' }} />
                    <Typography variant='body2'>
                        Property consultant can use above credits to activate below services
                    </Typography>
                    <ul>
                        <li style={{ marginLeft: '16px' }}>
                            <Typography variant='body2'>
                                Activate unique link for a property
                            </Typography>
                        </li>
                        <li style={{ marginLeft: '16px' }}>
                            <Typography variant='body2'>
                                View leads contact
                            </Typography>
                        </li>
                        <li style={{ marginLeft: '16px' }}>
                            <Typography variant='body2'>
                                Managing leads panel with notes
                            </Typography>
                        </li>
                    </ul>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ConsultantAddCreditPopup