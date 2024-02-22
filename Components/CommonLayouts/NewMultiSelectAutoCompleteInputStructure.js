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

const top100Films = [{ label: "Mumbai" }];

const NewMultiSelectAutoCompleteInputStructure = ({
  name,
  handleChange,
  label,
  type,
  value,
  list,
  sx,
  brokerUse = false,
  variant,
  isEdit,
  error,
}) => (
  <>
    <Grid item xs={12} sm={6}>
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
        >
          {label}
        </Typography>
      </Box>

      <Autocomplete
        multiple
        disablePortal
        id="combo-box-demo"
        onChange={handleChange}
        options={list || top100Films}
        getOptionLabel={(option) =>
          brokerUse ? option.fullName : option.label
        }
        value={value || []}
        fullWidth
        size="small"
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={brokerUse ? option.fullName : option.label}
              size="small"
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} size="small" fullWidth error={error} />
        )}
      />
    </Grid>
  </>
);

export default NewMultiSelectAutoCompleteInputStructure;
