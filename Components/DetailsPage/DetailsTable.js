"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const rows = [
  {
    tower: "Alpha",
    status: "Under Construction",
    block: "A",
    flatType: "3 BHK",
    size: "1545 Sq ft",
    total: "300",
    sale: "2",
    resale: "15",
    rent: "25",
  },
  {
    tower: "Beta",
    status: "Constructed",
    block: "B",
    flatType: "4 BHK",
    size: "1900 Sq ft",
    total: "40",
    sale: "4",
    resale: "35",
    rent: "-",
  },
  {
    tower: "Gamma",
    status: "Launched",
    block: "C",
    flatType: "5 BHK",
    size: "2145 Sq ft",
    total: "80",
    sale: "8",
    resale: "50",
    rent: "-",
  },
];

const TableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell>Tower / Building</TableCell>
      <TableCell>Status</TableCell>
      <TableCell>Block / Type</TableCell>
      <TableCell>Unit / Flat type</TableCell>
      <TableCell>Size</TableCell>
      <TableCell>Total Units</TableCell>
      <TableCell>Sale</TableCell>
      <TableCell>Resale</TableCell>
      <TableCell>Rent</TableCell>
      <TableCell />
    </TableRow>
  </TableHead>
);

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {row.tower}
        </TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell>{row.block}</TableCell>
        <TableCell>{row.flatType}</TableCell>
        <TableCell>{row.size}</TableCell>
        <TableCell>{row.total}</TableCell>
        <TableCell>{row.sale}</TableCell>
        <TableCell>{row.resale}</TableCell>
        <TableCell>{row.rent}</TableCell>
        <TableCell sx={{ width: "48px" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.history?.map((historyRow) => (
                    <TableRow key={historyRow?.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function DetailsTable() {
  return (
    <TableContainer component={Box}>
      <Table aria-label="collapsible table">
        <TableHeader />
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
