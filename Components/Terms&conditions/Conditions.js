'use client'
import React from "react";
import Paper from "@mui/material/Paper";
import { Box, Container, Stack, Typography } from "@mui/material";
import colors from "styles/theme/colors";

import { termsData } from "../../utills/Constants";

// import Accordion from "@mui/material/Accordion";
// import AccordionActions from "@mui/material/AccordionActions";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import {
    CustomAccordion,
    CustomAccordionSummary,
    CustomAccordionDetails,
  } from '../../Components/CommonLayouts/CommonAccordion'
const AccordionInfo = () => {
  return (
    <>
      

      <Container maxWidth="md" sx={{ mx: "auto" }}>
        <Paper sx={{ p: 2 }} square={false} elevation={2}>
          <Typography sx={{ color: colors.BLUE }} variant="h3">
            Terms & Conditions
          </Typography>
          <Typography variant="body2" sx={{mb:"1rem",ml:"0.25rem"}}>Last Updated on 9th Dec, 2023</Typography>
          <Stack spacing={2} >
            <Box>
              <div>
                {termsData.map(
                  (accordion) => (
                    
                    (
                      <CustomAccordion key={accordion.id}>
                        <CustomAccordionSummary sx={{margin:"0.25rem"}}
                          // expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel${accordion.id}-content`}
                          id={`panel${accordion.id}-header`}
                        >
                          {`${accordion.id}.${accordion.title}`}
                        </CustomAccordionSummary>
                        <CustomAccordionDetails>{accordion.content}</CustomAccordionDetails>
                      </CustomAccordion>
                    )

                    // accordion.title
                  )
                )}
              </div>
            </Box>
          </Stack>
        </Paper>
      </Container>
      </>
  )
}

export default AccordionInfo;

