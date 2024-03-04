import React, { useEffect } from "react";
import { Typography, TextField, Grid, Box, Autocomplete, createFilterOptions } from "@mui/material";
import colors from "styles/theme/colors";
import { menuMaxHeight } from "utills/Constants";
const filter = createFilterOptions();

const top100Films = [{ label: "Mumbai" }];

const NewAutocompleteAddOptionToList = ({
  handleChange,
  label,
  value,
  sx,
  variant,
  isEdit,
  options,
  error,
  list
}) => {

  return (
    <>
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography
            variant='subtitle2'
            sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
          >
            {label}
          </Typography>
        </Box>
        <Autocomplete
          value={value && value}
          error={error}
          onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              handleChange(newValue.inputValue)
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              handleChange(newValue.inputValue)
            } else {
              handleChange(newValue ? newValue.city : '')
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some((option) => inputValue === option.city);
            if (inputValue !== '' && !isExisting) {
              filtered.push({
                inputValue,
                city: ` "${inputValue}"`,
              });
            }

            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="free-solo-with-text-demo"
          options={options}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue;
            }
            // Regular option
            return option.city;
          }}
          renderOption={(props, option) => <li {...props}>{option.city}</li>}
          fullWidth
          freeSolo
          renderInput={(params) => (
            <TextField {...params} error={error} value={params.value} fullWidth size="small" />
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
  )
};

export default NewAutocompleteAddOptionToList;
