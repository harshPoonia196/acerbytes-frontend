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

const FilterModal = ({open, handleClose}) => {
    const [selectOption, setSelectOption] = useState({});
    const [selectedOptions, setSelectedOptions] = useState({});
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
           Filter by
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{ maxWidth: "100%", width: "500px", overflowY: "auto" }}
      >
        <NewAutoCompleteInputStructure
          xs={6}
          md={12}
          label="Category"
          list={selectOption?.projectCategory}
          handleChange={(event, value) => handleOptionChange("category", value)}
          value={selectedOptions.category ? selectedOptions.category : ""}
          clearable
          className="filter-input-field"
        />
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

export default FilterModal