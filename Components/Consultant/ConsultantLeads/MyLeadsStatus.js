import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Card, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import colors from 'styles/theme/colors';
import LeadStatusCard from './LeadStatusCard';

export default function MyLeadsStatus() {

    const [alignment, setAlignment] = React.useState('all');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <ToggleButtonGroup
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                            sx={{
                                display: 'flex',
                                overflowX: 'auto',
                            }}
                        >
                            <ToggleButton size='small' value="all" sx={{ flex: 1, border: 'none' }}>All</ToggleButton>
                            <ToggleButton size='small' value="current" sx={{ flex: 1, border: 'none' }}>Current status(Completed)</ToggleButton>
                            <ToggleButton size='small' value="next" sx={{ flex: 1, border: 'none' }}>Next action(Pending)</ToggleButton>
                        </ToggleButtonGroup>
                    </Card>
                </Grid>
                <LeadStatusCard
                    name="Sumit mehra" actionType='Next action' status='Meeting in person'
                    comment='customer is interested to have a detail call next meet cal.'
                    time="16th June, 2023, 09:23 AM" />
                <LeadStatusCard
                    name="Sumit mehra" actionType='Completed action' status='Introductory call'
                    comment='customer is interested to have a detail call next meet cal.'
                    time="16th June, 2023, 09:23 AM" />
            </Grid>
        </>
    );
}
