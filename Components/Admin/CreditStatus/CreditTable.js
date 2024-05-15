"use client";

import {
  Card,
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
  Container,
  Typography,
  Grid
} from "@mui/material";

import {
  formatDate,
  formatPoints,
  getApprovedDiscountPercentage,
  objectToQueryString,
  getComparator,
  stableSort,
  formatAmount,
} from "utills/CommonFunction";
import { useAuth } from "utills/AuthContext";
import { useSnackbar } from "utills/SnackbarContext";
import { completeOrderRequest, getCreditPointStatusList } from "api/Admin.api";
import Loading from "Components/CommonLayouts/Loading";
import {
  DEBOUNCE_TIMER,
  PAGINATION_LIMIT,
  PAGINATION_LIMIT_OPTIONS,
} from "utills/Constants";
import { Add } from "@mui/icons-material";
import AdminCreditPointsPopup from "../CreditPointPopup/CreditPointPopup";
import React from "react";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import { debounce } from "lodash";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import NoDataCard from "Components/CommonLayouts/CommonDataCard";
import { ORDER_STATUS, ToasterMessages } from "utills/Constants";
import { countryCodeFormating } from "utills/utills";
import InfoBox from "Components/CommonLayouts/CommonHeader";

const headCells = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "consultant_id",
    label: "Consultant ID",
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

function RowStructure({ row, adminAssignPointsHandler }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openAddCreditPoints, setOpenAddCreditPoints] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePopuChange = (value) => {
    setOpenAddCreditPoints(value);
    handleClose();
  };

  return (
    <>
      <AdminCreditPointsPopup
        open={openAddCreditPoints}
        brokerId={row?.brokerDetails?._id}
        handleClose={() => handlePopuChange(false)}
        handleSubmit={adminAssignPointsHandler}
      />
      <TableRow
        key={row._id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell>
          {row?.brokerDetails?.name?.firstName}{" "}
          {row?.brokerDetails?.name?.lastName}
        </TableCell>
        <TableCell>{row?.consultant_id}</TableCell>
        <TableCell>
          {countryCodeFormating(row?.brokerDetails?.phone?.countryCode)}{" "}
          {row?.brokerDetails?.phone?.number}
        </TableCell>
        <TableCell>{formatDate(row.createdAt)}</TableCell>
        <TableCell>{formatPoints(row.newPoints)}</TableCell>
        <TableCell>{formatPoints(row.openingPoints)}</TableCell>
        <TableCell>{formatPoints(row.consumedPoints)}</TableCell>
        <TableCell>{formatAmount(row?.brokerBalance?.balance || 0)}</TableCell>
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
            <MoreVertIcon fontSize="1rem" />
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
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={() => handlePopuChange(true)}>
            Assign points
          </MenuItem>
        </Menu>
      </TableRow>
    </>
  );
}

function CreditTable({ onDashboardDataUpdate, dashboardInfo }) {
  const { userDetails } = useAuth();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(PAGINATION_LIMIT);
  const [page, setPage] = React.useState(1);
  const [initialMount, setInitialMount] = React.useState(true);
  const [isLoading, setLoading] = React.useState(false);
  const [creditPointList, setCreditPointList] = React.useState({});
  const [openAddCreditPoints, setOpenAddCreditPoints] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const debouncedSearch = debounce(performSearch, DEBOUNCE_TIMER); // Adjust the debounce delay as needed
  const { openSnackbar } = useSnackbar();

  const showToaterMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  function performSearch() {
    const pageOptions = {
      pageLimit: rowsPerPage,
      page: page,
    };
    getCreditPointList(pageOptions, searchTerm);
  }

  React.useEffect(() => {
    // This block will run only on initial mount
    if (initialMount) {
      setInitialMount(false);
      return;
    }

    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [userDetails && Object.keys(userDetails).length, searchTerm, initialMount]);

  const getCreditPointList = async (queryParams, searchTerms = searchTerm) => {
    try {
      setLoading(true);
      const response = await getCreditPointStatusList(
        objectToQueryString({
          ...queryParams,
          firstName: searchTerms,
          lastName: searchTerms,
        })
      );
      if (response.status == 200) {
        setCreditPointList({
          list: response?.data?.data,
          totalCount: response?.data?.totalCount,
          totalPages: response?.data?.totalPages,
          nextPage: response?.data?.nextPage,
          prevPage: response?.data?.prevPage,
        });
        onDashboardDataUpdate({
          countInfo: { count: response?.data?.totalCount } || {},
          userDetails
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
    const page = newPage + 1;
    setPage(page);
    const pageOptions = {
      pageLimit: rowsPerPage,
      page,
    };
    getCreditPointList(pageOptions);
  };

  const handleChangeRowsPerPage = (event) => {
    const pageLimit = parseInt(event.target.value, 10);
    setRowsPerPage(pageLimit);
    setPage(1);
    const pageOptions = {
      pageLimit,
      page: 1,
    };
    getCreditPointList(pageOptions);
  };

  const handleCloseAddCreditPopup = () => {
    setOpenAddCreditPoints(false);
  };

  const adminAssignPointsHandler = ({
    approvedPayment,
    approvedPoints,
    salesPerson,
    brokerGoogleID,
    orderNumber,
  }) => {
    const payload = {
      adminGoogleID: userDetails?.googleID,
      status: ORDER_STATUS.COMPLETED,
      orderNumber: orderNumber,
      points: approvedPoints,
      brokerGoogleID: brokerGoogleID,
      approvedDiscount: getApprovedDiscountPercentage(
        approvedPoints,
        approvedPayment
      )
        .toFixed(2)
        .toString(),
      approvedPayment: approvedPayment,
      approvedPoints: approvedPoints,
      salesPerson,
    };
    handleOrderRequest(payload);
  };

  const handleOrderRequest = async (payload) => {
    try {
      setLoading(true);
      const response = await completeOrderRequest(payload);
      if (response.status == 200) {
        showToaterMessages(ToasterMessages.ORDER_COMPLETED_SUCCESS, "success");
        getCreditPointList({
          pageLimit: rowsPerPage,
          page,
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
      handleCloseAddCreditPopup();
    }
  };

  return <Box sx={{ width: "100%" }}>
    <InfoBox label='Credit points status'
      button={<CustomButton
        variant="contained"
        onClick={() => setOpenAddCreditPoints(true)}
        startIcon={<Add />}
        ButtonText={"Credit points"}
      />}
      dataList={[{ label: 'Paid Consultants', value: dashboardInfo.count }]}
    />

    <Container>
      {isLoading && <Loading />}

      <AdminCreditPointsPopup
        open={openAddCreditPoints}
        handleClose={handleCloseAddCreditPopup}
        handleSubmit={adminAssignPointsHandler}
      />

      <Card sx={{ mb: 2 }}>
        <CustomSearchInput
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Card>
      {
        creditPointList?.list?.length > 0 ? (<TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {creditPointList?.list?.map((row) => (
                <RowStructure
                  row={row}
                  key={row.firstName}
                  adminAssignPointsHandler={adminAssignPointsHandler}
                />
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={PAGINATION_LIMIT_OPTIONS}
            component="div"
            count={creditPointList.totalCount}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>) : <NoDataCard title={"No data found"} />
      }
    </Container>
  </Box>
}

export default CreditTable;
