import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import InputField from 'Components/CommonLayouts/InputField';
import SelectTextFields from 'Components/CommonLayouts/SelectTextFields';
import React from 'react'

function UpdateLeadStatus({ open, handleClose }) {
    return (
        <Dialog sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }} open={open} onClose={handleClose}>
            <DialogTitle onClose={handleClose}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Update leads
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            Current Update(Completed)
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <SelectTextFields label='Status' />
                    </Grid>
                    <Grid item xs={6}>
                        <SelectTextFields label='Status' />
                    </Grid>
                    <InputField variant='outlined' multiline rows={2} label='Comment' />
                    <Grid item xs={12}>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            Next Update(Follow up / plan)
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <SelectTextFields label='Status' />
                    </Grid>
                    <Grid item xs={6}>
                        <SelectTextFields label='Status' />
                    </Grid>
                    <InputField variant='outlined' multiline rows={2} label='Comment' />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Button
                        // startIcon={<GoogleIcon />}
                        variant="outlined"
                        sx={{ mr: 2 }}
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                    <Button
                        // startIcon={<DoneIcon />}
                        variant="contained"
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </DialogActions>
        </Dialog >
    )
}

export default UpdateLeadStatus