import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";

const NoDataCard = ({ title }) => {
  return (
    <Card sx={{ p: 2 }}>
      {title ? <Typography variant="h6">{title}</Typography> : <Typography variant="h6">No data found</Typography>}
    </Card>
  );
};

export default NoDataCard;