
import {
    Box,
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel,
    Typography
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import React from "react";

const headCells = [
    {
        id: "FirstName",
        label: "Name",
    },
    // {
    //     id: "LastName",
    //     label: "Last name",
    // },
    {
        id: "consultant_id",
        label: "Consultant id",
    },
    {
        id: "CompanyName",
        label: "Company name",
    },
    {
        id: "phone",
        label: "Phone",
    },

    {
        id: "RERANumber",
        label: "RERA",
    },
    {
        id: "NoOfActiveLinks",
        label: "No of active links",
        numeric: true
    },
    {
        id: "CreditAmount",
        label: "Credit amount",
        numeric: true
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

export default EnhancedTableHead;