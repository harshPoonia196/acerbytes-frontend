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
  Button,
} from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import {
  getComparator,
  objectToQueryString,
  stableSort,
} from "utills/CommonFunction";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAuth } from "utills/AuthContext";
import { useSnackbar } from "utills/SnackbarContext";
import { getCreditPointStatusList } from "api/Admin.api";
import Loading from 'Components/CommonLayouts/Loading'

const rows = [
  {
    name: "Anand Gupta",
    mobileNumber: "+91 125454544",
    lastTopupDate: "10th April, 2023",
    lastTopupAmount: 18000,
    opening: 5000,
    consumedSoFar: 5000,
    balance: 5000,
  },
];

const headCells = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "mobileNumber",
    label: "Mobile number",
  },
  {
    id: "lastTopupDate",
    label: "Last topup date",
  },
  {
    id: "lastTopupAmount",
    label: "Last topup Points",
  },
  {
    id: "opening",
    label: "Opening",
  },
  {
    id: "consumedSoFar",
    label: "Consumed so far",
  },
  {
    id: "balance",
    label: "Balance",
  },
  {
    id: "action",
    label: "Action",
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableRow
      key={row.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.mobileNumber}</TableCell>
      <TableCell>{row.lastTopupDate}</TableCell>
      <TableCell>{row.lastTopupAmount}</TableCell>
      <TableCell>{row.opening}</TableCell>
      <TableCell>{row.consumedSoFar}</TableCell>
      <TableCell>{row.balance}</TableCell>
      <TableCell>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          size="small"
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </TableCell>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Assign points</MenuItem>
      </Menu>
    </TableRow>
  );
}

function CreditTable() {
  const { userDetails } = useAuth();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [initialMount, setInitialMount] = React.useState(true);
  const [isLoading, setLoading] = React.useState(false);
  const [creditPointList, setCreditPointList] = React.useState({});
  const { openSnackbar } = useSnackbar();

  const showToaterMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  React.useEffect(() => {
    // This block will run only on initial mount
    if (initialMount) {
      setInitialMount(false);
      return;
    }

    if (userDetails && Object.keys(userDetails).length) {
      const pageOptions = {
        pageLimit: rowsPerPage,
        page,
      };
      getCreditPointList(pageOptions);
    }
  }, [userDetails && Object.keys(userDetails).length, initialMount]);

  const getCreditPointList = async (queryParams) => {
    try {
      setLoading(true);
      const response = await getCreditPointStatusList(
        objectToQueryString(queryParams)
      );
      if (response.status == 200) {
        setCreditPointList({
          list: response?.data?.data,
          totalCount: response?.data?.totalCount,
          totalPages: response?.data?.totalPages,
          nextPage: response?.data?.nextPage,
          prevPage: response?.data?.prevPage,
        });
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error creating order request",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };
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

  return isLoading ? (
    <Loading />
  ) : (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {creditPointList?.list?.map((row) => (
            <RowStructure row={row} key={row.firstName} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
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

export default CreditTable;
