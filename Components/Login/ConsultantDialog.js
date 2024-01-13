import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, ToggleButton } from '@mui/material'
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
        <div>
            <Dialog
                open={showConsultantDetailsPopup}
                onClose={() => setShowConsultantDetailsPopup(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Additional Details for Real Estate Consultant
                </DialogTitle>
                <DialogContent>
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
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => createUserFun()}
                        color="primary"
                    >
                        I'll do it later!
                    </Button>
                    <LoadingButton
                        onClick={() => handleSubmit()}
                        color="primary"
                        variant="contained"
                        loading={loading}
                    >
                        Submit
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ConsultantDialog