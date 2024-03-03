import React,{useState,useEffect} from 'react'
import {
    Card,
    Typography,
    Grid,
    Box,
    Divider,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getAllOptions } from "api/Property.api";
import {
    transformDocuments
      } from "utills/CommonFunction";
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

      const [selectOptions,setSelectOption]=useState({})
    const getAllOptionDataList = async () => {
        try {
          let res = await getAllOptions();
          if (res.status === 200) {
           let transform = transformDocuments(res.data.data)
            setSelectOption({...transform})
          }
        } catch (error) {
          console.log(error,'err')
          // showToaterMessages(
          //   error?.response?.data?.message ||
          //   error?.message ||
          //   "Error fetching state list",
          //   "error"
          // );
        } 
        // finally {
        //   setLoading(false);
        // }
      };

   useEffect(()=>{
    getAllOptionDataList()
   
   },[]) 
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
                        list={
                            selectOptions.reraApproved?.map((item) => {
                                return {
                                    label: item,
                                    value: item,
                                };
                            }) ||
                            
                            [
                            {label: "Yes", value: 'Yes'},
                            {label: "No", value: 'No'},
                            {label: "Don't know", value: "Don't know"},
                        ]}
                        error={errors?.["regulatoryClearance.reraApproved"]}
                        handleChange={(e)=>handleChange(e,"regulatoryClearance","reraApproved",undefined,undefined,undefined,undefined,undefined,undefined,true)}
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
                        list={
                            selectOptions.cc?.map((item) => {
                                return {
                                    label: item,
                                    value: item,
                                };
                            }) ||
                            [
                            {label: "Yes", value: 'Yes'},
                            {label: "No", value: 'No'},
                            {label: "Don't know", value: "Don't know"},
                        ]}
                        error={errors?.["regulatoryClearance.cc"]}
                        handleChange={(e)=>handleChange(e,"regulatoryClearance","cc",undefined,undefined,undefined,undefined,undefined,undefined,true)}
                    />
                    <NewSelectTextFieldStructure
                        label="OC"
                        isEdit={isEdit}
                        value={oc}
                        list={
                            selectOptions.oc?.map((item) => {
                                return {
                                    label: item,
                                    value: item,
                                };
                            }) ||
                            [
                            {label: "Yes", value: 'Yes'},
                            {label: "No", value: 'No'},
                            {label: "Don't know", value: "Don't know"},
                        ]}
                        error={errors?.["regulatoryClearance.oc"]}
                        handleChange={(e)=>handleChange(e,"regulatoryClearance","oc",undefined,undefined,undefined,undefined,undefined,undefined,true)}
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
                        handleChange={(e)=>handleChange(e,"regulatoryClearance","authorityRegistration",undefined,undefined,undefined,undefined,undefined,undefined,true)}
                    />
                    <NewSelectTextFieldStructure
                        label="Government Loan"
                        isEdit={isEdit}
                        value={governmentLoan}
                        list={
                            selectOptions.governmentBankLoan?.map((item) => {
                                return {
                                    label: item,
                                    value: item,
                                };
                            }) ||
                            [
                            {label: "Yes", value: 'Yes'},
                            {label: "No", value: 'No'},
                            {label: "Don't know", value: "Don't know"},
                        ]}
                        error={errors?.["regulatoryClearance.governmentLoan"]}
                        handleChange={(e)=>handleChange(e,"regulatoryClearance","governmentLoan",undefined,undefined,undefined,undefined,undefined,undefined,true)}
                    />
                    <NewSelectTextFieldStructure
                        label="Private Bank loan"
                        isEdit={isEdit}
                        value={privateBankLoan}
                        list={
                            
                            selectOptions.privateBankLoan?.map((item) => {
                                return {
                                    label: item,
                                    value: item,
                                };
                            }) ||
                            [
                            {label: "Yes", value: 'Yes'},
                            {label: "No", value: 'No'},
                            {label: "Don't know", value: "Don't know"},
                        ]}
                        error={errors?.["regulatoryClearance.privateBankLoan"]}
                        handleChange={(e)=>handleChange(e,"regulatoryClearance","privateBankLoan",undefined,undefined,undefined,undefined,undefined,undefined,true)}
                    />
                    <NewSelectTextFieldStructure
                        label="Fresh"
                        isEdit={isEdit}
                        value={fresh}
                        list={
                            selectOptions.freshSale?.map((item) => {
                                return {
                                    label: item,
                                    value: item,
                                };
                            }) ||
                            [
                            {label: "Yes", value: 'Yes'},
                            {label: "No", value: 'No'},
                            {label: "Don't know", value: "Don't know"},
                        ]}
                        error={errors?.["regulatoryClearance.fresh"]}
                        handleChange={(e)=>handleChange(e,"regulatoryClearance","fresh",undefined,undefined,undefined,undefined,undefined,undefined,true)}
                    />
                    <NewSelectTextFieldStructure
                        label="Resale"
                        isEdit={isEdit}
                        value={resale}
                        list={
                            selectOptions.resale?.map((item) => {
                                return {
                                    label: item,
                                    value: item,
                                };
                            }) ||
                            [
                            {label: "Yes", value: 'Yes'},
                            {label: "No", value: 'No'},
                            {label: "Don't know", value: "Don't know"},
                        ]}
                        error={errors?.["regulatoryClearance.resale"]}
                        handleChange={(e)=>handleChange(e,"regulatoryClearance","resale",undefined,undefined,undefined,undefined,undefined,undefined,true)}
                    />
                </Grid>
            </Card>
        </Grid>
    )
}

export default React.memo(RegulatoryCard)