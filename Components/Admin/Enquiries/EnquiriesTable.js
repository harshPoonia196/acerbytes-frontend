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
import React from "react";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { getComparator, stableSort } from "utills/CommonFunction";
import { useQueries } from "utills/ReactQueryContext";
import { useSnackbar } from "utills/SnackbarContext";
import { getLeads } from "api/Admin.api";
import { reactQueryKey } from "utills/Constants";
import Loader from "Components/CommonLayouts/Loading";

// const rows = [
//   {
//     firstName: "Anand",
//     lastName: "Gupta",
//     city: "Mumbai",
//     countryCode: "+91",
//     phone: "1234567558",
//     phoneVerified: true,
//     email: "anand@gmail.com",
//     emailVerified: true,
//     role: "Investor",
//     maxBudget: 12000,
//     closedStatus: "Pending",
//     pendingStatus: "Pending",
//     updatedBy: "Anand",
//     lastModified: "12th Nov 2018, 09:18 AM",
//   },
// ];

const headCells = [
  {
    id: "firstName",
    label: "First name",
  },
  {
    id: "lastName",
    label: "last Name",
  },
  {
    id: "city",
    label: "city",
  },
  {
    id: "country Code",
    label: "country Code",
  },
  {
    id: "phone",
    label: "phone",
  },
  {
    id: "phoneVerified",
    label: "phoneVerified",
  },
  {
    id: "email",
    label: "email",
  },
  {
    id: "emailVerified",
    label: "email Verified",
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
    id: "closedStatus",
    label: "closed Status",
  },
  {
    id: "pendingStatus",
    label: "pending Status",
  },
  {
    id: "updatedBy",
    label: "updated By",
  },
  {
    id: "lastModified",
    label: "last Modified",
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
  return (
    <TableRow
      key={row.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>{row?.name?.firstName}</TableCell>
      <TableCell>{row?.name?.lastName}</TableCell>
      <TableCell>{row?.property?.location?.city}</TableCell>
      <TableCell>{row?.phone?.countryCode}</TableCell>
      <TableCell>{row?.phone?.number}</TableCell>
      <TableCell>{row.phoneVerified ? "Yes" : "No"}</TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>{row.emailVerified ? "Yes" : "No"}</TableCell>
      <TableCell>{row.role}</TableCell>
      <TableCell>{row?.property?.unitsPlan?.[0]?.bsp || ""}</TableCell>
      <TableCell>{row.closedStatus}</TableCell>
      <TableCell>{row.pendingStatus}</TableCell>
      <TableCell>{row.updatedBy}</TableCell>
      <TableCell>
        <Chip label={row.lastModified} size="small" />
      </TableCell>
    </TableRow>
  );
}

function EnquiriesTable() {
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
        const response = await getLeads({ limit: rowsPerPage, page });
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
    <>
      {isLoading && <Loader />}
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
          sx={{
            overflow: "hidden",
          }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}

export default EnquiriesTable;
