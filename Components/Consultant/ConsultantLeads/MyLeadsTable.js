"use client";

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
  Tooltip,
  IconButton,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { getComparator, stableSort } from "utills/CommonFunction";
import UpdateLeadStatus from "./Modal/UpdateLeadStatus";
import { useSnackbar } from "utills/SnackbarContext";
import { useQueries } from "utills/ReactQueryContext";
import { getBrokerLeads } from "api/Broker.api";
import { reactQueryKey } from "utills/Constants";

// const rows = [
//   {
//     name: "Anand Gupta",
//     city: "Mumbai",
//     phone: "+91 1234567558",
//     phoneVerified: true,
//     email: "anand@gmail.com",
//     emailVerified: true,
//     role: "Investor",
//     maxBudget: 12000,
//     currentStatus: "Pending",
//     nextStatus: "Pending",
//     notesUpdated: "12th Nov 2018, 09:18 AM",
//   },
// ];

const headCells = [
  {
    id: "Name",
    label: "Name",
  },
  {
    id: "city",
    label: "city",
  },
  {
    id: "currentStatus",
    label: "Current Status",
  },
  {
    id: "nextStatus",
    label: "Next Status",
  },
  {
    id: "phone",
    label: "phone",
  },
  {
    id: "email",
    label: "email",
  },
  {
    id: "role",
    label: "role",
  },
  {
    id: "maxBudget",
    label: "max Budget",
  },
  {
    id: "notesUpdated",
    label: "Notes updated",
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
      </TableRow>
    </TableHead>
  );
}

function RowStructure({ row }) {
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const handleOpenUpdatePopup = () => {
    setOpenUpdatePopup(true);
  };

  const handleCloseUpdatePopup = () => {
    setOpenUpdatePopup(false);
  };

  const [anchorElCurrrent, setAnchorElCurrent] = React.useState(null);
  const openCurrent = Boolean(anchorElCurrrent);
  const handleClickCurrent = (event) => {
    setAnchorElCurrent(event.currentTarget);
  };
  const handleCloseCurrent = () => {
    setAnchorElCurrent(null);
  };

  const [anchorElNext, setAnchorElNext] = React.useState(null);
  const openNext = Boolean(anchorElNext);
  const handleClickNext = (event) => {
    setAnchorElNext(event.currentTarget);
  };
  const handleCloseNext = () => {
    setAnchorElNext(null);
  };

  return (
    <TableRow
      key={row?._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <UpdateLeadStatus
        open={openUpdatePopup}
        handleClose={handleCloseUpdatePopup}
        isUserSelected
      />
      <TableCell>{row?.fullName}</TableCell>
      <TableCell>{row?.property?.location?.city}</TableCell>
      <TableCell>
        <Chip
          label={row.currentStatus}
          onClick={handleClickCurrent}
          size="small"
        />
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorElCurrrent}
          open={openCurrent}
          onClose={handleCloseCurrent}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleOpenUpdatePopup}>Profile</MenuItem>
          <MenuItem onClick={handleOpenUpdatePopup}>My account</MenuItem>
          <MenuItem onClick={handleOpenUpdatePopup}>Logout</MenuItem>
        </Menu>
      </TableCell>
      <TableCell>
        <Chip label={row.nextStatus} onClick={handleClickNext} size="small" />
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorElNext}
          open={openNext}
          onClose={handleCloseNext}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleOpenUpdatePopup}>Profile</MenuItem>
          <MenuItem onClick={handleOpenUpdatePopup}>My account</MenuItem>
          <MenuItem onClick={handleOpenUpdatePopup}>Logout</MenuItem>
        </Menu>
      </TableCell>
      <TableCell>
        {row.phone?.number}({row.phoneVerified ? "Yes" : "No"})
      </TableCell>
      <TableCell>
        {row.email}({row.emailVerified ? "Yes" : "No"})
      </TableCell>
      <TableCell>{row.role}</TableCell>
      <TableCell>{row?.property?.unitsPlan?.[0]?.bsp || ""}</TableCell>
      <TableCell>
        <Chip
          label={row.notesUpdated}
          size="small"
          onClick={handleOpenUpdatePopup}
        />
      </TableCell>
    </TableRow>
  );
}

function MyLeadsTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const firstLoad = React.useRef(true);

  const { openSnackbar } = useSnackbar();

  const { data, isLoading, error, refetch } = useQueries(
    [reactQueryKey.broker.myLeads],
    async () => {
      try {
        const response = await getBrokerLeads({ limit: rowsPerPage, page });
        if (response.status == 200) {
          const { success, data, message } = response.data;
          if (success) {
            return data;
          } else {
            openSnackbar(message, "error");
          }
        }
      } catch (error) {
        openSnackbar(
          error?.response?.data?.message ||
            error?.message ||
            "Something went wrong!",
          "error"
        );
        return error;
      }
    }
  );
  console.log("DATA: ", data);

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

  React.useEffect(() => {
    setRows(data?.data || []);
    setTotalCount(data?.totalCount || 0);
  }, [data]);

  React.useEffect(() => {
    if (!firstLoad.current) {
      refetch();
    }
    firstLoad.current = false;
  }, [rowsPerPage, page]);

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
            <RowStructure row={row} key={row.firstName} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

export default MyLeadsTable;
