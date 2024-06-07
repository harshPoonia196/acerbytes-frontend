import React from "react";
import { Box, Card, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const InfoBox = ({ label, button, dataList }) => {
  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {label &&
            <Grid item xs={12} sx={{ display: 'flex' }}>
              <Box sx={{ flex: 1, alignSelf: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{label}</Typography>
              </Box>
              {
                button && <Box sx={{ textAlign: 'end' }}>
                  {button}
                </Box>
              }
            </Grid>
          }
          {
            dataList?.map((data, index) => (
              <Grid key={index} item xs={6} sm={4} md={2}>
                <Card sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h3">{data?.value}</Typography>
                  <Typography variant="h6">{data?.label}</Typography>
                </Card>
              </Grid>
            ))
          }

        </Grid>
      </Container>
    </Box>
  );
};

export default InfoBox;
