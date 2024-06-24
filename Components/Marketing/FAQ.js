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
      title: 'Accordion 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
    },
    {
      id: 2,
      title: 'Accordion 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'
    }
  ]
  return (
    <Container maxWidth="lg" className='faq' sx={{paddingBottom: 0}}>
      {faq.map((item, index) => {
        return (
          <Accordion sx={{marginBottom: 2, boxShadow: "0px 1px 10px -2px gainsboro!important"}} key={item.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${item.id}-content`}
              id={`panel${item.id}-header`}
              
            >
              <Typography variant='body1' sx={{fontWeight: 700}}>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant='body1'>{item.description}</Typography>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </Container>
  );
}