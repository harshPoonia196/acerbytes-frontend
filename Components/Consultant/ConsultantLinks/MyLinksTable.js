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
  Card,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { visuallyHidden } from "@mui/utils";
import { formatDate, getComparator, stableSort } from "utills/CommonFunction";
import NoDataCard from "Components/CommonLayouts/CommonDataCard";
import { getAllActiveAd } from "api/consultant.api";
import Loader from "Components/CommonLayouts/Loading";
import { useSnackbar } from "utills/SnackbarContext";
import { PAGINATION_LIMIT_OPTIONS, PAGINATION_LIMIT } from "utills/Constants";
import CustomSearch from "Components/CommonLayouts/CustomSearch";
import { useAuth } from "utills/AuthContext";


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

  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      console.log('Link copied to clipboard!');
    }, (err) => {
      console.error('Could not copy link: ', err);
    });
  };

  const  calculateDaysRemaining = (expiresAt) =>{
    const currentDate = new Date();
    const expirationDate = new Date(expiresAt);
    
    const differenceInTime = expirationDate - currentDate;
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    
    return differenceInDays;
  }

  const expiresInDisplay = (expiresAt) => {
    const daysRemaining = calculateDaysRemaining(expiresAt);
    if (daysRemaining < 0) {
      return "-";
    } else {
      return `${daysRemaining} Days`;
    }
  };

  return (
    <TableRow
      key={row.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>{row?.consultantName}</TableCell>
      <TableCell>{row?.phone}</TableCell>
      <TableCell>{row?.propertyType}</TableCell>
      <TableCell>{row?.propertyName}</TableCell>
      <TableCell sx={{ py: 0 }}>
        <Tooltip title="Copy">
          <IconButton sx={{ fontSize: "1rem !important" }}
            onClick={() => copyToClipboard(row?.link)}
          >
            <ContentCopyIcon fontSize="1rem"  />
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
      <TableCell>{formatDate(row?.validFrom)}</TableCell>
      <TableCell>{formatDate(row?.validTo)}</TableCell>
      <TableCell>
        {row?.expiresIn ? expiresInDisplay(row.expiresIn) : ""}
      </TableCell>
    </TableRow>
  );
}

function MyLinksTable({ setCount }) {
  let userInfo = JSON.parse(localStorage.getItem("userDetails"));
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(PAGINATION_LIMIT);
  const [isLoading, setLoading] = useState(false);
  const [activeAdData, setActiveAdData] = useState([]);
  const [property, setProperty] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const constructPropertyUrl = (propertyDetailsData) => {
    const overview = propertyDetailsData?.propertyData?.overview;
    const location = propertyDetailsData?.propertyData?.location;
  
    const projectCategory = (overview?.projectCategory.trim() ?? 'category').replace(/\s+/g, '-');
    let projectType;
    if (overview?.projectType?.length > 0) {
      projectType = overview.projectType.map(type => type?.value.trim().replace(/\s+/g, '-')).join("-");
    } else {
      projectType = 'type';
    }
    const city = (location?.city.trim() ?? 'city').replace(/\s+/g, '-');
    const sector = (location?.sector.trim() ?? 'sector').replace(/[\s,]+/g, '-');
    const area = (location?.area.trim() ?? 'area').replace(/[\s,]+/g, '-').replace("-#", '');
    const projectName = (overview?.projectName.trim() ?? 'projectName').replace(/\s+/g, '-');
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;
  
    return `${baseUrl}/${projectCategory}-${projectType}-${city}-${sector}-${area}-${projectName}-${propertyDetailsData._id}`;
  };

  let transformData = (data) => {
    return [...data]?.map((item) => {
      const propertyUrl = constructPropertyUrl(item);
      return {
      id: item?._id,
      consultantName: `${item?.brokerData?.name?.firstName} ${item?.brokerData?.name?.lastName}`,
      phone: `+ ${item?.brokerData?.phone.countryCode} ${item?.brokerData?.phone.number}`,
      propertyType: item.propertyData?.overview?.projectCategory,
      propertyName: item.propertyData?.overview?.projectName,
      link: propertyUrl,
      status: item?.status,
      validFrom: item?.created_at,
      validTo: item?.expired_at,
      expiresIn: item?.expired_at
    };
    });
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const { openSnackbar } = useSnackbar();

  const showToaterMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  const objectToQueryString = (obj) => {
    const queryString = Object.keys(obj)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
      )
      .join("&");

    return queryString;
  };

  const getAlllActiveAdList = async (pageOptions, searchTerm) => {
    try {
      setLoading(true);
      const querParams = {
        ...pageOptions,
        ...(searchTerm ? { search: searchTerm } : {}),
        ...(userInfo?._id ? { brokerId: userInfo._id } : {}),
      };
      let queryString = objectToQueryString(querParams); 
      
      let res = await getAllActiveAd(`${queryString}`);
      if (res.status === 200) {
        let transformedData = transformData(res?.data?.data || []);
        setActiveAdData([...transformedData]);
        setCount(res?.data?.totalCount);
        setProperty(res?.data);
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
    const pageOptions = {
      pageLimit,
      page: currentPage,
    };
    getAlllActiveAdList(pageOptions, searchTerm)
  }, [currentPage, pageLimit])

  const handleSearchClick =() => {
    setCurrentPage(1);
    const pageOptions = {
      pageLimit,
      page: 1,
    };
    getAlllActiveAdList(pageOptions, searchTerm);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    const page = newPage + 1;
    setCurrentPage(page);
    const pageOptions = {
      pageLimit,
      page,
    };
    getAlllActiveAdList(pageOptions, searchTerm);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageLimit(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  // const visibleRows = React.useMemo(
  //   () =>
  //     stableSort(rows, getComparator(order, orderBy)).slice(
  //       currentPage * pageLimit,
  //       currentPage * pageLimit + pageLimit
  //     ),
  //   [order, orderBy, currentPage, pageLimit]
  // );

  return (
    <>
      {isLoading && <Loader />}
      <Card sx={{ mb: 2 }}>
          <CustomSearch 
            value={searchTerm} 
            onChange={handleSearch}
            onSearchButtonClick={handleSearchClick}
              />
      </Card>
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
              rowsPerPageOptions={PAGINATION_LIMIT_OPTIONS}
              component="div"
              count={property?.totalCount}
              rowsPerPage={pageLimit}
              page={currentPage - 1}
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
