import React, { useEffect, useState } from 'react';
import {
    Card,
    Typography,
    Grid,
    Box,
    IconButton,
    Divider,
    Button,
    TableContainer,
    Table,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import NewUnitAreaInputField from 'Components/CommonLayouts/NewUnitAreaInputField';
import NewInputFieldStructure from 'Components/CommonLayouts/NewInputFieldStructure';

function FloorPlanCard({ isEdit, form, handleChange }) {
    const { projectType } = form.overview;
    const { layoutType } = form.layout;
    const { unitsPlan } = form;

    const [rows, setRows] = useState([]);
    const [selectedItem, setSelectedItem] = useState({
        propertyType: '',
        propertyLayout: '',
        name: '',
        area: '',
        bsp: '',
        applicableMonthYear: '',
    });
    const [isEditItem, setIsEditItem] = useState(false)

    useEffect(() => {
        setRows(unitsPlan);
    }, [unitsPlan]);

    const addFloorPlan = () => {
        if (selectedItem.propertyType && selectedItem.propertyLayout && selectedItem.name && selectedItem.area && selectedItem.bsp && selectedItem.applicableMonthYear) {
            setRows((prevRows) => [...prevRows, selectedItem]);
            setSelectedItem({
                propertyType: '',
                propertyLayout: '',
                name: '',
                area: '',
                bsp: '',
                applicableMonthYear: '',
            });
        }
    };

    const editFloorPlan = () => {
        if (isEditItem !== -1) {
            setRows((prevRows) => [...prevRows.slice(0, isEditItem), selectedItem, ...prevRows.slice(isEditItem + 1)]);
            setSelectedItem({
                propertyType: '',
                propertyLayout: '',
                name: '',
                area: '',
                bsp: '',
                applicableMonthYear: '',
            });
            setIsEditItem(false)
        }
    };

    const deleteFloorPlan = (index) => {
        setRows((prevRows) => prevRows.filter((_, i) => i !== index));
    };

    return (
        <Grid item xs={12} id="floorplans">
            <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Units plan
                    </Typography>
                    <Box>
                        <IconButton>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} columns={24} sx={{ p: 2 }}>
                    <NewSelectTextFieldStructure
                        label="Unit type"
                        isEdit={isEdit}
                        list={projectType}
                        name="propertyType"
                        value={selectedItem.propertyType}
                        handleChange={(e) => setSelectedItem((prev) => ({ ...prev, propertyType: e.target.value }))}
                    />
                    <NewSelectTextFieldStructure
                        label="Unit"
                        isEdit={isEdit}
                        name="propertyLayout"
                        list={layoutType}
                        value={selectedItem.propertyLayout}
                        handleChange={(e) => setSelectedItem((prev) => ({ ...prev, propertyLayout: e.target.value }))}
                    />
                    <NewInputFieldStructure
                        label="Name #"
                        variant="outlined"
                        isEdit={isEdit}
                        name="name"
                        value={selectedItem.name}
                        handleChange={(e) => setSelectedItem((prev) => ({ ...prev, name: e.target.value }))}
                    />
                    <NewUnitAreaInputField
                        label="Area"
                        variant="outlined"
                        isEdit={isEdit}
                        name="area"
                        value={selectedItem.area}
                        handleChange={(e) => setSelectedItem((prev) => ({ ...prev, area: e.target.value }))}
                    />
                    <NewInputFieldStructure
                        label="Base Selling Price"
                        variant="outlined"
                        isEdit={isEdit}
                        name="bsp"
                        value={selectedItem.bsp}
                        handleChange={(e) => setSelectedItem((prev) => ({ ...prev, bsp: e.target.value }))}
                    />
                    <NewSelectTextFieldStructure
                        label="Applicable Year"
                        name="applicableYear"
                        isEdit={isEdit}
                        list={[
                            { label: '2000', value: '2000' },
                            { label: '2001', value: '2001' },
                        ]}
                        value={selectedItem.applicableMonthYear}
                        handleChange={(e) => setSelectedItem((prev) => ({ ...prev, applicableMonthYear: e.target.value }))}
                    />
                    <Grid item xs={24} sx={{ textAlign: 'end' }}>
                        <Button variant="contained" onClick={isEditItem ? editFloorPlan : addFloorPlan}>
                            {isEditItem ? 'Edit' : 'Add'}
                        </Button>
                    </Grid>
                </Grid>
                <Grid container rowSpacing={1} columnSpacing={2} columns={24} sx={{ p: 2 }}>
                    <TableContainer sx={{ p: 3 }} component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Property Type</TableCell>
                                    <TableCell align="left">Property Layout</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Area</TableCell>
                                    <TableCell align="left">Base Selling Price</TableCell>
                                    <TableCell align="left">Applicable Month and Year</TableCell>
                                    <TableCell align="left">Edit</TableCell>
                                    <TableCell align="left">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow
                                        key={row.name + index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.propertyType}
                                        </TableCell>
                                        <TableCell align="left">{row.propertyLayout}</TableCell>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="left">{row.area}</TableCell>
                                        <TableCell align="left">{row.bsp}</TableCell>
                                        <TableCell align="left">{row.applicableMonthYear}</TableCell>
                                        <TableCell align="left">
                                            <IconButton onClick={() => {
                                                setSelectedItem(row)
                                                setIsEditItem(index)
                                            }}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="left">
                                            <IconButton onClick={() => deleteFloorPlan(index)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Card>
        </Grid>
    );
}

export default FloorPlanCard;

