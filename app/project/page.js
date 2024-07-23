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
    Tooltip,
    IconButton,
    Menu,
    MenuItem,
    Avatar 
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
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import {
    formatPoints,
    formatAmount,
    formatNumber,
    formatNumberWithCommas
  } from "utills/CommonFunction";
import Link from 'next/link';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import CloseIcon from '@mui/icons-material/Close';
import FilterModal from 'Components/Project/FilterModal';

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

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
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

    const [anchorActionEl, setActionAnchorEl] = useState(null);
    const openAction = Boolean(anchorActionEl);
    const handleActionClick = (event) => {
        setActionAnchorEl(event.currentTarget);
    };
    const handleActionClose = () => {
        setActionAnchorEl(null);
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

  return (
    <Box>
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
                            <Typography variant="body1">available for <strong>Sale</strong> @ {formatAmount(9221)}/sqft <Typography variant="body2" color="primary" component="span"> (<NorthIcon fontSize='12px' sx={{position: 'relative', top: '2px'}}/> higher than last 30 deals)</Typography></Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography
                            variant="h3"
                            sx={{ alignSelf: "center", textTransform: "capitalize", mb: "5px" }}
                            >
                            234 units
                            </Typography>
                            <Typography variant="body1">available for <strong>Sale</strong> @ {formatAmount(9221)}/sqft <Typography variant="body2" color="primary" component="span">(<SouthIcon fontSize='12px' sx={{position: 'relative', top: '2px'}} /> lower than last 30 deals)</Typography></Typography>
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
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2}}>
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
                        34 hyper local property dealers
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2, height: '100%'}}>
                        <Typography
                        variant="h3"
                        sx={{ textAlign: { sm: 'left', md: 'right'} }}
                        >
                        2,342 Buying enquiries*
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
            <Box sx={{ py: 2.5, display: 'flex', justifyContent: 'space-between'}}>
                <Box>
                    <Chip label="Filter 1" color="primary" onDelete={handleDelete} sx={{mr: 1}} />
                    <Chip label="Filter 2" color="primary" onDelete={handleDelete} sx={{mr: 1}} />
                    <Chip label="Filter 3" color="primary" onDelete={handleDelete} sx={{mr: 1}} />
                </Box>
                <Box>
                    <Button
                    size="small"
                    sx={{ ml: 1 }}
                    variant="outlined"
                    startIcon={<CloseIcon />}>
                    Reset
                    </Button>
                    <Button
                    size="small"
                    sx={{ ml: 1 }}
                    variant="contained"
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
            <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className="projectTable">
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
                            <TableCell>
                                <Link href="" style={{ textDecoration: 'none'}}>{row.projectName}</Link> <a href="" target='_blank' style={{position: 'relative', top: '2px'}}><InsertLinkIcon fontSize='12px'/></a> <Tooltip title="great deal!"><AutoAwesomeIcon fontSize='12px' style={{position: 'relative', top: '2px', color: 'green'}}/></Tooltip>
                            </TableCell>
                            <TableCell>{row.category}</TableCell>
                            <TableCell>{row.av_units} units</TableCell>
                            <TableCell>{formatNumberWithCommas(row.min)} Cr</TableCell>
                            <TableCell>{formatNumberWithCommas(row.max)} Cr</TableCell>
                            <TableCell>{formatAmount(row.asking_rate)}/sqft</TableCell>
                            <TableCell>{row.specs.map(spec => (
                                <Chip label={spec} size='small' sx={{mr: 1}}/>
                            ))}</TableCell>
                            <TableCell>{row.unitType}</TableCell>
                            <TableCell>{row.Ab_rating}</TableCell>
                            <TableCell>
                            <Tooltip title="More">
                                <IconButton
                                onClick={handleActionClick}
                                sx={{ fontSize: "1rem !important" }}
                                >
                                <MoreVertIcon fontSize="1rem" />
                                </IconButton>
                                </Tooltip>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorActionEl}
                                    open={openAction}
                                    onClose={handleActionClose}
                                    MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                    }}
                                    transformOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left",
                                    }}
                                    sx={{
                                        '& .MuiList-root': {
                                        padding: '0px',
                                        },
                                    }}
                                    >
                                    <MenuItem>Edit </MenuItem>
                                    <MenuItem>Delete </MenuItem>
                                    </Menu>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
            </TableContainer>
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