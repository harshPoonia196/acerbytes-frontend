import React,{useState,useEffect} from "react";
import { Grid, Typography, TextField, MenuItem, Box } from "@mui/material";
import colors from "styles/theme/colors";
import Tooltip from "@mui/material/Tooltip";
import {
  Rating,
  Switch,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import InfoIcon from "@mui/icons-material/Info";
import { menuMaxHeight,showStarFor } from "utills/Constants";
import { capitalLizeName } from "utills/CommonFunction";

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
  isRequired,
  sx,
  showInfo = false,
  infoText = "Info",
  helperText = "",
}) {
  const [rating, setRating] = useState(0);

  useEffect(()=>{
    let returnValue=0
   let check = showStarFor.find(item => item === label)
    if(check){
      switch (value.toLowerCase()) {
        case "yes":
          returnValue = 5;
          break;
        case "no":
          returnValue = 0;
          break;
        case "dont know":
          returnValue = 0;
          break;
        case "don't know":
          returnValue = 0;
          break;
        case "on time":
          returnValue = 5;
          break;
        case "delay":
          returnValue = 0;
          break;
        default:
          returnValue = 0;
      }
      setRating(returnValue)
    }

  })
  return (
    <Grid item xs={12} sm={full ? 12 : 6}>
      <Box sx={{ display: "flex" }}>
        <Typography
          variant="subtitle2"
          sx={{ alignSelf: "center", color: colors.GRAY }}
        >
          {label} {isRequired && <span style={{ color: colors.ERROR }}>*</span>}
        </Typography>
        {
showStarFor.find(item => item === label)
           &&
         <Rating
         readOnly={true}
          value={rating}
          defaultValue={0}
          precision={0.5}
          size="small"
          sx={{ alignSelf: "center",marginLeft:"5px" }}
        
          /> 

        }
        
        {showInfo && (
          <span>
            <Tooltip title={infoText}>
              <InfoIcon
                sx={{
                  fontSize: "1rem",
                  cursor: "pointer",
                  ml: 1,
                  color: colors.GRAY,
                }}
              />
            </Tooltip>
          </span>
        )}
      </Box>
      {isEdit ? (
        <TextField
          select
          name={name}
          variant={variant ? variant : "outlined"}
          value={value && value}
          onChange={handleChange}
          error={error && error}
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
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: menuMaxHeight,
                },
              },
            },
          }}
        >
          {list ? (
            list?.map((option) => {
              if (option.label) {
                return (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                );
              } else {
                return (
                  <MenuItem key={option} value={option}>
                    {capitalLizeName(option)}
                  </MenuItem>
                );
              }
            })
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
