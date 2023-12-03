import React from "react";
import { Typography, TextField, Grid, Box } from "@mui/material";
import colors from "styles/theme/colors";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const DateTimeInputField = ({
    name,
    handleChange,
    label,
    type,
    value,
    sx,
    variant,
    isEdit,
    isFull,
    ...props
}) => (
    <>
        <Grid item xs={12} sm={isFull ? 12 : 6}>
            <Box>
                <Typography
                    variant="subtitle2"
                    sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                >
                    {label}
                </Typography>
            </Box>
            {isEdit ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx={{ p: 0 }}>
                        <DatePicker slotProps={{ textField: { size: 'small', fullWidth: true } }} views={['month', 'year']} />
                    </DemoContainer>
                </LocalizationProvider>
            ) : (
                <Typography variant="subtitle1">Value</Typography>
            )}
        </Grid>
    </>
);

export default DateTimeInputField;
