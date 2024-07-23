"use client"
import React, {useState} from 'react'
import {
    Container,
    Typography,
    Card,
    Grid,
    Box,
    Chip,
    Button,
    Menu,
    Avatar 
  } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { makeStyles } from "@mui/styles";
import Link from 'next/link';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import CloseIcon from '@mui/icons-material/Close';
import FilterModal from 'Components/Project/FilterModal';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ProjectList from 'Components/Project/ProjectList';
import { formatAmount } from "utills/CommonFunction";

  const headcells = [
    {
        id: 'project',
        label: 'Project'
    },
    {
        id: 'category',
        label: 'Category'
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
        label: '@ rate'
    },
    {
        id: 'specs',
        label: 'Layouts'
    },
    {
        id: 'unitType',
        label: 'Unit type'
    },
    {
        id: 'Ab_rating',
        label: 'AB Rating'
    },
    {
        id: 'action',
        label: 'Action'
    },
  ]

  const projectDetails = [
    {
        id: 1,
        projectName: 'Gaurav apartments',
        projectdesc: 'great deal!',
        category: 'Buy',
        av_units: '12',
        min: '4.5',
        max: '15',
        asking_rate: '8985',
        specs: ['2BHK', '3BHK'],
        unitType: 'flat',
        Ab_rating: 'Excellent'
    },
    {
        id: 2,
        projectName: 'Swati apartment',
        projectdesc: '',
        category: 'Sell',
        av_units: '12',
        min: '4.5',
        max: '15',
        asking_rate: '8985',
        specs: ['2BHK'],
        Ab_rating: 'Very good'
    },
    {
        id: 3,
        projectName: 'Kanungo apartment',
        projectdesc: '',
        category: 'Buy',
        av_units: '12',
        min: '4.5',
        max: '15',
        asking_rate: '8985',
        specs: ['2BHK', '3BHK'],
        Ab_rating: 'Excellent'
    },
    {
        id: 4,
        projectName: 'Sah Vikas apartment',
        projectdesc: '',
        category: 'Buy',
        av_units: '12',
        min: '4.5',
        max: '15',
        asking_rate: '8985',
        specs: ['2BHK', '3BHK'],
        Ab_rating: 'Very good'
    },
  ]

  const filterData = [
    {
        label: 'Category',
        value: 'category'
    },
    {
        label: 'Unit Type',
        value: 'unitType'
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

    const [selectedAvatar, setSelectedAvatar] = useState()
    const [filterDialog, setFilterDialog] = useState(false)
    const [filterList, setFilterList] = useState(filterData)

    const handleDelete = (item) => {
        console.info('You clicked the delete icon.');
        const filteredData = filterList.filter(data => data.value !== item.value);
        setFilterList(filteredData);
    };

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const avatar = [
        {
         id: 1,
         name: 'Remy Sharp',
         image: '/imgs/team-01.webp' 
        },
        {
         id: 2,
         name: 'Travis Howard',
         image: '/imgs/team-03.webp' 
        },
        {
         id: 3,
         name: 'Cindy Baker',
         image: '/static/images/avatar/3.jpg' 
        },
        {
         id: 4,
         name: 'Agnes Walker',
         image: '/static/images/avatar/4.jpg' 
        },
        {
         id: 5,
         name: 'Trevor Henderson',
         image: '/static/images/avatar/5.jpg' 
        },
        {
         id: 6,
         name: 'Demo john',
         image: '/static/images/avatar/5.jpg' 
        },
      ]
    
      const selectAvtar = (selectedA) => {
        setSelectedAvatar(selectedA);
        alert(`${selectedA.name} Avtar selected`)
      }
      const max = 4
      const remainnigAvtarsData = avatar.slice(max)
      const totalAvtars = avatar.length
      const displayAvtars = avatar.splice(max)
    
      const handleCloseFilterDialog = () => {
        setFilterDialog(false);
      };

      const handleReset = () => {
        setFilterList([])
      }

  return (
    <Box className="projectTable">
        <Container>
            <Box className={classes.demo2}>
                <Card sx={{ p: 2}}>
                <Typography
                            variant="h3"
                            sx={{
                                fontWeight: "700 !important"
                            }}
                            >
                            Patparganj, Delhi - 110092
                            </Typography>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <Typography
                            variant="h3"
                            sx={{ alignSelf: "center", textTransform: "capitalize", mb: "5px" }}
                            >
                            234 units
                            </Typography>
                            <Typography variant="body1">Available for <strong>Sale</strong> @ {formatAmount(6788)}/sqft <Typography variant="body2" color="primary" component="span"> (<NorthIcon fontSize='12px' sx={{position: 'relative', top: '2px'}}/> 2% higher than last 30 deals)</Typography></Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography
                            variant="h3"
                            sx={{ alignSelf: "center", textTransform: "capitalize", mb: "5px" }}
                            >
                            42 units
                            </Typography>
                            <Typography variant="body1">Available for <strong>Rent</strong> @ {formatAmount(1424)}/sqft <Typography variant="body2" color="primary" component="span">(<NorthIcon fontSize='12px' sx={{position: 'relative', top: '2px'}} /> 2% higher than last 30 deals)</Typography></Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: 'center', mt: 2}}>
                            <Button
                            size="small"
                            sx={{ mt: 1}}
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
            <Grid container spacing={2} sx={{mt: 1}}>
                <Grid item xs={12} md={12}>
                    <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Box>
                            <Box sx={{ display: "flex", ml: 1}}>
                                {avatar.map(item => {
                                    return (
                                        <Avatar className={selectedAvatar?.id === item.id ? 'activeAvtar': null} sx={{ ml:-1}} alt={item.name} src={item.image} onClick={() => selectAvtar(item)} />
                                    )
                                    })}
                                    {totalAvtars > max ? <Avatar  sx={{ ml: "-8px"}} aria-controls={open ? 'basic-menu' : undefined} 
                                    aria-haspopup="true" aria-expanded={open ? 'true' : undefined} 
                                    onClick={handleClick}>+{remainnigAvtarsData.length}</Avatar>: null}
                                    <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    className="avatarMenu"
                                    >
                                    {remainnigAvtarsData.map(data => (
                                        <div onClick={() => {
                                        selectAvtar(data)
                                        handleClose()
                                        }}>
                                        <Avatar className={selectedAvatar?.id === data.id ? 'activeAvtar': null} alt={data.name} src={data.image} />
                                        </div>
                                    ))}
                                    </Menu>
                            </Box>
                            <Typography
                            variant="body2"
                            sx={{ alignSelf: "center", textTransform: "capitalize", mt: 1}}
                            >
                            34 hyper local Property dealers, working on 678 property enquiries
                            </Typography>
                        </Box>
                        <Link href=""><ArrowForwardIosIcon fontSize="12px"/></Link>
                    </Card>
                </Grid>
            </Grid>
            <Box sx={{ py: 2.5, display: {sm: 'flex'}, justifyContent: { sm: 'space-between'}}}>
                <Box>
                    {filterList.map(item => (
                        <Chip label={item.label} color="primary" onDelete={() => handleDelete(item)} sx={{mr: 1, mb: 1}} />
                    ))}
                </Box>
                <Box sx={{ mt: {xs: 1, sm:0}}}>
                    <Button
                    size="small"
                    sx={{ ml: 1 }}
                    variant="outlined"
                    startIcon={<CloseIcon />}
                    onClick={handleReset}>
                    Reset
                    </Button>
                    <Button
                    size="small"
                    sx={{ ml: 1 }}
                    variant="contained"
                    startIcon={<FilterAltIcon />}
                    onClick={() => {
                        setFilterDialog(true);
                      }}>
                        Filter
                    </Button>
                    {filterDialog && <FilterModal 
                    open={filterDialog}
                    handleClose={handleCloseFilterDialog} />}
                </Box>
            </Box>
            <ProjectList headcells={headcells} projectDetails={projectDetails} />
            <Card sx={{ p: 2, mt: 2}}>
                <Box>
                    <Typography variant="body1" sx={{ mb: 1}}>While Selling / Buying</Typography>
                    <Typography variant="body1">Exploring (+10%), Anytime, Urgent (-10%)</Typography>
                </Box>
            </Card>
        </Container>
    </Box>
  )
}

export default ProjectDetails