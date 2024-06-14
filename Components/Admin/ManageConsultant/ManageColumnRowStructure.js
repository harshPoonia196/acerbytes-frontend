import {
  TableRow,
  TableCell,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip
} from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { listOfPages } from "Components/NavBar/Links";
import EditIcon from '@mui/icons-material/Edit';
import {formatNumberWithCommas} from 'utills/CommonFunction';

function RowStructure({ row, router }) {

  const [anchorEl, setAnchorEl] = useState(null),
    open = Boolean(anchorEl),

    handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    },

    handleClose = () => {
      setAnchorEl(null);
    },

    editProfile = (googleID) => {
      router.push(listOfPages.adminUpdateConsultantProfileLinks + `/${googleID}`);
      handleClose();
    },

    numberFormat = (value) =>
      new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(value);


  return (
    <>
      <TableRow
        hover
        key={row.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f5f5f5"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
      >
        <TableCell>{row?.name.firstName} {row?.name.lastName}</TableCell>
        <TableCell>{row?.brokerId}</TableCell>
        <TableCell>{row?.serviceDetails?.company || ''}</TableCell>
        <TableCell>{`${(row?.phone?.countryCode) ? '+' + row?.phone?.countryCode : ''}${row?.phone?.number}`}</TableCell>
        <TableCell>{row?.serviceDetails?.reraNumber || ''}</TableCell>
        <TableCell align="right">{row?.totalLinks || 0}</TableCell>
        <TableCell align="right">{formatNumberWithCommas(row?.brokerBalance?.balance || 0)}</TableCell>
        <TableCell>
        <Tooltip title="More">
          <IconButton
            onClick={handleClick}
            sx={{ fontSize: "1rem !important" }}
          >
            <MoreVertIcon fontSize="1rem" />
          </IconButton>
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
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
            <MenuItem onClick={() => editProfile(row?.brokerBalance?.googleID)} >
            <ListItemIcon><EditIcon fontSize="small"/></ListItemIcon> Edit Profile
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
    </>
  );
}

export default RowStructure;