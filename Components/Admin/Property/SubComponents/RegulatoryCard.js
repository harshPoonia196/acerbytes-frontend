import React from 'react'
import {
    Card,
    Typography,
    Grid,
    Box,
    Divider,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";

function RegulatoryCard({ isEdit, form, handleChange, errors }) {

    const {
        reraApproved,
        reraNumber,
        cc,
        oc,
        authorityRegistration,
        governmentLoan,
        privateBankLoan,
        fresh,
        resale,
    } = form.regulatoryClearance;


    return (
        <Grid item xs={12} id="regulatory">
            <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Regulatory clearance
                    </Typography>
                    <Box>
                        <IconButton>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                    <NewSelectTextFieldStructure
                        label="RERA approved"
                        isEdit={isEdit}
                        value={reraApproved}
                        list={[
                            {label: "Yes", value: 'Yes'},
                            {label: "No", value: 'No'},
                            {label: "Don't know", value: "Don't know"},
                        ]}
                        error={errors?.["regulatoryClearance.reraApproved"]}
                        handleChange={(value) => handleChange(value, "regulatoryClearance", "reraApproved")}
                    />
                    <NewInputFieldStructure
                        label="RERA number"
                        variant="outlined"
                        isEdit={isEdit}
                        value={reraNumber}
                        error={errors?.["regulatoryClearance.reraNumber"]}
                        handleChange={(value) => handleChange(value, "regulatoryClearance", "reraNumber")}
                    />
                    <NewSelectTextFieldStructure
                        label="CC"
                        isEdit={isEdit}
                        value={cc}
                        list={[
                            {label: "Yes", value: 'Yes'},
                            {label: "No", value: 'No'},
                            {label: "Don't know", value: "Don't know"},
                        ]}
                        error={errors?.["regulatoryClearance.cc"]}
                        handleChange={(value) => handleChange(value, "regulatoryClearance", "cc")}
                    />
                    <NewSelectTextFieldStructure
                        label="OC"
                        isEdit={isEdit}
                        value={oc}
                        list={[
                            {label: "Yes", value: 'Yes'},
                            {label: "No", value: 'No'},
                            {label: "Don't know", value: "Don't know"},
                        ]}
                        error={errors?.["regulatoryClearance.oc"]}
                        handleChange={(value) => handleChange(value, "regulatoryClearance", "oc")}
                    />
                    <NewSelectTextFieldStructure
                        label="Authority registration"
                        isEdit={isEdit}
                        value={authorityRegistration}
                        list={[
                            {label: "Yes", value: 'Yes'},
                            {label: "No", value: 'No'},
                            {label: "Don't know", value: "Don't know"},
                        ]}
                        error={errors?.["regulatoryClearance.authorityRegistration"]}
                        handleChange={(value) => handleChange(value, "regulatoryClearance", "authorityRegistration")}
                    />
                    <NewSelectTextFieldStructure
                        label="Government Loan"
                        isEdit={isEdit}
                        value={governmentLoan}
                        list={[
                            {label: "Yes", value: 'Yes'},
                            {label: "No", value: 'No'},
                            {label: "Don't know", value: "Don't know"},
                        ]}
                        error={errors?.["regulatoryClearance.governmentLoan"]}
                        handleChange={(value) => handleChange(value, "regulatoryClearance", "governmentLoan")}
                    />
                    <NewSelectTextFieldStructure
                        label="Private Bank loan"
                        isEdit={isEdit}
                        value={privateBankLoan}
                        list={[
                            {label: "Yes", value: 'Yes'},
                            {label: "No", value: 'No'},
                            {label: "Don't know", value: "Don't know"},
                        ]}
                        error={errors?.["regulatoryClearance.privateBankLoan"]}
                        handleChange={(value) => handleChange(value, "regulatoryClearance", "privateBankLoan")}
                    />
                    <NewSelectTextFieldStructure
                        label="Fresh"
                        isEdit={isEdit}
                        value={fresh}
                        list={[
                            {label: "Yes", value: 'Yes'},
                            {label: "No", value: 'No'},
                            {label: "Don't know", value: "Don't know"},
                        ]}
                        error={errors?.["regulatoryClearance.fresh"]}
                        handleChange={(value) => handleChange(value, "regulatoryClearance", "fresh")}
                    />
                    <NewSelectTextFieldStructure
                        label="Resale"
                        isEdit={isEdit}
                        value={resale}
                        list={[
                            {label: "Yes", value: 'Yes'},
                            {label: "No", value: 'No'},
                            {label: "Don't know", value: "Don't know"},
                        ]}
                        error={errors?.["regulatoryClearance.resale"]}
                        handleChange={(value) => handleChange(value, "regulatoryClearance", "resale")}
                    />
                </Grid>
            </Card>
        </Grid>
    )
}

export default RegulatoryCard