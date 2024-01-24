"use client"

import { Table, Box, TableBody, TableContainer, TablePagination, TableHead, TableRow, TableCell, TableSortLabel, Tooltip, IconButton, Chip, Menu, MenuItem, Button } from '@mui/material'
import React from 'react'
import Paper from "@mui/material/Paper";
import { visuallyHidden } from '@mui/utils';
import { getComparator, stableSort } from "utills/CommonFunction";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const rows = [
    {
        orderNo: 265444,
        name: 'Anand Gupta',
        mobileNumber: '+91 125454544',
        amount: '18000',
        point: '5000',
        approvedDiscount: '10%',
        approvedPayment: 10000,
        approvedPoints: 15000,
    }
];

const headCells = [
    {
        id: 'orderNo',
        label: 'Order no',
    },
    {
        id: 'name',
        label: 'Name',
    },
    {
        id: 'mobileNumber',
        label: 'Mobile number',
    },
    {
        id: 'amount',
        label: 'Amount',
    },
    {
        id: 'point',
        label: 'Point',
    },
    {
        id: 'approvedDiscount',
        label: 'Approved discount',
    },
    {
        id: 'approvedPayment',
        label: 'Approved payment',
    },
    {
        id: 'approvedPoints',
        label: 'Approved points',
    },
    {
        id: 'action',
        label: 'Action',
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
            </TableRow>
        </TableHead>
    );
}

function RowStructure({ row }) {
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
        <TableCell>{row.orderNo}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.mobileNumber}</TableCell>
        <TableCell>{row.amount}</TableCell>
        <TableCell>{row.point}</TableCell>
        <TableCell>{row.approvedDiscount}</TableCell>
        <TableCell>{row.approvedPayment}</TableCell>
        <TableCell>{row.approvedPoints}</TableCell>
        <TableCell>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                size='small'
            >
                <MoreVertIcon fontSize='small' />
            </IconButton>
        </TableCell>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={handleClose}>Assign points</MenuItem>
        </Menu>
    </TableRow>
}

function OrdersTable() {
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
                        <RowStructure row={row} key={row.firstName} />
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

export default OrdersTable