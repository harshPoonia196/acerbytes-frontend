import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, ToggleButton } from '@mui/material'
import CustomButton from 'Components/CommonLayouts/Loading/LoadingButton'
import NewInputFieldStructure from 'Components/CommonLayouts/NewInputFieldStructure'
import NewToggleButtonStructure from 'Components/CommonLayouts/NewToggleButtonStructure'
import React, { useEffect, useState } from 'react'

const ConsultantDialog = ({ loading, createUserFun, form, handleChange, showConsultantDetailsPopup, setShowConsultantDetailsPopup }) => {

    const [validationErrors, setValidationErrors] = useState({
        company: '',
        reraNo: '',
    });

    const validateForm = () => {
        let isValid = true;
        const errors = {};

        if (!form.company) {
            errors.company = true;
            isValid = false;
        }

        if (!form.reraNo) {
            errors.reraNo = true;
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            createUserFun();
        }
    };

    const handleChangeFun = async (name, value) => {
        await handleChange(name, value)
        setValidationErrors({});
    }


    return (

        <Dialog sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }}
            open={showConsultantDetailsPopup}
            onClose={() => setShowConsultantDetailsPopup(false)}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle onClose={() => setShowConsultantDetailsPopup(false)}>
                Additional Details for Real Estate Consultant
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <NewToggleButtonStructure
                        isEdit={true}
                        label="Business type"
                        value={form.businessType}
                        handleChange={(e) => handleChangeFun("businessType", e.target.value)}
                    >
                        <ToggleButton fullWidth size="small" value="INDIVIDUAL">
                            Individual
                        </ToggleButton>
                        <ToggleButton fullWidth size="small" value="COMPANY">
                            Company
                        </ToggleButton>
                    </NewToggleButtonStructure>
                    <NewInputFieldStructure isEdit={true} error={validationErrors?.company} value={form.company} handleChange={(e) => handleChangeFun("company", e.target.value)} label="Company" variant="outlined" />
                    <NewInputFieldStructure isEdit={true} error={validationErrors?.reraNo} value={form.reraNo} handleChange={(e) => handleChangeFun("reraNo", e.target.value)} label="RERA number" variant="outlined" />
                </Grid>
            </DialogContent>
            <DialogActions>
                <CustomButton
                    onClick={createUserFun}
                    // color="primary"

                    ButtonText={"I'll do it later!"}
                />
                <CustomButton
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                    loading={loading}
                    loadingText={"Submit"}
                    ButtonText={'Submit'}
                />
            </DialogActions>
        </Dialog>

    )
}

export default ConsultantDialog