import React from "react";
import {
  Typography,
  TextField,
  Grid,
  Box,
  Autocomplete,
  Chip,
} from "@mui/material";
import colors from "styles/theme/colors";
import { menuMaxHeight } from "utills/Constants";

const top100Films = [{ label: "Mumbai",value:"Mumbai" }];

const NewMultiSelectAutoCompleteInputStructure = ({
  name,
  handleChange,
  label,
  type,
  value,
  list,
  disabled,
  sx,
  brokerUse = false,
  variant,
  isEdit,
  error,
  xs,
  sm, md,
  isRequired
}) => {
  return (
    <>
      <Grid item xs={xs ? xs : 12} sm={sm ? sm : 6} md={md ? md : 6}>
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
          >
            {label} {isRequired && <span style={{ color: colors.ERROR }}>*</span>}
          </Typography>
        </Box>

        <Autocomplete
          multiple
          disablePortal
          disabled={disabled}
          id="combo-box-demo"
          onChange={handleChange}
          options={list || top100Films}
          value={value || []}
          fullWidth
          size="small"
          isOptionEqualToValue={(option, value) => brokerUse?option.fullName===value.fullName:option.value === value.value}
          // getOptionLabel={(option)=> option.label}
          getOptionLabel={(option) =>{
           return brokerUse ? option.fullName : option.label}
          }
          renderTags={(value, getTagProps) =>
            value.length && value.map((option, index) => (
              <Chip
                variant="outlined"
                // label={option?.label}
                label={brokerUse ? option.fullName : option.label}
                size="small"
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} size="small" fullWidth error={error} />
          )}
          ListboxProps={
            {
              style: {
                maxHeight: menuMaxHeight,
              }
            }
          }
        />
      </Grid>
    </>
  );
};

export default NewMultiSelectAutoCompleteInputStructure;
