import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(-25px)", // Add backdrop filter for blurring
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent background
        zIndex: 10000, // Set a high z-index to ensure it's on top of other elements
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default Loader;
