import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const InfoBox = ({ title, subtitle, pagename }) => {
  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Container maxWidth="lg">
        <Box sx={{ py: 2 }}>
          {/* {pagename && <Typography variant="h2">{pagename}</Typography>} */}
          {title && <Typography variant="h4">{title}</Typography>}
          {subtitle && <Typography variant="h3">{subtitle}</Typography>}
        </Box>
      </Container>
    </Box>
  );
};

export default InfoBox;
