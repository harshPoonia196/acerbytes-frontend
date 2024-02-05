import React, { useState } from "react";
import { Typography, Box, Rating } from "@mui/material";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const RatingDetails = (props) => {
  const { title, description, value, setValue } = props;

  const [hover, setHover] = useState(0);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "0.5rem", mb: 1 }}>
          <Rating
            size="small"
            name="hover-feedback"
            precision={0.5}
            value={value}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />
          {value !== null && (
            <Box sx={{}}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default RatingDetails;
