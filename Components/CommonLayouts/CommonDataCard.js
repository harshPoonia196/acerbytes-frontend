import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const NoDataCard = ({ title}) => {
  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Container maxWidth="lg">
        <Box sx={{ py: 4, textAlign:"center"}}>
          {title && <Typography variant="h6">{title}</Typography>}
        </Box>
      </Container>
    </Box>
  );
};

export default NoDataCard;