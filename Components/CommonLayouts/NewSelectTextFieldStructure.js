import React from "react";
import { Grid, Typography, TextField, MenuItem, Box } from "@mui/material";
import colors from "styles/theme/colors";
import Tooltip from '@mui/material/Tooltip';
import InputAdornment from '@mui/material/InputAdornment';
import InfoIcon from '@mui/icons-material/Info';

function NewSelectTextFieldStructure({
  value,
  label,
  handleChange,
  name,
  list,
  error,
  isEdit,
  full,
  variant,
  sx,
  showInfo = false,
  infoText = "Info",
  helperText= ""
}) {
  return (
    <Grid item xs={12} sm={full ? 12 : 6}>
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ alignSelf: "center", color: colors.GRAY }}
        >
          {label}
        </Typography>
      </Box>
      {isEdit ? (
        <TextField
          select
          name={name}
          variant={variant ? variant : "outlined"}
          value={value && value}
          onChange={handleChange}
          error={error && error}
          InputProps={
            showInfo && {
            startAdornment: <Tooltip title={infoText}
            
            ><InputAdornment position="start"><InfoIcon sx={{fontSize:25,cursor:"pointer"}}/></InputAdornment></Tooltip>,
          }
        }
          defaultValue=""
          fullWidth
          size="small"
          sx={{
            "& .MuiInputLabel-root": {
              maxWidth: "calc(100% - 36px)",
            },
            ...sx,
          }}
          helperText={helperText}
        >
          {list ? (
            list?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))
          ) : (
            <MenuItem key="No data" value="No data" disabled>
              No data
            </MenuItem>
          )}
        </TextField>
      ) : (
        <Typography variant="subtitle1">Value</Typography>
      )}
    </Grid>
  );
}

export default NewSelectTextFieldStructure;
