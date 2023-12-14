import { Box, Button, Card, Container, IconButton, InputBase, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import React from 'react'
import Paper from "@mui/material/Paper";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SearchIcon from "@mui/icons-material/Search";


function createData(
    consultantName,
    phone,
    propertyType,
    propertyName,
    link,
    status,
    validFrom,
    validTo,
  ) {
    return {
        consultantName,
        phone,
        propertyType,
        propertyName,
        link,
        status,
        validFrom,
        validTo,
    };
  }

  const rows = [
   
    createData("Anand Gupta","1234567558","Residency","New Oak","abc.com","Active",'13/12/2023','13/01/2024'),
    createData("Anand Gupta","1234567558","Residency","New Oak","abc.com","Active",'13/12/2023','13/01/2024'),
    createData("Anand Gupta","1234567558","Residency","New Oak","abc.com","Active",'13/12/2023','13/01/2024'),
    createData("Anand Gupta","1234567558","Residency","New Oak","abc.com","Active",'13/12/2023','13/01/2024'),
    createData("Anand Gupta","1234567558","Residency","New Oak","abc.com","Active",'13/12/2023','13/01/2024'),
    createData("Anand Gupta","1234567558","Residency","New Oak","abc.com","Active",'13/12/2023','13/01/2024'),
    createData("Ramesh Gupta","1234567558","Residency","New Oak","abc.com","Active",'13/12/2023','13/01/2024'),
    createData("Anand Gupta","1234567558","Residency","New Oak","abc.com","Active",'13/12/2023','13/01/2024'),
    createData("Anand Gupta","1234567558","Residency","New Oak","abc.com","Active",'13/12/2023','13/01/2024'),
    createData("Anand Gupta","1234567558","Residency","New Oak","abc.com","Active",'13/12/2023','13/01/2024'),
    createData("Anand Gupta","1234567558","Residency","New Oak","abc.com","Active",'13/12/2023','13/01/2024'),
    createData("Anand Gupta","1234567558","Residency","New Oak","abc.com","Active",'13/12/2023','13/01/2024'),
    createData("Rajesh Gupta","1234567558","Residency","New Oak","abc.com","Active",'13/12/2023','13/01/2024'),
  ];

const page = () => {
  return (
    <>

        <Container>
            <Card>
            <Box
                sx={{
                display: "flex",
                flex: 1,
                pl: 2,
                borderRadius: "8px",
                }}
            >
                <InputBase
                placeholder="Search"
                type="text"
                inputProps={{ "aria-label": "Search..." }}
                fullWidth
                />
                <IconButton type="submit" aria-label="search">
                <SearchIcon />
                </IconButton>
            </Box>
            </Card>
        </Container>

        <Container sx={{mx:'auto',p:2}}>
            <TableContainer component={Paper} sx={{maxHeight:'80vh'}} >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Consultant name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Proper type</TableCell>
                            <TableCell>Property name</TableCell>
                            <TableCell>Link</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Valid from</TableCell>
                            <TableCell>Valid to</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell>{row.consultantName}</TableCell>
                            <TableCell>{row.phone}</TableCell>
                            <TableCell>{row.propertyType}</TableCell>
                            <TableCell>{row.propertyName}</TableCell>
                            <TableCell>
                                <Tooltip title="Copy">
                                    <IconButton size='small'>
                                        <ContentCopyIcon size='small' />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>{row.validFrom}</TableCell>
                            <TableCell>{row.validTo}</TableCell>
                            <TableCell>
                                {/* <Button size='small'>Action</Button> */}
                                <Tooltip title="Disable">
                                    <IconButton size='small'>
                                        <PersonOffIcon size='small' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Activate">
                                    <IconButton size='small'>
                                        <PersonAddIcon size='small' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Invoice">
                                    <IconButton size='small'>
                                        <ReceiptIcon size='small' />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    </>
  )
}

export default page
