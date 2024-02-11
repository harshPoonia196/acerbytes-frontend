'use client'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import colors from 'styles/theme/colors';
import { privacyData } from 'utills/Constants';
import {
   CustomAccordion,
   CustomAccordionSummary,
   CustomAccordionDetails,
 } from '../../Components/CommonLayouts/CommonAccordion'
const page = () => {
  return (
    <>
     <Container maxWidth="md" sx={{mx:'auto'}}>
        <Paper sx={{p:2}} square={false} elevation={2} >
            <Typography sx={{color:colors.BLUE,pl:"0.5rem"}} variant='h3'>Privacy Policy</Typography>
            <Typography variant='body2'ml={"0.5rem"}>Last Updated on 9th Dec, 2023</Typography>
            <Typography sx={{my:1, p:"0.5rem"}} variant='body1'>
                        The website and the mobile application ‘Nobroker’ (together“Website”) is owned and operated by Nobroker Technology Solutions Private Limited, a company incorporated in India under the Companies Act, 1956 (“Company”). The Company is engaged in the business of facilitating owners, tenants, buyers and sellers to explore and identify all kinds of immovable properties including lands, buildings, factories, houses, flats, and other residential, commercial, and industrial plots and properties and enabling them to carry on transaction of purchase, sale, licensing, leasing, hiring, renting or otherwise relating to movable and immovable properties and other related services (“Services”).
             <br/>
             <br/>
            This Privacy Policy (“Privacy Policy”) sets out the privacy practices of the Company with respect to the entire content of the Website.
            <br/>
            <br/>
            This document is published in accordance with the provisions of the Information Technology Act, 2000 and the rules made thereunder that require publishing the rules and regulations, privacy policy and terms of use on an online portal of the Company. We request you to go through this Privacy Policy and the Terms of Use carefully before you decide to access this Website.
            <br/>
            <br/>
            For the purposes of this Privacy Policy, the words “us”, “we”, and “our” refer to the Company and all references to “you”, “your” or “user”, as applicable mean the person who accesses, uses and/or participates in the Website in any manner or capacity.
            <br/>
            <br/>
            The protection and security of your personal information is our top priority and we have taken all necessary and reasonable measures to protect the confidentiality of the user information and its transmission through the internet.
            <br/>
            <br/>
             <b>By using our Services and the Website or by otherwise giving us your information, you agree to the terms of this Privacy Policy. You also expressly consent to our use and disclosure of your Personal Information (as defined below) in the manner prescribed under this Privacy Policy and further signify your agreement to this Privacy Policy and the Terms of Use. If you do not agree to this Privacy Policy, do not subscribe to the Services, use the Website or give us any of your information.</b>
            </Typography>

            <Stack spacing={2} sx={{my:'1rem'}}>
              
            <div>
                {privacyData.map(
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
                        <CustomAccordionDetails >{accordion.content}</CustomAccordionDetails>
                      </CustomAccordion>
                    )

                    // accordion.title
                  )
                )}
              </div>

            </Stack>
        </Paper>
     </Container> 
    </>
  )
}

export default page
