import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import InputField from 'Components/CommonLayouts/InputField';
import SelectTextFields from 'Components/CommonLayouts/SelectTextFields';
import React, { useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import CustomButton from 'Components/CommonLayouts/Loading/LoadingButton';
import NewSelectTextFieldStructure from 'Components/CommonLayouts/NewSelectTextFieldStructure';

function UpdateLeadStatus({ open, handleClose, isUserSelected }) {
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        setLoading(true);
    
        // Simulate an asynchronous operation (e.g., API call)
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      };
    return (
        <Dialog sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }} open={open} onClose={handleClose}>
            <DialogTitle onClose={handleClose}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Update notes for ABCD
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {!isUserSelected && <NewSelectTextFieldStructure label='Customer' isEdit={true} full />}
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Current status (Completed)
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SelectTextFields label='Status' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer sx={{ p: 0, overflow: "unset" }} components={['DateTimePicker', 'DateTimePicker']}>
                                <DateTimePicker
                                    label="Time"
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                    slotProps={{
                                        textField: {
                                            size: 'small', fullWidth: true,
                                            minWidth: '200px !important'
                                        }, dialog: { backgroundColor: 'red' }
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>
                    <InputField variant='outlined' multiline rows={2} label='Add note' />
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Next action (Follow up / plan)
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SelectTextFields label='Status' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer sx={{ p: 0, overflow: "unset" }} components={['DateTimePicker', 'DateTimePicker']}>
                                <DateTimePicker
                                    label="Time"
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                    slotProps={{ textField: { size: 'small', fullWidth: true }, dialog: { backgroundColor: 'red' } }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>
                    <InputField variant='outlined' multiline rows={2} label='Add note' />
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
                        Cancel
                    </Button>
                    {/* <Button
                        // startIcon={<DoneIcon />}
                        variant="contained"
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        Submit
                    </Button> */}
                    <CustomButton
      loading={loading}
      onClick={handleClick}
      variant="contained"
      color="primary"
    >
      Submit
    </CustomButton>
                </Box>
            </DialogActions>
        </Dialog >
    )
}

export default UpdateLeadStatus