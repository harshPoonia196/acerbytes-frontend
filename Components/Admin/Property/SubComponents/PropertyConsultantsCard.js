import React, { useEffect } from "react";
import {
  Card,
  Typography,
  Grid,
  Box,
  ToggleButton,
  Chip,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NewMultiSelectAutoCompleteInputStructure from "Components/CommonLayouts/NewMultiSelectAutoCompleteInputStructure";
import BrokerCard from "Components/BrokersPage/BrokerCard";

function PropertyConsultantsCard({ isEdit, form, list, handleChange }) {
  let { consultants } = form;
  return (
    <Grid item xs={12} id="propertyConsultants">
      <Card>
        <Box sx={{ display: "flex", p: 2, py: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
          >
            Property Consultants
          </Typography>
        </Box>
        <Divider />
        <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
          {/* {JSON.stringify(list)} */}
          <NewMultiSelectAutoCompleteInputStructure
            value={form.consultants}
            list={list}
            brokerUse={true}
            handleChange={(e, newValue) => {
              handleChange(newValue, "consultant");
            }}
            isEdit={isEdit}
          />
          <Grid item xs={12} spacing={2} container>
            {form.consultants.map((item) => {
              return (
                <Grid item xs={6} direction={"row"}>
                  <BrokerCard
                    broker={{
                      fullName: item.fullName.toUpperCase(),
                      type: "Consultant",
                      stars: item.ratings,
                      clients: 432,
                    }}
                    noReview
                  />

                  {/* <BrokerCard
              broker={{
                name: "Anand Gupta",
                type: "Consultant",
                stars: 4,
                clients: 432,
              }}
              noReview
            /> */}
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default React.memo(PropertyConsultantsCard);
