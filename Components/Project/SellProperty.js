import React, {useState } from 'react'
import {
    Container,
    Typography,
    Card,
    Grid,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
  } from "@mui/material";
  import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
  import NewAutoCompleteInputStructure from "Components/CommonLayouts/NewAutoCompleteInputStructure";
  import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
  import { capitalLizeName } from "utills/CommonFunction";

const SellProperty = ({open, handleClose}) => {
    const [selectOption, setSelectOption] = useState({
        category: [
            {label: 'Block', value: 'Block'},
            {label: 'Building', value: 'Building'},
            {label: 'Tower', value: 'Tower'},
        ],
        occupiedBy: [
            {label: 'Owner', value: 'Owner'},
            {label: 'Tenant', value: 'Tenant'},
            {label: 'Vacant', value: 'Vacant'},
            {label: 'Other', value: 'Other'},
        ],
        listing: [
            {label: 'Sale', value: 'Sale'},
            {label: 'Available for Rent', value: 'Available for Rent'},
        ]
    });
    const [selectedOptions, setSelectedOptions] = useState({
        category: '',
        unitNumber: '',
        unitType: '',
        unitArea: '',
        projectName: '',
        area1: '',
        area2: '',
        city: '',
        pinCode: ''
    });
    const handleOptionChange = (key, value) => {
    }
  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "8px !important",
          overflowY: "auto",
        },
      }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle onClose={handleClose}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Get “free”unlimited enquiries when you list property
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{ maxWidth: "100%", width: "800px", overflowY: "auto" }}
      >
        <Grid container spacing={2}>
            
                <NewAutoCompleteInputStructure
                xs={12}
                sm={6}
                md={6}
                label="Category"
                list={selectOption?.category}
                handleChange={(event, value) => handleOptionChange("category", value)}
                value={selectedOptions.category ? selectedOptions.category : ""}
                clearable
                className="filter-input-field"
                />
            
            
                <NewInputFieldStructure
                    
                    isRequired={true}
                    label={capitalLizeName("Unit number")}
                    variant="outlined"
                    value={selectedOptions.unitNumber}
                    handleChange={(e) => {(event, value) => handleOptionChange("unitNumber", value)}}
                />
            
        <NewInputFieldStructure
           
            isRequired={true}
            label={capitalLizeName("Unit type")}
            variant="outlined"
            value={selectedOptions.unitType}
            handleChange={(e) => {(event, value) => handleOptionChange("unitType", value)}}
        />
        <NewInputFieldStructure
            xs={12}
            sm={6}
            md={6}
            isRequired={true}
            label={capitalLizeName("Unit Saleable area")}
            variant="outlined"
            value={selectedOptions.unitArea}
            handleChange={(e) => {(event, value) => handleOptionChange("unitArea", value)}}
        />
        <NewInputFieldStructure
            
            isRequired={true}
            label={capitalLizeName("Project / Society name")}
            variant="outlined"
            value={selectedOptions.projectName}
            handleChange={(e) => {(event, value) => handleOptionChange("projectName", value)}}
        />
        <NewInputFieldStructure
            
            isRequired={true}
            label={capitalLizeName("Area 1")}
            variant="outlined"
            value={selectedOptions.area1}
            handleChange={(e) => {(event, value) => handleOptionChange("area1", value)}}
        />
        <Grid item xs={12} sm={6} md={4}>
            <NewInputFieldStructure
                isFull
                isRequired={true}
                label={capitalLizeName("Area 2")}
                variant="outlined"
                value={selectedOptions.area2}
                handleChange={(e) => {(event, value) => handleOptionChange("area2", value)}}
            />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <NewInputFieldStructure
            isFull
            isRequired={true}
            label={capitalLizeName("City")}
            variant="outlined"
            value={selectedOptions.city}
            handleChange={(e) => {(event, value) => handleOptionChange("city", value)}}
        />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <NewInputFieldStructure
            isFull
            isRequired={true}
            label={capitalLizeName("PinCode")}
            variant="outlined"
            value={selectedOptions.pinCode}
            handleChange={(e) => {(event, value) => handleOptionChange("PinCode", value)}}
        />
        </Grid>
        
        <NewInputFieldStructure
           isFull
            isRequired={true}
            label={capitalLizeName("Do you have “Direct” access of keys ?")}
            variant="outlined"
            value={selectedOptions.accessKey}
            handleChange={(e) => {(event, value) => handleOptionChange("accessKey", value)}}
        />
        <NewAutoCompleteInputStructure
          xs={12}
          md={12}
          label="Unit occupied by"
          list={selectOption?.occupiedBy}
          handleChange={(event, value) => handleOptionChange("occupiedBy", value)}
          value={selectedOptions.occupiedBy ? selectedOptions.occupiedBy : ""}
          clearable
          className="filter-input-field"
        />
        
        <NewInputFieldStructure
            isRequired={true}
            label={capitalLizeName("Owner first name")}
            variant="outlined"
            value={selectedOptions.firstName}
            handleChange={(e) => {(event, value) => handleOptionChange("firstName", value)}}
        />
        <NewInputFieldStructure
            isRequired={true}
            label={capitalLizeName("Owner last name")}
            variant="outlined"
            value={selectedOptions.lastName}
            handleChange={(e) => {(event, value) => handleOptionChange("lastName", value)}}
        />
        <NewInputFieldStructure
            isRequired={true}
            label={capitalLizeName("Owner phone number")}
            variant="outlined"
            value={selectedOptions.phoneNumber}
            handleChange={(e) => {(event, value) => handleOptionChange("phoneNumber", value)}}
        />
        <NewInputFieldStructure
            isRequired={true}
            label={capitalLizeName("Owner email")}
            variant="outlined"
            value={selectedOptions.email}
            handleChange={(e) => {(event, value) => handleOptionChange("email", value)}}
        />
        <NewAutoCompleteInputStructure
          xs={12}
          md={12}
          label="Listing for"
          list={selectOption?.listing}
          handleChange={(event, value) => handleOptionChange("listing", value)}
          value={selectedOptions.listing ? selectedOptions.listing : ""}
          clearable
          className="filter-input-field"
        />
        <Grid item xs={12} sm={6} md={4}>
        <NewInputFieldStructure
            isFull
            isRequired={true}
            label={capitalLizeName("For Sale")}
            variant="outlined"
            value={selectedOptions.forSale}
            handleChange={(e) => {(event, value) => handleOptionChange("forSale", value)}}
        />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <NewInputFieldStructure
            isFull
            isRequired={true}
            label={capitalLizeName("Rate")}
            variant="outlined"
            value={selectedOptions.rate}
            handleChange={(e) => {(event, value) => handleOptionChange("rate", value)}}
        />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <NewInputFieldStructure
            isFull
            isRequired={true}
            label={capitalLizeName("Price")}
            variant="outlined"
            value={selectedOptions.price}
            handleChange={(e) => {(event, value) => handleOptionChange("price", value)}}
        />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <NewInputFieldStructure
        isFull
            isRequired={true}
            label={capitalLizeName("For rent")}
            variant="outlined"
            value={selectedOptions.rent}
            handleChange={(e) => {(event, value) => handleOptionChange("rent", value)}}
        />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <NewInputFieldStructure
            isFull
            isRequired={true}
            label={capitalLizeName("Rate")}
            variant="outlined"
            value={selectedOptions.rentRate}
            handleChange={(e) => {(event, value) => handleOptionChange("rentRate", value)}}
        />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <NewInputFieldStructure
            isFull
            isRequired={true}
            label={capitalLizeName("Available Month")}
            variant="outlined"
            value={selectedOptions.availableMonth}
            handleChange={(e) => {(event, value) => handleOptionChange("availableMonth", value)}}
        />
        </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{ justifyContent: "flex-end", alignItems: "flex-start", pt: 1 }}
      >
        
        <Box sx={{ textAlign: "right"}}>
        <CustomButton
          variant="contained"
          size="small"
          ButtonText={"Submit"}
        />
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default SellProperty