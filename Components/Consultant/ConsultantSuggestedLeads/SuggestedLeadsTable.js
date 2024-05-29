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
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { capitalLizeName, getComparator, stableSort } from "utills/CommonFunction";
import { useSnackbar } from "utills/SnackbarContext";
import { useQueries } from "utills/ReactQueryContext";
import { buySuggestedLeads, getBrokerBalance, getBrokerSuggestedLeads } from "api/Broker.api";
import { debounce } from "lodash";
import { DEBOUNCE_TIMER, PAGINATION_LIMIT, PAGINATION_LIMIT_OPTIONS } from "utills/Constants";
import Loader from "Components/CommonLayouts/Loading";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import NoDataCard from "Components/CommonLayouts/CommonDataCard";
import { countryCodeFormating } from "utills/utills";
import VisibilityIcon from '@mui/icons-material/Visibility';
import SuggesredLeadsDetails from "./Modal/SuggesredLeadsDetails";
import { useAuth } from "utills/AuthContext";
import colors from "styles/theme/colors";
import { useRouter } from "next/navigation";
import { listOfPages } from "Components/NavBar/Links";


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
    id: "ViewDetails",
    label: "View",
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
          <TableCell sx={{ textTransform: "capitalize" }}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{
                '&:hover .MuiTableSortLabel-icon': {
                  opacity: 0,
                },
                '&.Mui-active .MuiTableSortLabel-icon': {
                  opacity: 0,
                },
              }}
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

function RowStructure({ row, handlePropertyView, setViewLeadsDetails, setSelectedRowData, manageBuyNow }) {
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
      key={row?._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>{row?.fullName}</TableCell>
      <TableCell>{row?.properties?.location?.city}</TableCell>
      <TableCell>
        {`${countryCodeFormating(row.phone?.countryCode)} ${row.phone?.number}`}
      </TableCell>
      <TableCell>
        {row.propertyLink && (
          <a
            href={row.propertyLink}
            onClick={(e) => {
              e.preventDefault();
              handlePropertyView(row.propertyLink);
            }}
            style={{ textDecoration: "none" }}
          >
            {row?.properties?.overview?.projectName ?
              `${capitalLizeName(row?.properties?.overview?.projectName)}`
              : "-"}
          </a>
        )}
      </TableCell>
      <TableCell> <IconButton
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
      </TableCell>
      <TableCell>
        <Button onClick={() => manageBuyNow(row?._id)}>
          Buy Now
        </Button>
      </TableCell>
    </TableRow>
  );
}



function SuggestedLeadsTable({ setLeadsCount }) {
  const router = useRouter();
  const { userDetails, setBrokerPoints } = useAuth();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(PAGINATION_LIMIT);
  const [rows, setRows] = React.useState([]);
  const [selectedRowData, setSelectedRowData] = React.useState({});
  const [totalCount, setTotalCount] = React.useState(0);
  const firstLoad = React.useRef(true);
  const [search, setSearch] = React.useState("");
  const [tempsearch, setTempSearch] = React.useState("");
  const [viewLeadsDetails, setViewLeadsDetails] = useState(false);
  const { openSnackbar } = useSnackbar();
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [buyNowResponseMessage, setBuyNowResponseMessage] = useState("");

  const { data, isLoading, error, refetch } = useQueries([search],
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
    setLeadsCount(data?.suggestedLeadsCount || 0);
  }, [data]);

  React.useEffect(() => {
    if (!firstLoad.current) {
      refetch();
    }
    firstLoad.current = false;
  }, [rowsPerPage, page]);

  React.useEffect(() => {
    const handleSearch = debounce(() => {
      setSearch(tempsearch);
      setPage(0);
    }, DEBOUNCE_TIMER);

    handleSearch();

    return () => {
      handleSearch.cancel();
    };
  }, [tempsearch]);

  const handlePropertyView = (link) => {
    const baseUrl = window.location.origin;
    const fullLink = `${baseUrl}/${link}`;
    window.open(fullLink, "_blank");
  }
  const handleCloseViewLeadsDetails = () => {
    setViewLeadsDetails(false)
  }

  const getBrokerpointBalance = async () => {
    try {
      const response = await getBrokerBalance();
      if (response.status == 200) {
        setBrokerPoints(response?.data?.data?.balance || 0);
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
        error?.message ||
        "Error getbroker balance request",
        "error"
      );
    }
  };

  const manageBuyNow = async (leadId) => {
    try {
      let response = await buySuggestedLeads({ leadId, googleID: userDetails?.googleID });
      if (response.status === 200) {
        setBuyModalOpen(true);
        setBuyNowResponseMessage(response.data.message || "Fetched leads successfully please check my leads");
      }
    } catch (error) {
      setBuyNowResponseMessage(error?.response?.data?.message || error?.message || "Error processing purchase");
      setBuyModalOpen(true);
    }
  };

  const closeBuyResponseModal = () => {
    setBuyModalOpen(false)
    getBrokerpointBalance()
    refetch()
  }

  const handleViewMyLeadClick = () => {
    setBuyModalOpen(false);
    getBrokerpointBalance();
    refetch();
    router.push(listOfPages.consultantMyLeads)
  };

  const BuyResponseModal = () => (
    <Dialog open={buyModalOpen} onClose={closeBuyResponseModal}>
      <DialogContent sx={{ padding: "36px !important", minWidth: "415px" }}>
        <DialogContentText>
          {buyNowResponseMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="h6"
          sx={{
            fontWeight: 600,
            color: "white",
            backgroundColor: colors?.BLACK,
            "&:hover": {
              backgroundColor: colors?.BLACK,
              boxShadow: "none",
            },
          }} onClick={closeBuyResponseModal} color="primary">
          Close
        </Button>
        <Button
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "white",
            backgroundColor: colors?.BLACK,
            "&:hover": {
              backgroundColor: colors?.BLACK,
              boxShadow: "none",
            },
          }}
          onClick={handleViewMyLeadClick}
        >
          View My lead
        </Button>
      </DialogActions>
    </Dialog>
  );


  return (
    <>
      {isLoading && <Loader />}
      <Grid item xs={12}>
        <Card sx={{ mb: 2 }}>
          <CustomSearchInput
            value={tempsearch}
            onChange={(e) => {
              setTempSearch(e.target.value);
            }}
          />
        </Card>
      </Grid>
      {rows.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows.map((row) => (
                <RowStructure
                  row={row}
                  key={row.firstName}
                  handlePropertyView={handlePropertyView}
                  setViewLeadsDetails={setViewLeadsDetails}
                  setSelectedRowData={setSelectedRowData}
                  manageBuyNow={manageBuyNow}
                />
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

      ) : (
        <NoDataCard title={"No data found"} />
      )}
      {viewLeadsDetails && (
        <SuggesredLeadsDetails
          open={viewLeadsDetails}
          handleClose={handleCloseViewLeadsDetails}
          selectedRowData={selectedRowData}
        />
      )}

      <BuyResponseModal />
    </>
  );
}

export default SuggestedLeadsTable;
