import React from "react";
import { Typography, TextField, Grid, Box, Autocomplete, Chip } from "@mui/material";
import colors from "styles/theme/colors";

const top100Films = [{ label: "Mumbai" }];

const NewMultiSelectAutoCompleteInputStructure = ({
  name,
  handleChange,
  label,
  type,
  value,
  sx,
  variant,
  isEdit,
}) => (
  <>
    <Grid item xs={12}>
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
        options={top100Films}
        fullWidth
        size="small"
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option.label}
              size="small"
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} size="small" fullWidth />
        )}
      />
    </Grid>
  </>
);

export default NewMultiSelectAutoCompleteInputStructure;
