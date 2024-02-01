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
import {unitPlanSchema} from "Components/Admin/Property/Validation/PropertyValidation"
import DeleteIcon from "@mui/icons-material/Delete";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import NewUnitAreaInputField from 'Components/CommonLayouts/NewUnitAreaInputField';
import NewInputFieldStructure from 'Components/CommonLayouts/NewInputFieldStructure';

function FloorPlanCard({ isEdit, form, handleChange }) {
    const { projectType } = form.overview;
    const { layoutType } = form.layout;
    const { unitsPlan } = form;

    const [unitType,setUnitType] = useState();
    const [unit,setUnit]=useState();
    const [localError,setLocalError]=useState();
    const [rows, setRows] = useState([]);
    const [selectedItem, setSelectedItem] = useState({
        propertyType: '',
        propertyLayout: '',
        name: '',
        area: '',
        totalUnits:'',
        areaUnit:'',
        bsp: '',
        applicableYear: '',
        applicableMonth: '',
    });
    const [isEditItem, setIsEditItem] = useState(false)
useEffect(()=>{
    setUnit(layoutType);
    setUnitType(projectType)
},[])
    // useEffect(() => {
       
    //     setRows(unitsPlan);
    // }, [unitsPlan]);

    const addFloorPlan = () => {
        if (selectedItem.propertyType && selectedItem.propertyLayout && selectedItem.name && selectedItem.area && selectedItem.bsp && selectedItem.applicableMonth && selectedItem.applicableYear) {
        //    const isObjectPresent = rows.some(item =>
        //     Object.entries(selectedItem).every(([key, value]) => item[key] === value)
        //   );
        //   if(isObjectPresent){
    
        //   }
        //   else{
        //     let temp = [...rows,selectedItem]
        //     setRows((prevRows) => [...prevRows, selectedItem]);
        //   }
        handleChange(undefined,"unitsPlan",undefined,undefined,undefined,undefined,undefined,undefined,[...rows,selectedItem])
        setRows((prevRows) => [...prevRows, selectedItem]);
            setSelectedItem({
                propertyType: '',
                propertyLayout: '',
                name: '',
                area: '',
                areaUnit:'',
                totalUnits:'',
                bsp: '',
                applicableYear: '',
                applicableMonth: '',
            });
        }
        else{
            const { error } = unitPlanSchema.validate(selectedItem, { abortEarly: false });
            if (error) {
                // console.log("🚀 ~ validateForm ~ error:", error.details)
                const validationErrors = {};
                error.details.forEach((detail) => {
                    validationErrors[detail?.context?.label] = detail?.message
                });
                // Handle validation errors, e.g., display error messages
                setLocalError(validationErrors)
                return false;
            }
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
                totalUnits:'',
                areaUnit:'',
                bsp: '',
                applicableYear: '',
                applicableMonth: '',
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
                        error={localError?.["propertyType"]}
                        value={selectedItem.propertyType}
                        handleChange={(e) => setSelectedItem((prev) => ({ ...prev, propertyType: e.target.value }))}
                    />
                    <NewSelectTextFieldStructure
                        label="Unit"
                        isEdit={isEdit}
                        name="propertyLayout"
                        list={layoutType}
                        error={localError?.["propertyLayout"]}
                        value={selectedItem.propertyLayout}
                        handleChange={(e) => setSelectedItem((prev) => ({ ...prev, propertyLayout: e.target.value }))}
                    />
                    <NewInputFieldStructure
                        label="Name #"
                        variant="outlined"
                        isEdit={isEdit}
                        name="name"
                        error={localError?.["name"]}
                        value={selectedItem.name}
                        handleChange={(e) => setSelectedItem((prev) => ({ ...prev, name: e.target.value }))}
                    />

                    <NewSelectTextFieldStructure
                        label="Area Unit"
                        name="areaUnit"
                        infoText='Changing the unit leads to re enter the plan. The old entries will be removed'
                        showInfo={true}
                        error={localError?.["areaUnit"]}
                        isEdit={isEdit}
                        list={[
                            { label: 'acres', value: 'acres' },
                            { label: 'sqft', value: 'sqft' }
                        ]}
                        value={selectedItem.areaUnit}
                        handleChange={(e) => {
                            if(rows.length>1)
                            {
                                let check = rows.every(obj => obj["areaUnit"] !== e.target.value)
                                if(check){
                                    setRows([])
                                }
                                else{
                                    setSelectedItem((prev) => ({ ...prev, areaUnit: e.target.value }))
                                }    
                            }
                            else{
                                setSelectedItem((prev) => ({ ...prev, areaUnit: e.target.value }))
                            }

                            }
                          
                            
                        }
                    />

                    <NewInputFieldStructure
                        label="Area (Per Unit)"
                        variant="outlined"
                        isEdit={isEdit}
                        name="area"
                        value={selectedItem.area}
                        error={localError?.["area"]}
                        handleChange={(e) => setSelectedItem((prev) => ({ ...prev, area: e.target.value }))}
                    />

                   
                    <NewInputFieldStructure
                        label="Base Selling Price (Per Unit)"
                        variant="outlined"
                        isEdit={isEdit}
                        name="bsp"
                        error={localError?.["bsp"]}
                        value={selectedItem.bsp}
                        handleChange={(e) => setSelectedItem((prev) => ({ ...prev, bsp: e.target.value }))}
                    />

                    <NewInputFieldStructure
                        label="Total Units"
                        variant="outlined"
                        isEdit={isEdit}
                        name="totalUnits"
                        value={selectedItem.totalUnits}
                        error={localError?.["totalUnits"]}
                        handleChange={(e) => setSelectedItem((prev) => ({ ...prev, totalUnits: e.target.value }))}
                    />

                    <NewSelectTextFieldStructure
                        label="Applicable Year"
                        name="applicableYear"
                        error={localError?.["applicableYear"]}
                        isEdit={isEdit}
                        list={[
                            { label: '2000', value: '2000' },
                            { label: '2001', value: '2001' },
                        ]}
                        value={selectedItem.applicableYear}
                        handleChange={(e) => setSelectedItem((prev) => ({ ...prev, applicableYear: e.target.value }))}
                    />
                    <NewSelectTextFieldStructure
                        label="Applicable Month"
                        name="applicableMonth"
                        error={localError?.["applicableMonth"]}
                        isEdit={isEdit}
                        list={[
                            { label: '01', value: '01' },
                            { label: '02', value: '02' },
                        ]}
                        value={selectedItem.applicableMonth}
                        handleChange={(e) => setSelectedItem((prev) => ({ ...prev, applicableMonth: e.target.value }))}
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
                                    <TableCell align="left">Area Unit</TableCell>
                                    <TableCell align="left">Base Selling Price</TableCell>
                                    <TableCell align="left">Applicable Year</TableCell>
                                    <TableCell align="left">Applicable Month</TableCell>
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
                                   
                                       {row.propertyType && <TableCell component="th" scope="row">
                                            {row.propertyType}
                                        </TableCell>}
                                        {row.propertyLayout && <TableCell align="left">{row.propertyLayout}</TableCell>}
                                        {row.name && <TableCell align="left">{row.name}</TableCell>}
                                        {row.area && <TableCell align="left">{row.area}</TableCell>}
                                        {row.areaUnit && <TableCell align="left">{row.areaUnit}</TableCell>}
                                        {row.bsp && <TableCell align="left">{row.bsp}</TableCell>}
                                        {row.applicableYear && <TableCell align="left">{row.applicableYear}</TableCell>}
                                        {row.applicableMonth && <TableCell align="left">{row.applicableMonth}</TableCell>}
                                        {row.propertyType && <TableCell align="left">
                                            <IconButton onClick={() => {
                                                setSelectedItem(row)
                                                setIsEditItem(index)
                                            }}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>}
                                        {row.propertyType && <TableCell align="left">
                                            <IconButton onClick={() => deleteFloorPlan(index)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>}
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

