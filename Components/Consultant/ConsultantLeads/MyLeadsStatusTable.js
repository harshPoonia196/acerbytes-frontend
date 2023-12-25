import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Avatar, Card, Grid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const rows = [
    {
        name: 'Anand',
        property: 'ABC',
        history: [
            {
                action: 'Next action',
                status: 'Meeting in person',
                timestamp: '11/09/2023, 09:30 AM',
                comment: 'Meet for property'
            },
            {
                action: 'Completed',
                status: 'Introduction call',
                timestamp: '10/09/2023, 09:30 AM',
                comment: 'Discusion on property meet'
            },
            {
                action: 'Completed',
                status: 'First call',
                timestamp: '09/09/2023, 09:30 AM',
                comment: 'Requirement disccussion'
            },
        ],
    }
];

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    {row.name}
                </TableCell>
                <TableCell>
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
                                        <TableCell>Action</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Timestamp</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>Comment</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell>
                                                {historyRow.action}
                                            </TableCell>
                                            <TableCell>{historyRow.status}</TableCell>
                                            <TableCell>{historyRow.timestamp}</TableCell>
                                            <TableCell>2 days remaining</TableCell>
                                            <TableCell>{historyRow.comment}</TableCell>
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

export default function MyLeadsStatusTable() {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', mb: 1 }}>
                            <Avatar sx={{ mr: 2 }} />
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6">Anand Gupta</Typography>
                                <Typography variant="h6">Tipco heights</Typography>
                            </Box>
                            <Box sx={{ textAlign: 'end' }}>
                                <IconButton size='small'>
                                    <ArrowForwardIcon fontSize='small' />
                                </IconButton>
                                <Typography sx={{ cursor: 'pointer' }} variant="subtitle2">
                                    View history
                                </Typography>
                            </Box>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1">Next Status</Typography>
                                <Typography variant="body1">27th July, 2023, 09:23 AM</Typography>
                                <Typography variant="body1">
                                    Meet him and do site visit
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1">Current Status</Typography>
                                <Typography variant="body1">26th July, 2023, 09:23 AM</Typography>
                                <Typography variant="body1">
                                    He is ready to visit the site on monday but his budget is little lower
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
            {/* <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
        </>
    );
}
