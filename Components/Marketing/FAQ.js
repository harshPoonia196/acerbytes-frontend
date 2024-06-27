import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Container, Typography } from '@mui/material';

export default function FAQ() {
  const faq = [
    {
      id: 1,
      title: 'Are there any registration charges to get registered on AcreBytes',
      description: 'No, registration is completely free. You get full access of properties researched and listed on AcreBytes'
    },
    {
      id: 2,
      title: 'How AcreBytes can Improve Real estate consultants sales',
      description: 'We understand Real estate consultants requirements, we provide <ul style="padding-left: 21px;"><li>Provide a unique property page URL featuring your contact details, ensuring you receive verified leads directly in your personal leads panel</li><li>Offer suggested leads tailored to your preferences.</li><li>List Real Estate consultants on the AcreBytes property page of your project, enabling customers to contact you directly using your provided details.</li> <li>Manage customer status and keep regular notes updated.</li> <li>Market your personalized URL to drive traffic and generate leads.</li></ul>'
    },
    {
      id: 3,
      title: 'How AcreBytes can be improve Real estate consultant visibility ?',
      description: "Absolutely! You'll be featured on the Consultants list, and you can also opt for services to showcase your presence on our listed property page"
    },
    {
      id: 4,
      title: 'Can AcreBytes be accessed from mobile, as i keep on travelling for client visits',
      description: 'Yes, can continue to receive leads and update progress status on mobile'
    },
    {
      id: 5,
      title: 'Can AcreBytes list down property, if not listed',
      description: 'Yes, listing is free. Only your personalised URL will be charged'
    },
    {
      id: 6,
      title: 'Is there a team support available',
      description: 'Yes, of course. While AcreBytes is self manage web application. Still you can reach out to us anytime using Contact us'
    },
  ]
  return (
    <Container maxWidth="lg" className='faq'>
      {faq.map((item, index) => {
        return (
          <Accordion sx={{marginTop: 2, boxShadow: "0px 1px 7px -2px gainsboro!important"}} key={item.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${item.id}-content`}
              id={`panel${item.id}-header`}
              
            >
              <Typography variant='body1' sx={{fontWeight: 700}}>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant='body1' dangerouslySetInnerHTML={{ __html: item.description }} />
            </AccordionDetails>
          </Accordion>
        )
      })}
    </Container>
  );
}