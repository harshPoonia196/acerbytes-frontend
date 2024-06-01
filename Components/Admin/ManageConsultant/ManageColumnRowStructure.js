import {
  TableRow,
  TableCell,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { listOfPages } from "Components/NavBar/Links";

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
        key={row.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell>{row?.name.firstName}</TableCell>
        <TableCell>{row?.name.lastName}</TableCell>
        <TableCell>{row?.brokerId}</TableCell>
        <TableCell>{row?.serviceDetails?.company || ''}</TableCell>
        <TableCell>{`${(row?.phone?.countryCode) ? '+' + row?.phone?.countryCode : ''}${row?.phone?.number}`}</TableCell>
        <TableCell>{row?.serviceDetails?.reraNumber || ''}</TableCell>
        <TableCell>{row?.totalLinks || 0}</TableCell>
        <TableCell>{numberFormat(row?.brokerBalance?.balance || 0)}</TableCell>
        <TableCell>
          <IconButton
            onClick={handleClick}
            sx={{ fontSize: "1rem !important" }}
          >
            <MoreVertIcon fontSize="1rem" />
          </IconButton>
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
              Edit Profile
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
    </>
  );
}

export default RowStructure;