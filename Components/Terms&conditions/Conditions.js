"use client";
import React from "react";
import Paper from "@mui/material/Paper";
import { Box, Container, Stack, Typography } from "@mui/material";
import colors from "styles/theme/colors";

import { termsData } from "../../utills/Constants";

import {
  CustomAccordion,
  CustomAccordionSummary,
  CustomAccordionDetails,
} from "../../Components/CommonLayouts/CommonAccordion";
const AccordionInfo = () => {
  return (
    <>
      <Container maxWidth="md" sx={{ mx: "auto" }}>
        <Paper sx={{ p: 1 }} square={false} elevation={1}>
          <Typography sx={{ color: colors.BLUE }} variant="h3">
            Terms & Conditions
          </Typography>
          <Typography variant="body2" sx={{ mb: "1rem" }}>
            Last Updated on 9th Dec, 2023
          </Typography>
          <Stack spacing={2}>
            <Box>
              <div>
                {termsData.map((accordion, index) => (
                  <CustomAccordion
                    key={accordion.id}
                    sx={{
                      mb: 1,
                    }}
                    defaultExpanded={index === 0}
                  >
                    <CustomAccordionSummary
                      // expandIcon={<ExpandMoreIcon />}
                      aria-
                      controls={`panel${accordion.id}-content`}
                      id={`panel${accordion.id}-header`}
                    >
                      {`${accordion.id}.${accordion.title}`}
                    </CustomAccordionSummary>
                    <CustomAccordionDetails>
                      {accordion.content}
                    </CustomAccordionDetails>
                  </CustomAccordion>
                ))}
              </div>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default AccordionInfo;
