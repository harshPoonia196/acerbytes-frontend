import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import InputField from 'Components/CommonLayouts/InputField';
import SelectTextFields from 'Components/CommonLayouts/SelectTextFields';
import React, { useEffect, useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import CustomButton from 'Components/CommonLayouts/Loading/LoadingButton';
import NewSelectTextFieldStructure from 'Components/CommonLayouts/NewSelectTextFieldStructure';
import { NOTES_STATUS } from 'utills/Constants';
import { useSnackbar } from 'utills/SnackbarContext';
import { getMyLeadsCustomer } from 'api/Broker.api';

function UpdateLeadStatus({ open, handleClose, isUserSelected }) {
    const [loading, setLoading] = useState(false),
        [myLeadsCustomer, setMyLeadsCustomer] = useState([])

    useEffect(() => {
        getList()
    }, [])

    const { openSnackbar } = useSnackbar(),
        showToaterMessages = (message, severity) => {
            openSnackbar(message, severity);
        };

    const getList = async () => {
        try {
            const { data: { data: { data = [] } } } = await getMyLeadsCustomer(),
                list = []
            for (let i = 0; i < data.length; i++) {
                const { userId, fullName } = data[i]
                if (!list?.find(user => user.value === userId))
                    list.push({ value: userId, label: fullName })
            }
            setMyLeadsCustomer(list)
        } catch (error) {
            showToaterMessages(error.message, "error");
        }
    }

    const handleClick = () => {
        setLoading(true);
        handleClose();
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
                    {!isUserSelected && <NewSelectTextFieldStructure label='Customer' isEdit={true} full list={myLeadsCustomer} />}
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Current status (Completed)
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SelectTextFields label='Status' list={NOTES_STATUS} />
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
                        <SelectTextFields label='Status' list={NOTES_STATUS} />
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
                    <CustomButton
                        // startIcon={<GoogleIcon />}
                        variant="outlined"
                        sx={{ mr: 2 }}
                        onClick={handleClose}
                        ButtonText={"Cancel"}

                    />
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
                        ButtonText={"Submit"}
                    />


                </Box>
            </DialogActions>
        </Dialog >
    )
}

export default UpdateLeadStatus