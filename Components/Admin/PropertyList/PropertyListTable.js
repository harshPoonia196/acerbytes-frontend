import { Table, Box, TableBody, TableContainer, TablePagination, TableHead, TableRow, TableCell, TableSortLabel, Tooltip, IconButton, Chip, Menu, MenuItem, CircularProgress, Stack } from '@mui/material'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import Paper from "@mui/material/Paper";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { visuallyHidden } from '@mui/utils';
import { getComparator, stableSort } from "utills/CommonFunction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from 'next/navigation';
import {
  getAllProperty, deleteProperty
} from "api/Property.api";
import { useSnackbar } from "utills/SnackbarContext"
import Loading from "Components/CommonLayouts/Loading";
import {
  PAGINATION_LIMIT,
  PAGINATION_LIMIT_OPTIONS,
} from "Components/config/config";
import ConfirmationDialog from 'Components/CommonLayouts/ConfirmationDialog';



const headCells = [
  {
    id: 'builder',
    label: 'Builder',
  },
  {
    id: 'project',
    label: 'Project',
  },
  {
    id: 'city',
    label: 'City',
  },
  {
    id: 'area',
    label: 'Area',
  },
  {
    id: 'sector',
    label: 'Sector',
  },
  {
    id: 'edit',
    label: 'Edit',
  },
  {
    id: 'delete',
    label: 'Delete',
  },
  {
    id: 'lastModified',
    label: 'Last modified',
  },
  {
    id: 'status',
    label: 'Status',
  }
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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

function RowStructure({ row, router, handleDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
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
      <TableCell onClick={() => { router.push(`/details/${row.id}`) }} sx={{ cursor: 'pointer' }}>{row.builder}</TableCell>
      <TableCell onClick={() => { router.push(`/details/${row.id}`) }} sx={{ cursor: 'pointer' }}>{row.project}</TableCell>
      <TableCell>{row.city}</TableCell>
      <TableCell>{row.area}</TableCell>
      <TableCell>{row.sector}</TableCell>
      <TableCell sx={{ py: 0 }}>
        <IconButton sx={{ fontSize: "1rem !important" }}>
          <EditIcon fontSize='1rem' />
        </IconButton>
      </TableCell>
      <TableCell sx={{ py: 0 }}>
        <IconButton sx={{ fontSize: "1rem !important" }}>
          <DeleteIcon fontSize='1rem' onClick={() => handleDelete(row.id)} />
        </IconButton>
      </TableCell>
      <TableCell>
        <Chip label={row.lastModified} size="small" />
      </TableCell>
      <TableCell>
        <Chip label={row.status} size='small' onClick={() => { }} color={row.status === 'Active' ? 'success' : row.status === 'Expired' ? 'error' : 'warning'} />
      </TableCell>
      <TableCell sx={{ py: 0 }}>
        <IconButton sx={{ fontSize: "1rem !important" }}>
          <MoreVertIcon onClick={handleClick} fontSize='1rem' />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Deactivate</MenuItem>
          <MenuItem onClick={handleClose}>Publish</MenuItem>
        </Menu>
      </TableCell>
    </TableRow>

  )
}

const PropertyListTable = ({ searchText, setCount }) => {
  const router = useRouter()
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(PAGINATION_LIMIT);

  const [propertyList, setPropertyList] = useState([])
  const [property, setProperty] = useState({})
  const [isLoading, setLoading] = useState(false);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [deletingPropertyId, setDeletingPropertyId] = useState(null);

  let transformData = (data) => {
    return data?.map(item => ({
      id: item._id,
      builder: item.overview?.builder,
      project: item.overview?.projectName,
      city: item.location?.city,
      area: item.location?.area,
      sector: item.location?.sector,
      status: item.overview?.status,
    }));
  };

  const objectToQueryString = (obj) => {
    const queryString = Object.keys(obj)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
      )
      .join("&");

    return queryString;
  };

  const getAllPropertyList = async (pageOptions, searchText) => {
    try {
      setLoading(true);
      const querParams = {
        ...pageOptions,
        ...(searchText ? { search: searchText } : {})
      };

      let res = await getAllProperty(objectToQueryString(querParams));
      if (res.status === 200) {
        let transformedData = transformData(res.data?.data || []);
        setPropertyList(transformedData);
        setCount(res?.data.totalCount)
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
            getAllPropertyList({ pageLimit, page: currentPage }, searchText);
          }
          setDeletingPropertyId(null);
        }
      } catch (error) {
        showToaterMessages(
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

  useEffect(() => {
    const pageOptions = {
      pageLimit,
      page: currentPage,
    };
    getAllPropertyList(pageOptions, searchText)
  }, [searchText, currentPage, pageLimit]);

  useEffect(() => {
    setCurrentPage(1)
  }, [searchText]);

  const { openSnackbar } = useSnackbar();

  const showToaterMessages = (message, severity) => {
    openSnackbar(message, severity);
  };


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    const page = newPage + 1;
    setCurrentPage(page);
    const pageOptions = {
      pageLimit,
      page,
    };
    getAllPropertyList(pageOptions, searchText)
  };

  const handleChangeRowsPerPage = (event) => {
    setPageLimit(parseInt(event.target.value, 10));
    setCurrentPage(1);
    const pageOptions = {
      pageLimit,
      page: 1,
    };
    getAllPropertyList(pageOptions, searchText)

  };

  const visibleRows = React.useMemo(
    () =>
      stableSort(propertyList, getComparator(order, orderBy)).slice(
        currentPage * pageLimit,
        currentPage * pageLimit + pageLimit,
      ),
    [order, orderBy, currentPage, pageLimit],
  );

  // useImperativeHandle(_ref, () =>  property?.totalCount, [property?.totalCount]);

  return (
    <>

      <TableContainer component={Paper}>
        {isLoading ? (
          <Stack sx={{ my: '1.5rem', alignItems: "center" }}>
            <CircularProgress color="inherit" />
          </Stack>
        ) : (
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort} />
            <TableBody>
              {
                propertyList?.map((row) => (
                  <RowStructure row={row} router={router} handleDelete={handleDelete} />
                ))
              }
            </TableBody>
          </Table>
        )}
        <TablePagination sx={{
        
        overflow: 'hidden',
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

      <ConfirmationDialog
        open={isDialogOpen}
        handleAction={handleConfirmDelete}
      />
    </>
  )
}

export default PropertyListTable