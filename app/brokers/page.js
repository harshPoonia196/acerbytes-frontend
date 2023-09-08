import React from "react";
import { Container, Card, Avatar, Typography, Box } from "@mui/material";

function Brokers() {
  return (
    <Container>
      <Card sx={{ p: 2 }}>
        <Avatar alt="Remy Sharp" src="" />
        <Box>
          <Typography variant="body1">First Last</Typography>
        </Box>
      </Card>
    </Container>
  );
}

export default Brokers;
