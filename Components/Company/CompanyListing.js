import React, {useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
    Box,
    Tooltip,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    ListItemText
  } from "@mui/material";
import Link from 'next/link'
import MoreVertIcon from "@mui/icons-material/MoreVert";

const headcells = [
  {
      id: 'av_units',
      label: 'Av units'
  },
  {
      id: 'project',
      label: 'Company'
  },
  {
      id: 'category',
      label: 'Category'
  },
  {
      id: 'price',
      label: 'Price'
  },
  {
      id: 'asking_rate',
      label: '@ Rate'
  },
  {
      id: 'specs',
      label: 'Layouts'
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
      specs: ['2BHK - 23', '3BHK - 22'],
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
      specs: ['2BHK - 23'],
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
      specs: ['2BHK - 23', '3BHK - 22'],
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
      specs: ['2BHK - 23', '3BHK - 22'],
      Ab_rating: 'Very good'
  },
]

const CompanyListing = () => {

  const [anchorActionEl, setActionAnchorEl] = useState(null);
    const openAction = Boolean(anchorActionEl);
    const handleActionClick = (event) => {
        setActionAnchorEl(event.currentTarget);
    };
    const handleActionClose = () => {
        setActionAnchorEl(null);
    };


  return (
    <>
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
                <TableCell><span className='unitsBadge'>{row.av_units} units</span></TableCell>
                <TableCell>
                <Link href="#" style={{ textDecoration: 'none', color: '#276ef1', textTransform: 'uppercase', fontWeight: 'bold'}}>{row.projectName}</Link>
                </TableCell>
                <TableCell>{row.category}</TableCell>
                
                <TableCell>gsgsgsg</TableCell>
                <TableCell>55sqft</TableCell>
                <TableCell>{row.specs.map(spec => (
                    <Chip label={spec} size='small' sx={{mr: 1}}/>
                ))}</TableCell>
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
                        <MenuItem>
                            <ListItemText>Company</ListItemText>
                         </MenuItem>
                        </Menu>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
    </>
  )
}

export default CompanyListing