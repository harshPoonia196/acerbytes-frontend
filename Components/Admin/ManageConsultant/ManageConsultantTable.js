import {
  Table,
  Box,
  TableBody,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  IconButton,
  Dialog,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";

import { visuallyHidden } from "@mui/utils";
import { getComparator, stableSort } from "utills/CommonFunction";
import AddIcon from "@mui/icons-material/Add";
import AddCreditPopup from "./Modal/AddCreditPopup";

const rows = [
  {
    FirstName: "Anand",
    LastName: "Gupta",
    CompanyName: "ABC Enterprise",
    phone: "1234567558",
    RERANumber: "12344",
    NoOfActiveLinks: "2",
    CreditAmount: "5000",
    status: "Active",
    action: "Add Credit",
  },
  {
    FirstName: "Anand",
    LastName: "Gupta",
    CompanyName: "ABC Enterprise",
    phone: "1234567558",
    RERANumber: "12344",
    NoOfActiveLinks: "2",
    CreditAmount: "5000",
    status: "Active",
    action: "Add Credit",
  },
  {
    FirstName: "Anand",
    LastName: "Gupta",
    CompanyName: "ABC Enterprise",
    phone: "1234567558",
    RERANumber: "12344",
    NoOfActiveLinks: "2",
    CreditAmount: "5000",
    status: "Active",
    action: "Add Credit",
  },
];

const headCells = [
  {
    id: "FirstName",
    label: "First name",
  },
  {
    id: "LastName",
    label: "Last name",
  },
  {
    id: "CompanyName",
    label: "Company name",
  },
  {
    id: "phone",
    label: "Phone",
  },

  {
    id: "RERANumber",
    label: "RERANumber",
  },
  {
    id: "NoOfActiveLinks",
    label: "No of active links",
  },
  {
    id: "CreditAmount",
    label: "Credit amount",
  },
  {
    id: "status",
    label: "Status",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>Action</TableCell>
      </TableRow>
    </TableHead>
  );
}

function RowStructure({ row }) {
  const [openAddCredit, setOpenAddCredit] = useState(false);
  const handleOpenAddCreditPopup = () => {
    setOpenAddCredit(true);
  };

  const handleCloseAddCreditPopup = () => {
    setOpenAddCredit(false);
  };

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
        <TableCell>{row.FirstName}</TableCell>
        <TableCell>{row.LastName}</TableCell>
        <TableCell>{row.CompanyName}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell>{row.RERANumber}</TableCell>
        <TableCell>{row.NoOfActiveLinks}</TableCell>
        <TableCell>{row.CreditAmount}</TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell>
          {row.action === "Add Credit" && (
            <IconButton
              sx={{ fontSize: "1rem !important" }}
              onClick={handleOpenAddCreditPopup}
            >
              <AddIcon fontSize="1rem" />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}

function ManageConsultantTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {rows.map((row) => (
            <RowStructure row={row} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        sx={{
          overflow: "hidden",
        }}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

export default ManageConsultantTable;
