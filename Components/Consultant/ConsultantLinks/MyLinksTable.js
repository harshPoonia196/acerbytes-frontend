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
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { visuallyHidden } from "@mui/utils";
import { getComparator, stableSort } from "utills/CommonFunction";
import NoDataCard from "Components/CommonLayouts/CommonDataCard";
import { getAllActiveAd } from "api/consultant.api";
import Loader from "Components/CommonLayouts/Loading";
import { useSnackbar } from "utills/SnackbarContext";

const rows = [
  {
    consultantName: "Anand Gupta",
    phone: "1234567558",
    propertyType: "Residency",
    propertyName: "New Oak",
    link: "abc.com",
    status: "Active",
    validFrom: "13-Dec-23",
    validTo: "13-Dec-24",
    expiresIn: "2 Days",
  },
  {
    consultantName: "Anand Gupta",
    phone: "1234567558",
    propertyType: "Residency",
    propertyName: "New Oak",
    link: "abc.com",
    status: "Expired",
    validFrom: "13-Dec-23",
    validTo: "13-Dec-24",
    expiresIn: "2 Days",
  },
  {
    consultantName: "Anand Gupta",
    phone: "1234567558",
    propertyType: "Residency",
    propertyName: "New Oak",
    link: "abc.com",
    status: "Expiring soon",
    validFrom: "13-Dec-23",
    validTo: "13-Dec-24",
    expiresIn: "2 Days",
  },
];

const headCells = [
  {
    id: "consultantName",
    label: "Consultant name",
  },
  {
    id: "phone",
    label: "Phone",
  },
  {
    id: "propertyType",
    label: "Property type",
  },
  {
    id: "propertyName",
    label: "Property name",
  },
  {
    id: "link",
    label: "Link",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "validFrom",
    label: "Valid from",
  },
  {
    id: "validTo",
    label: "Valid to",
  },
  {
    id: "expiresIn",
    label: "Expires In",
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
  const [anchorEl, setAnchorEl] = useState(null);
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
      <TableCell>{row.consultantName}</TableCell>
      <TableCell>{row.phone}</TableCell>
      <TableCell>{row.propertyType}</TableCell>
      <TableCell>{row.propertyName}</TableCell>
      <TableCell sx={{ py: 0 }}>
        <Tooltip title="Copy">
          <IconButton sx={{ fontSize: "1rem !important" }}>
            <ContentCopyIcon fontSize="1rem" />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Chip
          label={row.status}
          size="small"
          onClick={() => { }}
          color={
            row.status === "Active"
              ? "success"
              : row.status === "Expired"
                ? "error"
                : "warning"
          }
        />
      </TableCell>
      <TableCell>{row.validFrom}</TableCell>
      <TableCell>{row.validTo}</TableCell>
      <TableCell>{row.expiresIn}</TableCell>
      <TableCell sx={{ py: 0 }}>
        <IconButton onClick={handleClick} sx={{ fontSize: "1rem !important" }}>
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
        >
          <MenuItem onClick={handleClose}>Deactivate</MenuItem>
          <MenuItem onClick={handleClose}>Publish</MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
}

function MyLinksTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isLoading, setLoading] = useState(false);
  const [activeAdData, setActiveAdData] = useState([]);

  let transformData = (data) => {
    return data?.map((item) => ({
      id: item?._id,
      // consultantName: item.overview?.builder,
      // phone: item.overview?.projectName,
      propertyType: item.propertyData?.overview?.projectCategory,
      propertyName: item.propertyData?.overview?.projectName,
      // link: item.location?.sector,
      status: item?.status,
      // validFrom: item?.modifiedAt,
      // validTo: item?.published
      // expiresIn: item?.published
    }));
  };


  const { openSnackbar } = useSnackbar();

  const showToaterMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  const getAlllActiveAdList = async (pageOptions) => {
    try {
      setLoading(true);
      const querParams = {
        ...pageOptions,
        // ...(searchTerm ? { search: searchTerm } : {}),
      };
      let res = await getAllActiveAd(querParams);
      if (res.status === 200) {
        let transformedData = transformData(res?.data?.data || []);
        setActiveAdData(transformedData);
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
        error?.message ||
        "Error fetching state list",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAlllActiveAdList()
  }, [])

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
    <>
      {isLoading && <Loader />}
      {
        activeAdData?.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {activeAdData?.map((row) => (
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
              count={activeAdData?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        ) : <NoDataCard title={"No data found"} />
      }
    </>
  );
}

export default MyLinksTable;
