import { Table, Box, TableBody, TableContainer, TablePagination, TableHead, TableRow, TableCell, TableSortLabel, Tooltip, IconButton, Chip, Menu, MenuItem } from '@mui/material'
import React from 'react'
import Paper from "@mui/material/Paper";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { visuallyHidden } from '@mui/utils';
import { getComparator, stableSort } from "Components/CommonLayouts/CommonUtils";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from 'next/navigation';

const rows = [
    {
        project: "Rizvi heights",
        builder: "Rizvi builders",
        city: "Mumbai",
        area: "Noida",
        sector: 'sector 26',
        status: "Draft",
        lastModified: "12th Nov 2018, 09:18 AM"
    }, {
        project: "Rizvi heights",
        builder: "Rizvi builders",
        city: "Mumbai",
        area: "Noida",
        sector: 'sector 26',
        status: "Draft",
        lastModified: "12th Nov 2018, 09:18 AM"
    }
];

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

function RowStructure({ row, router }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return <TableRow
        key={row.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
        <TableCell onClick={() => { router.push('/details') }} sx={{ cursor: 'pointer' }}>{row.builder}</TableCell>
        <TableCell onClick={() => { router.push('/details') }} sx={{ cursor: 'pointer' }}>{row.project}</TableCell>
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
                <DeleteIcon fontSize='1rem' />
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
}

function PropertyListTable() {
    const router = useRouter()
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
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
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort} />
                <TableBody>
                    {rows.map((row) => (
                        <RowStructure row={row} router={router} />
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
    )
}

export default PropertyListTable