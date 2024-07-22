"use client"
import React from 'react'
import {
    Container,
    Typography,
    Card,
    Grid,
    Box,
    Chip,
    Button
  } from "@mui/material";
  import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from "@mui/styles";

  const headcells = [
    {
        id: 'project',
        label: 'Project'
    },
    {
        id: 'av_units',
        label: 'Av units'
    },
    {
        id: 'min',
        label: 'Min'
    },
    {
        id: 'max',
        label: 'Max'
    },
    {
        id: 'asking_rate',
        label: 'Asking rate'
    },
    {
        id: 'specs',
        label: 'Specs'
    },
    {
        id: 'Ab_rating',
        label: 'AB Rating'
    },
  ]

  const projectDetails = [
    {
        id: 1,
        projectName: 'Gaurav apartments',
        projectdesc: 'great deal!',
        av_units: '12',
        min: '4.5 Cr',
        max: '15 Cr',
        asking_rate: '8,985/sqft',
        specs: ['2BHK', '3BHK'],
        Ab_rating: 'Excellent'
    },
    {
        id: 2,
        projectName: 'Swati apartment',
        projectdesc: '',
        av_units: '12',
        min: '4.5 Cr',
        max: '15 Cr',
        asking_rate: '8,985/sqft',
        specs: ['2BHK'],
        Ab_rating: 'Very good'
    },
    {
        id: 3,
        projectName: 'Kanungo apartment',
        projectdesc: '',
        av_units: '12',
        min: '4.5 Cr',
        max: '15 Cr',
        asking_rate: '8,985/sqft',
        specs: ['2BHK', '3BHK'],
        Ab_rating: 'Excellent'
    },
    {
        id: 4,
        projectName: 'Sah Vikas apartment',
        projectdesc: '',
        av_units: '12',
        min: '4.5 Cr',
        max: '15 Cr',
        asking_rate: '8,985/sqft',
        specs: ['2BHK', '3BHK'],
        Ab_rating: 'Very good'
    },
  ]

  const useStyles = makeStyles((theme) => ({
    demo2: {
      backgroundColor: "#fff",
      position: "sticky",
      top: 54,
      left: 0,
      right: 0,
      zIndex: 100,
      [theme.breakpoints?.up("sm")]: {
        top: 64,
      },
    },
  }));

const ProjectDetails = () => {

    const handleClick = () => {
        console.info('You clicked the delete icon.');
    };

    const classes = useStyles();

  return (
    <Box>
        <Box className={classes.demo2}>
            <Card sx={{ p: 2}}>
                <Grid container>
                    <Grid item xs={12} sm={8} md={8}>
                        <Typography
                        variant="h2"
                        sx={{
                            fontWeight: "700 !important"
                        }}
                        >
                        Patparganj, Delhi - 110092
                        </Typography>
                        <Typography
                        variant="h3"
                        sx={{ alignSelf: "center", textTransform: "capitalize", mb: "5px" }}
                        >
                        234 units
                        </Typography>
                        <Typography variant="body1">available for <strong>Sale</strong> @ rs 9,221/sqft <Typography variant="body2" color="primary" component="span">(higher than last 30 deals)</Typography></Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} sx={{ textAlign: { sm: 'right'}}}>
                        <Button
                        size="small"
                        sx={{ mt: 1, ml: { sm: 1} }}
                        variant="outlined"
                        onClick={() => { window.open('http://wa.me/+919323996997', "_blank") }}
                        startIcon={<WhatsAppIcon />}
                        >
                        Contact
                        </Button>
                        <Button
                        size="small"
                        sx={{ mt: 1, ml: 1 }}
                        variant="contained">
                        Sell / Buy property
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Box>
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2}}>
                        <Typography
                        variant="h3"
                        sx={{ alignSelf: "center", textTransform: "capitalize"}}
                        >
                        34 hyper local property dealers
                        </Typography>
                    </Card>
                    {/* <Chip label="34 hyper local property dealers " color="primary" size="small" /> */}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2}}>
                        <Typography
                        variant="h3"
                        sx={{ textAlign: { sm: 'left', md: 'right'} }}
                        >
                        2,342 Buying enquiries*
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
            <Card sx={{ p: 2, mt: 2}}>
                <Chip label="Filter 1" color="primary" onDelete={handleClick} sx={{mr: 1}} />
                <Chip label="Filter 2" color="primary" onDelete={handleClick} sx={{mr: 1}} />
                <Chip label="Filter 3" color="primary" onDelete={handleClick} sx={{mr: 1}} />
            </Card>
            <Card sx={{ p: 2, mt: 2}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                {headcells.map(headcell => (
                                    <TableCell key={headcell.id}>{headcell.label}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {projectDetails.map((row) => (
                            <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.projectName} <Typography variant="span" color="green">{row.projectdesc}</Typography>
                            </TableCell>
                            <TableCell>{row.av_units} units</TableCell>
                            <TableCell>Rs {row.min}</TableCell>
                            <TableCell>{row.max}</TableCell>
                            <TableCell>Rs {row.asking_rate}</TableCell>
                            <TableCell>{row.specs.map(spec => (
                                <Chip label={spec} size='small' sx={{mr: 1}}/>
                            ))}</TableCell>
                            <TableCell>{row.Ab_rating}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ mt: 5}}>
                    <Typography variant="body1" sx={{ mb: 1}}>While Selling / Buying</Typography>
                    <Typography variant="body1">Exploring (+10%), Anytime, Urgent (-10%)</Typography>
                </Box>
            </Card>
        </Container>
    </Box>
  )
}

export default ProjectDetails