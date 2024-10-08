import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import InputField from 'Components/CommonLayouts/InputField';
import CustomButton from 'Components/CommonLayouts/Loading/LoadingButton';
import React from 'react'
import { formatPoints } from 'utills/CommonFunction';

function AddCreditPopup({ open, handleClose }) {
    return (
        <Dialog sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }} open={open} onClose={handleClose}>
            <DialogTitle onClose={handleClose}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Add credit for <span style={{ color: "gray" }}>Aman Sharma</span>
                </Typography>
                <Typography variant="body1">
                    Credit Points are required to buy services on AcreBytes
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            Current credit : {formatPoints(1000)}
                        </Typography>
                    </Grid>
                    <InputField label="Credits to add" />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <CustomButton
                        // startIcon={<GoogleIcon />}
                        variant="outlined"
                        sx={{ mr: 2 }}
                        onClick={handleClose}

                        ButtonText={"Close"}
                    />
                    <CustomButton
                        // startIcon={<DoneIcon />}
                        variant="contained"
                        onClick={
                            handleClose
                        }
                        ButtonText={"Submit"}
                    />
                </Box>
            </DialogActions>
        </Dialog >
    )
}

export default AddCreditPopup