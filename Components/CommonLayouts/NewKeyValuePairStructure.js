import React from "react";
import { Typography, Grid, Rating, Box, Tooltip } from "@mui/material";

function NewKeyValuePairStructure({
  label,
  value,
  middleValue,
  isRating,
  isRatingReadOnly,
  labelIcon
}) {
  return (
    <>
      {value ? (
        <>
          <Grid item xs={middleValue === undefined ? 7 : 5}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography variant="h6"
                sx={{ fontSize: { xs: '0.75rem !important', sm: '0.875rem !important' } }}
              >{label}
              </Typography>
              
                {labelIcon && labelIcon}
              
              
            </Box>

          </Grid>
          {!(middleValue === undefined) && (
            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <Typography variant="body2">{middleValue}</Typography>
            </Grid>
          )}
          <Grid item xs={5} sx={{ textAlign: "end" }}>
            {isRating === undefined ? (
              <Typography variant="body2" sx={{ alignSelf: "center", flex: 1, fontSize: { xs: '0.75rem !important', sm: '0.875rem !important' } }}>
                {value}
              </Typography>
            ) : (
              <Rating
                name="half-rating"
                {...(value ? {} : { defaultValue: 2.5 })}
                precision={0.5}
                value={value}
                readOnly={isRatingReadOnly && true}
                size="small"
                sx={{ alignSelf: "center", fontSize: { xs: '0.75rem !important', sm: '0.875rem !important' } }}
              />
            )}
          </Grid>
        </>
      ) : null}
    </>
  );
}

export default NewKeyValuePairStructure;
