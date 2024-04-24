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
import AddCreditPopup from "./Modal/AddCreditPopup";
import { ROLE_CONSTANTS } from "utills/Constants";

function RowStructure({ row, router, user }) {
  console.log(user, '******************8');
  const [openAddCredit, setOpenAddCredit] = useState(false),
    [anchorEl, setAnchorEl] = useState(null),
    open = Boolean(anchorEl),

    handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    },

    handleClose = () => {
      setAnchorEl(null);
    },

    handleOpenAddCreditPopup = () => {
      handleClose();
      setOpenAddCredit(true);
    },

    handleCloseAddCreditPopup = () => {
      setOpenAddCredit(false);
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
      <AddCreditPopup
        open={openAddCredit}
        handleClose={handleCloseAddCreditPopup}
      />
      <TableRow
        key={row.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell>{row?.name.firstName}</TableCell>
        <TableCell>{row?.name.lastName}</TableCell>
        <TableCell>{row?.serviceDetails?.company || ''}</TableCell>
        <TableCell>{row?.phone?.countryCode + row?.phone?.number}</TableCell>
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
            {
              user?.role === ROLE_CONSTANTS.sales ? null :
                <MenuItem onClick={handleOpenAddCreditPopup}>
                  Add Credit
                </MenuItem>
            }
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