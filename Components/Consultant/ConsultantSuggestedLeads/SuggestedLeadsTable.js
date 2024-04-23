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
  Grid,
  Card,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { capitalLizeName, getComparator, stableSort } from "utills/CommonFunction";
import { useSnackbar } from "utills/SnackbarContext";
import { useQueries } from "utills/ReactQueryContext";
import {  getBrokerSuggestedLeads } from "api/Broker.api";
import { PAGINATION_LIMIT, PAGINATION_LIMIT_OPTIONS, reactQueryKey } from "utills/Constants";
import Loader from "Components/CommonLayouts/Loading";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import NoDataCard from "Components/CommonLayouts/CommonDataCard";
import { countryCodeFormating } from "utills/utills";
import MoreVertIcon from "@mui/icons-material/MoreVert";


const headCells = [
  {
    id: "Name",
    label: "Name",
  },
  {
    id: "propertyCity",
    label: "Property city",
  },
  {
    id: "phone",
    label: "Phone",
  },
  {
    id: "PropertyLink",
    label: "Property link",
  },
  {
    id: "Leadprice",
    label: "Lead price",
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
      <TableCell>Buy now</TableCell>
      </TableRow>
    </TableHead>
  );
}

function RowStructure({ row, handlePropertyView }) {

  const formatPhoneNumber = (countryCode, number) => {
    if (!number) return "";
    // Mask all digits except the first two
    const maskedNumber = number.slice(0, 2) + number.slice(2).replace(/\d/g, '*');
    return `${countryCodeFormating(countryCode)} ${maskedNumber}`;
  };

  const maskName = (name) => {
    if (!name) return "";
    return `${name.charAt(0)}${'*'.repeat(name.length - 1)}`;
  };

  return (
    <TableRow
      key={row?._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>{capitalLizeName(maskName(row?.fullName))}</TableCell>
      <TableCell>{row?.properties?.location?.city}</TableCell>
      <TableCell>
      {formatPhoneNumber(row.phone?.countryCode, row.phone?.number)}
      </TableCell>
      <TableCell>
        {row.propertyLink && (
          <a
            href={row.propertyLink}
            onClick={(e) => {
              e.preventDefault();
              handlePropertyView(row.propertyLink);
            }}
            style={{ textDecoration: 'none' }}
          >
            {row?.propertyLink ? row?.propertyLink : "-"}
          </a>
        )}
      </TableCell>
      <TableCell>
        {row?.properties?.unitsPlan?.averagePrice}
      </TableCell>
      <TableCell sx={{ py: 0 }}>
          <IconButton
            sx={{ fontSize: "1rem !important" }}
          >
            <MoreVertIcon fontSize="1rem" />
          </IconButton>
        </TableCell>
    </TableRow>
  );
}

function SuggestedLeadsTable({ setLeadsCount }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(PAGINATION_LIMIT);
  const [rows, setRows] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const firstLoad = React.useRef(true);
  const [search, setSearch] = React.useState("");

  const { openSnackbar } = useSnackbar();

  const { data, isLoading, error, refetch } = useQueries(
    [search, reactQueryKey.broker.myLeads],
    async () => {
      try {
        const response = await getBrokerSuggestedLeads({ limit: rowsPerPage, page, search });
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
    setLeadsCount(data?.totalCount || 0);
  }, [data]);

  React.useEffect(() => {
    if (!firstLoad.current) {
      refetch();
    }
    firstLoad.current = false;
  }, [rowsPerPage, page]);

  const handleSearch = (e) => {
    e.persist();
    setSearch(e.target.value);
    setPage(0);
  };

  const handlePropertyView = (link) => {
    const baseUrl = window.location.origin;
    const fullLink = `${baseUrl}/${link}`;
    window.open(fullLink, "_blank");
  }

  return (
    <>
      {isLoading && <Loader />}
      <Grid item xs={12}>
        <Card sx={{ mb: 2 }}>
          <CustomSearchInput value={search} onChange={handleSearch} />
        </Card>
      </Grid>
      {
        rows.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {rows.map((row) => (
                  <RowStructure row={row} key={row.firstName} handlePropertyView={handlePropertyView} />
                ))}
              </TableBody>
            </Table>
            <TablePagination
              sx={{
                overflow: "hidden",
              }}
              rowsPerPageOptions={PAGINATION_LIMIT_OPTIONS}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        ) : <NoDataCard title={"No data found"} />}

    </>
  );
}

export default SuggestedLeadsTable;
