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
import { NOTES_STATUS, NOTES_TYPE } from 'utills/Constants';
import { useSnackbar } from 'utills/SnackbarContext';
import { createNote, getMyLeadsCustomer } from 'api/Broker.api';
import { ToasterMessages } from "utills/Constants";
import dayjs from 'dayjs';

function UpdateLeadStatus({ open, handleClose, getList: getNotesList, isEdit, editData, setIsEdit }) {
    const [loading, setLoading] = useState(false),
        [myLeadsCustomer, setMyLeadsCustomer] = useState([]),
        [errors, setErrors] = useState({ status: false, time: false, note: false, userId: false, statusNext: false, timeNext: false, noteNext: false }),
        [formValue, setFormValue] = useState({ completed: {}, next: {}, userId: '' })

    useEffect(() => {
        if (isEdit) {
            const { comment: note, name, status, time, type, userId } = editData;
            if (type === NOTES_TYPE.COMPLETED) {
                setFormValue({ completed: { note, name, status, time }, next: {}, userId: userId })
            } else {
                setFormValue({ completed: {}, next: { note, name, status, time }, userId: userId })
            }
            setFormValue
        }
    }, [isEdit])


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
                const { userId, fullName, _id } = data[i];
                if (userId) {
                    if (!list?.find(user => user.value === userId))
                        list.push({ value: userId, label: fullName, isNonLogin: false })
                } else {
                    if (!list?.find(user => user.value === _id))
                        list.push({ value: _id, label: fullName, isNonLogin: true })
                }
            }
            setMyLeadsCustomer(list)
        } catch (error) {
            showToaterMessages(error.message, "error");
        }
    },

        handleChange = (e, field, type) => {
            let val;
            if (field === 'status' || field === 'note') {
                val = e.target.value
            } else {
                val = new Date(e)
            }

            setFormValue((value) => {
                let { completed = {}, next = {}, userId = '' } = value;
                if (type === NOTES_TYPE.COMPLETED)
                    completed = { ...completed, [field]: val }
                else
                    next = { ...next, [field]: val }

                return { completed, next, userId };
            })
        },

        userChange = (e) => {
            const val = e.target.value;
            setFormValue((value) => {
                return { ...value, userId: val };
            })
        },

        getValidationError = ({ key1, value1 }, { key2, value2 }, { key3, value3 }) => {
            const error = {}
            if (!value1) error[key1] = true;
            if (!value2) error[key2] = true;
            if (!value3) error[key3] = true;
            return error;
        },

        reset = () => {
            setIsEdit(false)
            setErrors({ status: false, time: false, note: false, userId: false, statusNext: false, timeNext: false, noteNext: false })
            setFormValue({ completed: {}, next: {}, userId: '' })
        },

        onSave = async () => {
            const { completed: { time, status, note } = {}, next: { time: timeNext, status: statusNext, note: noteNext } = {}, userId = '' } = formValue,
                { time: timeError = false, status: statusError = false, note: noteError = false } = getValidationError({ key1: 'time', value1: time }, { key2: 'status', value2: status }, { key3: 'note', value3: note }),
                { statusNext: statusNextError = false, timeNext: timeNextError = false, noteNext: noteNextError = false } = getValidationError({ key1: 'timeNext', value1: timeNext }, { key2: 'statusNext', value2: statusNext }, { key3: 'noteNext', value3: noteNext });

            let errorsCompleted = { timeError, statusError, noteError }
            if (timeError && statusError && noteError) {
                errorsCompleted = { time: false, status: false, note: false }
            } else {
                errorsCompleted = { time: timeError, status: statusError, note: noteError }
            }

            let errorsNext = { statusNextError, timeNextError, noteNextError }
            if (statusNextError && timeNextError && noteNextError) {
                errorsNext = { statusNext: false, timeNext: false, noteNext: false }
            } else {
                errorsNext = { statusNext: statusNextError, timeNext: timeNextError, noteNext: noteNextError }
            }

            const errors = { ...errorsCompleted, ...errorsNext, userId: !userId };
            setErrors(errors);
            let isError = false
            for (const key in errors) {
                if (Object.hasOwnProperty.call(errors, key)) {
                    const element = errors[key];
                    if (element) {
                        isError = true;
                        showToaterMessages('Please fill required fields', "error");
                        break;
                    }
                }
            }

            if (!userId) {
                isError = true;
                showToaterMessages('Please select customer', "error");
            } else if (!(time || status || note || timeNext || statusNext || noteNext)) {
                isError = true;
                showToaterMessages('Please fill completed or next note fields', "error");
            }

            if (!isError) {
                const data = { userId }
                if (userId) {
                    const { isNonLogin, label } = myLeadsCustomer.find(res => res.value === userId);
                    data.isNonLogin = isNonLogin;
                    data.fullName = label;
                }

                if (isEdit) {
                    data._id = editData?.noteId;
                }

                if (time && status && note) {
                    data.completed = { time, status, note, type: NOTES_TYPE.COMPLETED }
                }

                if (timeNext && statusNext && noteNext) {
                    data.next = { time: timeNext, status: statusNext, note: noteNext, type: NOTES_TYPE.NEXT }
                }

                try {
                    setLoading(true);
                    const response = await createNote(data);
                    if (response.status == 200) {
                        showToaterMessages(isEdit ? ToasterMessages.NOTE_UPDATED_SUCCESS : ToasterMessages.NOTE_CREATED_SUCCESS, "success");
                        handlePopClose();
                        getNotesList()
                    }
                } catch (error) {
                    showToaterMessages(
                        error?.response?.data?.message ||
                        error?.message ||
                        "Error creating note request",
                        "error"
                    );
                } finally {
                    setLoading(false);
                }
            }
        },

        handlePopClose = () => {
            reset();
            handleClose();
        }

    return (
        <Dialog sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }} open={open} onClose={handlePopClose}>
            <DialogTitle onClose={handlePopClose}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {isEdit ? 'Edit Note' : 'Add Note'}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {<NewSelectTextFieldStructure disabled={isEdit} label='Customer' isEdit={true} full list={myLeadsCustomer} value={formValue?.userId ?? null} handleChange={(e) => userChange(e)} error={errors.userId} />}

                    {!isEdit || (isEdit && editData?.type === NOTES_TYPE.COMPLETED) ?
                        <>
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    Current status (Completed)
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SelectTextFields label='Status' value={formValue?.completed?.status ?? null} list={NOTES_STATUS} error={errors.status} handleChange={(e) => handleChange(e, 'status', NOTES_TYPE.COMPLETED)} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer sx={{ p: 0, overflow: "unset" }} components={['DateTimePicker', 'DateTimePicker']}>
                                        <DateTimePicker
                                            value={formValue?.completed?.time ? dayjs(formValue?.completed?.time) : null}
                                            onChange={(date) => handleChange(date, 'time', NOTES_TYPE.COMPLETED)}
                                            label="Time"
                                            viewRenderers={{
                                                hours: renderTimeViewClock,
                                                minutes: renderTimeViewClock,
                                                seconds: renderTimeViewClock,
                                            }}
                                            slotProps={{
                                                textField: {
                                                    size: 'small', fullWidth: true,
                                                    minWidth: '200px !important', error: errors.time
                                                }, dialog: { backgroundColor: 'red' }
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <InputField variant='outlined' value={formValue?.completed?.note ?? ''} multiline rows={2} label='Add note' error={errors.note} handleChange={(e) => handleChange(e, 'note', NOTES_TYPE.COMPLETED)} />
                        </> : null
                    }


                    {
                        !isEdit || (isEdit && editData?.type === NOTES_TYPE.NEXT) ?
                            <>
                                <Grid item xs={12}>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                        Next action (Follow up / plan)
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <SelectTextFields value={formValue?.next?.status ?? ''} label='Status' list={NOTES_STATUS} error={errors.statusNext} handleChange={(e) => handleChange(e, 'status', NOTES_TYPE.NEXT)} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer sx={{ p: 0, overflow: "unset" }} components={['DateTimePicker', 'DateTimePicker']}>
                                            <DateTimePicker
                                                value={formValue?.next?.time ? dayjs(formValue?.next?.time) : null}
                                                onChange={(date) => handleChange(date, 'time', NOTES_TYPE.NEXT)}
                                                label="Time"
                                                viewRenderers={{
                                                    hours: renderTimeViewClock,
                                                    minutes: renderTimeViewClock,
                                                    seconds: renderTimeViewClock,
                                                }}
                                                slotProps={{ textField: { size: 'small', fullWidth: true, error: errors.timeNext }, dialog: { backgroundColor: 'red' } }}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Grid>
                                <InputField variant='outlined' value={formValue?.next?.note ?? ''} multiline rows={2} label='Add note' error={errors.noteNext} handleChange={(e) => handleChange(e, 'note', NOTES_TYPE.NEXT)} />
                            </> : null
                    }

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
                        variant="outlined"
                        sx={{ mr: 2 }}
                        onClick={handlePopClose}
                        ButtonText={"Cancel"}

                    />
                    <CustomButton
                        loading={loading}
                        onClick={onSave}
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