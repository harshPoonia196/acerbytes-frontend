import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Card, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import colors from 'styles/theme/colors';
import LeadStatusCard from './LeadStatusCard';
import CustomSearchInput from 'Components/CommonLayouts/SearchInput';
export default function MyLeadsStatus({ list = [], searchTerm, handleSearch, alignment, handleChange }) {
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Card sx={{ mb: 2 }}>
                        <CustomSearchInput value={searchTerm}
                            onChange={handleSearch} />
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card sx={{ mb: 2, overflowX: 'auto', }}>
                        <ToggleButtonGroup
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                            sx={{
                                display: 'flex',
                            }}
                        >
                            <ToggleButton size='small' value="All" sx={{ flex: 1, border: 'none' }}>All</ToggleButton>
                            <ToggleButton size='small' value="Completed" sx={{ flex: 1, border: 'none' }}>Current&nbsp;status (Completed)</ToggleButton>
                            <ToggleButton size='small' value="Next" sx={{ flex: 1, border: 'none' }}>Next&nbsp;action (Pending)</ToggleButton>
                        </ToggleButtonGroup>
                    </Card>
                </Grid>
                {list.map((res) => <LeadStatusCard
                    name={res.fullName} actionType={res.type + ' action'} status={res.status}
                    comment={res.note}
                    time={new Date(res?.time).toLocaleString()} />)}
            </Grid>
        </>
    );
}
