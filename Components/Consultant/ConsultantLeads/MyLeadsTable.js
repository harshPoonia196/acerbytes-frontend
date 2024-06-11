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
  Grid,
  Card,
  Button,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { capitalLizeName, getComparator, stableSort, formatNumberWithCommas } from "utills/CommonFunction";
import UpdateLeadStatus from "./Modal/UpdateLeadStatus";
import { useSnackbar } from "utills/SnackbarContext";
import { useQueries } from "utills/ReactQueryContext";
import { getBrokerLeads } from "api/Broker.api";
import { LINK, PAGINATION_LIMIT, PAGINATION_LIMIT_OPTIONS, reactQueryKey } from "utills/Constants";
import Loader from "Components/CommonLayouts/Loading";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import NoDataCard from "Components/CommonLayouts/CommonDataCard";
import { countryCodeFormating } from "utills/utills";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import LinkIcon from '@mui/icons-material/Link';
import moment from "moment";
import VisibilityIcon from '@mui/icons-material/Visibility';
import SuggesredLeadsDetails from "../ConsultantSuggestedLeads/Modal/SuggesredLeadsDetails";



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
  // {
  //   id: "currentStatus",
  //   label: "Current Status",
  // },
  // {
  //   id: "nextStatus",
  //   label: "Next Status",
  // },
  {
    id: "phone",
    label: "phone",
  },
  // {
  //   id: "numberVerified",
  //   label: "Number Verified",
  // },
  {
    id: "email",
    label: "email",
  },
  // {
  //   id: "role",
  //   label: "role",
  // },
  {
    id: "maxBudget",
    label: "max Budget",
  },
  {
    id: "source",
    label: "Source",
  },
  {
    id: "property",
    label: "Property",
  },
  {
    id: "propertyCity",
    label: "Property city",
  },
  {
    id: "userDetails",
    label: "User Details",
  },
  {
    id: "enquired",
    label: "Enquired  date",
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
          // sx={{ fontWeight: 900 }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="caption" sx={{ textTransform: "capitalize", fontWeight: "bold", fontSize: "12px" }}>
                {(headCell.label)}
              </Typography>

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

function RowStructure({ row, handlePropertyView, setViewLeadsDetails, setSelectedRowData }) {
  const user = row?.user || {};
  const userDetail = row?.userDetail || {};
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
      hover
      key={row?._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f5f5f5"; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
    >
      <UpdateLeadStatus
        open={openUpdatePopup}
        handleClose={handleCloseUpdatePopup}
        isUserSelected
      />
      <TableCell>{(row?.fullName)}</TableCell>
      {/* <TableCell>
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
      </TableCell> */}
      <TableCell>
        {row.phone?.countryCode && row.phone?.number && (
          <a
            href={`https://www.phonepe.com/how-to-pay/pay-by-phonepe/web/`} // Prevent default link behavior
            onClick={(e) => {
              e.preventDefault();
              handlePhonePeRedirect(`${row.phone?.countryCode}${row.phone?.number}`);
            }}
            style={{ textDecoration: 'none' }}
          >
            {countryCodeFormating(row.phone?.countryCode)} {row.phone?.number}
          </a>
        )}
        {row.isVerified ? (
          <CheckCircleIcon sx={{ verticalAlign: 'middle', position: 'relative', top: "-1px", left: "2px" }} fontSize="1rem" color="success" />
        ) : (
          <UnpublishedIcon sx={{ verticalAlign: 'middle', position: 'relative', top: "-1px", left: "2px" }} fontSize="1rem" color="error" />
        )}
      </TableCell>
      {/* <TableCell>
        {countryCodeFormating(row.phone?.countryCode)} {row.phone?.number}
      </TableCell>
      <TableCell>
        {row.isVerified ? "Yes" : "No"}
      </TableCell> */}
      <TableCell>
        {user.email || "-"}
        {/* {row.email} */}
        {/* ({row.emailVerified ? "Yes" : "No"}) */}
      </TableCell>
      {/* <TableCell>{user.role}</TableCell> */}
      {/* <TableCell>{row?.property?.unitsPlan?.[0]?.bsp || ""}</TableCell> */}
      <TableCell>{userDetail?.budget?.maximumBudget?.value ? `₹${formatNumberWithCommas(userDetail?.budget?.maximumBudget?.value)}` : "-"}</TableCell>
      {/* <TableCell>
        <Chip
          label={row.notesUpdated}
          size="small"
          onClick={handleOpenUpdatePopup}
        />
      </TableCell> */}
      <TableCell>{row.source}</TableCell>
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
             <LinkIcon sx={{ fontSize: "17px", position: "relative", top: "4px"}} fontSize="small"/> {row?.property?.overview?.projectName ?
              `${capitalLizeName(row?.property?.overview?.builder)}.${capitalLizeName(row?.property?.overview?.projectName)}`
              : "-"}
          </a>
        )}
      </TableCell>

      <TableCell>{row?.property?.location?.city}</TableCell>

      <TableCell> 
        {
          row?.userDetail && <IconButton
          sx={{ fontSize: "1rem !important" }}
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={() => {
            setSelectedRowData(row);
            setViewLeadsDetails(true);
          }}
          size="small"
        >
          <VisibilityIcon fontSize="1rem" />
        </IconButton>
        }
      </TableCell>
      <TableCell>
        {moment(row.createdAt).format("DD/MM/YY hh:ss A")}
      </TableCell>

    </TableRow>
  );
}

function MyLeadsTable({ setLeadsCount }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [rows, setRows] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const firstLoad = React.useRef(true);
  const [search, setSearch] = React.useState("");
  const [selectedRowData, setSelectedRowData] = React.useState({});
  const [viewLeadsDetails, setViewLeadsDetails] = useState(false);

  const { openSnackbar } = useSnackbar();

  const handleCloseViewLeadsDetails = () => {
    setViewLeadsDetails(false)
  }


  const { data, isLoading, error, refetch } = useQueries(
    [search, reactQueryKey.broker.myLeads],
    async () => {
      try {
        const response = await getBrokerLeads({ limit: rowsPerPage, page, search });
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
    setLeadsCount(data?.leadsCount || 0);
  }, [data]);

  React.useEffect(() => {
    if (!firstLoad.current) {
      refetch();
    }
    firstLoad.current = false;
  }, [rowsPerPage, page]);

  React.useEffect(() => {
    refetch();
  }, []);

  const handleSearch = (e) => {
    e.persist();
    setSearch(e.target.value);
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
                {rows.map((row) => {
                  const { adId = null, brokerId = null, userId = null } = row;
                  if (adId && !!brokerId?.length && userId) {
                    row.source = LINK.unique;
                  } else if (!adId && !!brokerId?.length && userId) {
                    row.source = LINK.consultant;
                  } else if (!adId && !brokerId?.length && userId) {
                    row.source = LINK.acrebytes;
                  }
                  return <RowStructure
                    setViewLeadsDetails={setViewLeadsDetails}
                    setSelectedRowData={setSelectedRowData}
                    row={row} key={row?._id} handlePropertyView={handlePropertyView} />
                }
                )}
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

      {viewLeadsDetails && (
        <SuggesredLeadsDetails
          open={viewLeadsDetails}
          handleClose={handleCloseViewLeadsDetails}
          selectedRowData={selectedRowData}
        />
      )}

    </>
  );
}

export default MyLeadsTable;