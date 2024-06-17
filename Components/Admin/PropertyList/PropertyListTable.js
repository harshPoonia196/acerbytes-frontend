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
  CircularProgress,
  Stack,
  Card,
  Typography,
  ListItemIcon,
} from "@mui/material";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Paper from "@mui/material/Paper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { visuallyHidden } from "@mui/utils";
import {
  formattedCreatedAt,
  getComparator,
  stableSort,
} from "utills/CommonFunction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import {
  getAllProperty,
  getAllAdminProperty,
  deleteProperty,
  managePublishData,
} from "api/Property.api";
import { useSnackbar } from "utills/SnackbarContext";
import Loading from "Components/CommonLayouts/Loading";
import NoDataCard from "Components/CommonLayouts/CommonDataCard";
import { PAGINATION_LIMIT, PAGINATION_LIMIT_OPTIONS } from "utills/Constants";
import ConfirmationDialog from "Components/CommonLayouts/ConfirmationDialog";
import Loader from "Components/CommonLayouts/Loading";
import CustomSearch from "Components/CommonLayouts/CustomSearch";
import DraftsIcon from "@mui/icons-material/Drafts";
import PublishIcon from "@mui/icons-material/Publish";

const headCells = [
  {
    id: "builder",
    label: "Builder",
  },
  {
    id: "project",
    label: "Project",
  },
  {
    id: "property_id",
    label: "Property id",
  },
  {
    id: "city",
    label: "City",
  },
  {
    id: "area",
    label: "Area",
  },
  {
    id: "sector",
    label: "Sector",
  },
  {
    id: "edit",
    label: "Edit",
  },
  {
    id: "delete",
    label: "Delete",
  },
  {
    id: "lastModified",
    label: "Last modified",
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
            sx={{ textTransform: "capitalize", fontWeight: "bold" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{
                "&:hover .MuiTableSortLabel-icon": {
                  opacity: 0,
                },
                "&.Mui-active .MuiTableSortLabel-icon": {
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
        <TableCell sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
          Action
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

function RowStructure({ row, router, handleDelete, managePublishActive }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleEdit = (id) => {
    router.push(`/admin/edit-property?id=${id}`);
  };
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const open = Boolean(anchorEl);

  const { openSnackbar } = useSnackbar();
  const showTostMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableRow
      hover
      key={row.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#f5f5f5";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      <TableCell
        onClick={() => {
          router.push(`/details/${row.id}`);
        }}
        sx={{ cursor: "pointer" }}
      >
        {row.builder}
      </TableCell>
      <TableCell
        onClick={() => {
          router.push(`/details/${row.id}`);
        }}
        sx={{ cursor: "pointer" }}
      >
        {row.project}
      </TableCell>
      <TableCell>{row.propertyId ? row.propertyId : "-"}</TableCell>
      <TableCell>{row.city}</TableCell>
      <TableCell>{row.area}</TableCell>
      <TableCell>{row.sector}</TableCell>
      <TableCell sx={{ py: 0 }}>
        <IconButton
          sx={{ fontSize: "1rem !important" }}
          onClick={() => handleEdit(row.id)}
        >
          <Tooltip title="Edit">
            <EditIcon fontSize="1rem" />
          </Tooltip>
        </IconButton>
      </TableCell>
      <TableCell sx={{ py: 0 }}>
        <IconButton
          sx={{ fontSize: "1rem !important" }}
          onClick={() => handleDelete(row.id)}
        >
          <Tooltip title="Delete">
            <DeleteIcon fontSize="1rem" />
          </Tooltip>
        </IconButton>
      </TableCell>
      <TableCell>
        <Chip label={formattedCreatedAt(row?.modifiedData)} size="small" />
      </TableCell>
      <TableCell>
        <Chip
          label={row.published ? "Published" : "Draft"}
          size="small"
          color={row.published ? "success" : "error"}
        />
      </TableCell>
      <TableCell sx={{ py: 0 }}>
        <Tooltip title="More">
          <IconButton
            sx={{ fontSize: "1rem !important" }}
            onClick={handleClick}
          >
            <MoreVertIcon fontSize="1rem" />
          </IconButton>
        </Tooltip>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              if (row.rera === "yes" && row.published === false) {
                managePublishActive(row.id, !row.published);
              } else if (row.published === true) {
                managePublishActive(row.id, !row.published);
              } else {
                openSnackbar(
                  "RERA message needs to be provided for this property",
                  "error"
                );
                // showTostMessages(
                //  "RERA message needs to be provided for this property",
                // );
              }

              handleClose();
            }}
          >
            <ListItemIcon>
              {row.published ? (
                <DraftsIcon fontSize="small" />
              ) : (
                <PublishIcon fontSize="small" />
              )}
            </ListItemIcon>
            {row.published ? " Draft" : "Publish"}
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
}

const PropertyListTable = ({ setCount }) => {
  const router = useRouter();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(PAGINATION_LIMIT);

  const [propertyList, setPropertyList] = useState([]);
  const [property, setProperty] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [deletingPropertyId, setDeletingPropertyId] = useState(null);

  let transformData = (data) => {
    return data?.map((item) => ({
      id: item._id,
      rera: item.regulatoryClearance.reraApproved.toLowerCase(),
      builder: item.overview?.builder,
      project: item.overview?.projectName,
      city: item.location?.city,
      area: item.location?.area,
      sector: item.location?.sector,
      status: item.overview?.status,
      modifiedData: item?.modifiedAt,
      published: item?.published,
      propertyId: item?.property_id,
    }));
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const objectToQueryString = (obj) => {
    const queryString = Object.keys(obj)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
      )
      .join("&");

    return queryString;
  };
  const getAllPropertyList = async (pageOptions, searchTerm) => {
    try {
      setLoading(true);
      const querParams = {
        ...pageOptions,
        ...(searchTerm ? { search: searchTerm } : {}),
      };
      if (userDetails?.role) {
        querParams.role = userDetails?.role;
      }

      let res = await getAllAdminProperty(objectToQueryString(querParams));
      if (res.status === 200) {
        let transformedData = transformData(res.data?.data || []);
        setPropertyList(transformedData);
        setCount(res?.data?.dashboardInfo || {});
        setProperty(res?.data);
      }
    } catch (error) {
      showTostMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error fetching state list",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (propertyId) => {
    setDeletingPropertyId(propertyId);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async (confirm) => {
    if (confirm && deletingPropertyId) {
      try {
        setLoading(true);
        let response = await deleteProperty(deletingPropertyId);
        if (response.status === 200) {
          const newTotal = property.totalCount - 1;
          const newTotalPages = Math.ceil(newTotal / pageLimit);
          if (currentPage > newTotalPages) {
            setCurrentPage(currentPage - 1 || 1);
          } else {
            getAllPropertyList({ pageLimit, page: currentPage }, searchTerm);
          }
          setDeletingPropertyId(null);
        }
      } catch (error) {
        showTostMessages(
          error?.response?.data?.message ||
            error?.message ||
            "Error deleting property",
          "error"
        );
      } finally {
        setLoading(false);
        setDialogOpen(false);
      }
    } else {
      setDialogOpen(false);
    }
  };

  const managePublishActive = async (propertyId, publishStatus) => {
    try {
      setLoading(true);
      let response = await managePublishData(propertyId, publishStatus);
      if (response.status === 200) {
        getAllPropertyList();
      }
    } catch (error) {
      showTostMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error deleting property",
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
    getAllPropertyList(pageOptions, searchTerm);
  }, [currentPage, pageLimit]);

  const handleSearchClick = () => {
    setCurrentPage(1);
    const pageOptions = {
      pageLimit,
      page: 1,
    };
    getAllPropertyList(pageOptions, searchTerm);
  };

  const { openSnackbar } = useSnackbar();

  const showTostMessages = (message, severity) => {
    openSnackbar(message, severity);
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
    getAllPropertyList(pageOptions, searchTerm);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageLimit(parseInt(event.target.value, 10));
    setCurrentPage(1);
    const pageOptions = {
      pageLimit,
      page: 1,
    };
    getAllPropertyList(pageOptions, searchTerm);
  };

  const visibleRows = React.useMemo(
    () =>
      stableSort(propertyList, getComparator(order, orderBy)).slice(
        currentPage * pageLimit,
        currentPage * pageLimit + pageLimit
      ),
    [order, orderBy, currentPage, pageLimit]
  );

  // useImperativeHandle(_ref, () =>  property?.totalCount, [property?.totalCount]);

  return (
    <>
      {isLoading && <Loader />}
      <Card sx={{ mb: 2 }}>
        <CustomSearch
          value={searchTerm}
          onChange={handleSearch}
          onSearchButtonClick={handleSearchClick}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchClick();
            }
          }}
        />
      </Card>
      {propertyList.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {propertyList?.map((row) => (
                <RowStructure
                  key={row?.id}
                  row={row}
                  router={router}
                  handleDelete={handleDelete}
                  managePublishActive={managePublishActive}
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
            count={property?.totalCount}
            rowsPerPage={pageLimit}
            page={currentPage - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <NoDataCard title={"No data found"} />
      )}

      <ConfirmationDialog
        open={isDialogOpen}
        handleAction={handleConfirmDelete}
      />
    </>
  );
};

export default PropertyListTable;
