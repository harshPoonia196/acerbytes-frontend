import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Card, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import colors from 'styles/theme/colors';
import LeadStatusCard from './LeadStatusCard';
import CustomSearchInput from 'Components/CommonLayouts/SearchInput';
import NoDataCard from 'Components/CommonLayouts/CommonDataCard';
export default function MyLeadsStatus({ list: { rows = [], notesCount = 0, showSubscribeButton = false, needSubscribe = false } = {}, searchTerm, handleSearch, alignment, handleChange, handleOpenUpdatePopup, onNoteDelete }) {
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
                {
                    !needSubscribe ? (!!rows?.length ?
                        rows.map((res) => <LeadStatusCard
                            name={res.fullName} actionType={res.type + ' action'} status={res.status}
                            comment={res.note}
                            type={res.type}
                            userId={res?.user?._id}
                            noteId={res?._id}
                            time={new Date(res?.time).toLocaleString()}
                            handleOpenUpdatePopup={handleOpenUpdatePopup}
                            onNoteDelete={onNoteDelete}
                        />)
                        : <Grid item xs={12} justifyContent={"center"}>
                            {/* <Typography variant="h3" sx={{ my: 2, ml: 2 }}>
                                No data found!
                            </Typography> */}
                            <NoDataCard title={"No data found"} />
                        </Grid>
                    ) : <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                        <Typography variant="h3" sx={{ my: 2, ml: 2 }}>
                            To see notes, you need to subscribe.
                        </Typography>
                    </Grid>}
            </Grid>
        </>
    );
}
