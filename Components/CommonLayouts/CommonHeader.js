import React from "react";
import { Box, Card } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const InfoBox = ({ title, subtitle, pagename }) => {
  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Container maxWidth="lg">
        <Box sx={{}}>
          <Card sx={{ p: 2 }}>
            {/* {pagename && <Typography variant="h2">{pagename}</Typography>} */}
            {/* {title && <Typography variant="h4">{title}</Typography>} */}
            {subtitle && <Typography variant="h3">{subtitle}</Typography>}
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default InfoBox;
