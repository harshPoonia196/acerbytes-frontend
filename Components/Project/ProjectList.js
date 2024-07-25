import React, {useState} from 'react'
import {Table,
    Tooltip,
    IconButton,
    Menu,
    MenuItem,
    Chip,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import {
    formatAmount,
    formatNumber,
    formatNumberWithCommas
  } from "utills/CommonFunction";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LaunchIcon from '@mui/icons-material/Launch';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SellIcon from '@mui/icons-material/Sell';

const ProjectList = ({headcells, projectDetails, handleSellPropertyList}) => {
    const [anchorActionEl, setActionAnchorEl] = useState(null);
    const openAction = Boolean(anchorActionEl);
    const handleActionClick = (event) => {
        setActionAnchorEl(event.currentTarget);
    };
    const handleActionClose = () => {
        setActionAnchorEl(null);
    };

  return (
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
                <TableCell>
                    <Link href="#" style={{ textDecoration: 'none', color: 'blue', textTransform: 'uppercase', fontWeight: 'bold'}}>{row.projectName}</Link> <a href="#" target='_blank' style={{position: 'relative', top: '2px', color: 'blue'}}><LaunchIcon fontSize='12px'/></a> <Tooltip title="great deal!"><AutoAwesomeIcon fontSize='12px' style={{position: 'relative', top: '2px', color: 'green'}}/></Tooltip>
                </TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.av_units} units</TableCell>
                <TableCell><CurrencyRupeeIcon sx={{fontSize: '11px', position: 'relative', top: '1px'}}/>{formatNumberWithCommas(row.min)} Cr - <CurrencyRupeeIcon sx={{fontSize: '11px', position: 'relative', top: '1px'}}/>{formatNumberWithCommas(row.max)} Cr</TableCell>
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
                        <MenuItem onClick={handleSellPropertyList}>
                            <ListItemIcon>
                                <SellIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Sell Property</ListItemText>
                         </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <ShoppingBasketIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Buy Property</ListItemText>
                         </MenuItem>
                        </Menu>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default ProjectList