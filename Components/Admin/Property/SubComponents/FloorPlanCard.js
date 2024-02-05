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
    Modal,
    Backdrop,
    Fade,
    TableBody,
} from "@mui/material"; 
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from "@mui/icons-material/Edit";
import {unitPlanSchema} from "Components/Admin/Property/Validation/PropertyValidation"
import DeleteIcon from "@mui/icons-material/Delete";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import NewUnitAreaInputField from 'Components/CommonLayouts/NewUnitAreaInputField';
import NewInputFieldStructure from 'Components/CommonLayouts/NewInputFieldStructure';
import { TroubleshootSharp } from '@mui/icons-material';

function FloorPlanCard({ isEdit, form, handleChange,errors }) {
    const { projectType } = form.overview;
    const { layoutType } = form.layout;
    const { unitsPlan } = form;

    const [unitType,setUnitType] = useState();
    const [unit,setUnit]=useState();
    const [localError,setLocalError]=useState();
    const [rows, setRows] = useState([]);
    const [editItem,setEditItem] = useState(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

const overallCalc = (rows,selectedItem,sum)=>{
let valueArr = sum ? [...rows,selectedItem] : rows 
if(rows.length<=1 && sum === false){
    return {
        uniqueLayouts:[],maxPriceRange:0,minPriceRange:0,averagePrice:0
      }
}else{
    let getSum = 0;
    rows.map((one)=>{
    
      getSum += parseInt(one.bsp)
   })   
  let averagePriceSum = (getSum+parseInt(selectedItem.bsp))/(rows.length + 1)
  let averagePriceDecrease = (getSum-parseInt(selectedItem.bsp))/(rows.length + 1)
  const bspValues = valueArr.map(item => parseFloat(item.bsp)).filter(value => !isNaN(value));
  const minPriceRange = Math.min(...bspValues);
  const maxPriceRange = Math.max(...bspValues);
  const uniquePropertyLayoutsSet = new Set(valueArr.map(item => item.propertyLayout));
  const uniqueLayouts = Array.from(uniquePropertyLayoutsSet);

  return {
    uniqueLayouts,maxPriceRange,minPriceRange,averagePrice:sum?averagePriceSum:averagePriceDecrease
  }
}

}
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
        // handleChange(undefined,"unitsPlan",undefined,undefined,undefined,undefined,undefined,undefined,[...rows,selectedItem])
     

          let calculation = overallCalc(rows,selectedItem,TroubleshootSharp)
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

            handleChange(undefined,"unitsPlan",undefined,undefined,undefined,undefined,undefined,undefined,{...calculation,planList:[...rows,selectedItem]})
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
        if (editItem >= 0) {
            setRows((prevRows) => [...prevRows.slice(0, editItem), selectedItem, ...prevRows.slice(editItem + 1)]);
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
            setEditItem(false)
        }
    };

    const deleteFloorPlan = (index) => {
let selectedItem =rows.filter((_, i) => i === index)
let remainingItems = rows.filter((_, i) => i !== index)
let calculation = overallCalc(remainingItems, selectedItem[0],false)
  handleChange(undefined,"unitsPlan",undefined,undefined,undefined,undefined,undefined,undefined,{...calculation,planList:[...remainingItems]})

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
                        error={localError?.["propertyType"] || errors?.["unitsPlan.planList[0].propertyType"]}
                        value={selectedItem.propertyType}
                        handleChange={(e) => setSelectedItem((prev) => ({ ...prev, propertyType: e.target.value }))}
                    />
                    <NewSelectTextFieldStructure
                        label="Unit"
                        isEdit={isEdit}
                        name="propertyLayout"
                        list={layoutType}
                        error={localError?.["propertyLayout"] || errors?.["unitsPlan.planList[0].propertyLayout"]}
                        value={selectedItem.propertyLayout}
                        handleChange={(e) => setSelectedItem((prev) => ({ ...prev, propertyLayout: e.target.value }))}
                    />
                    <NewInputFieldStructure
                        label="Name #"
                        variant="outlined"
                        isEdit={isEdit}
                        name="name"
                        error={localError?.["name"] || errors?.["unitsPlan.planList[0].name"]}
                        value={selectedItem.name}
                        handleChange={(e) => setSelectedItem((prev) => ({ ...prev, name: e.target.value }))}
                    />

                    <NewSelectTextFieldStructure
                        label="Area Unit"
                        name="areaUnit"
                        infoText='Changing the unit leads to re enter the plan. The old entries will be removed'
                        showInfo={true}
                        error={localError?.["areaUnit"] || errors?.["unitsPlan.planList[0].areaUnit"]}
                        isEdit={isEdit}
                        list={[
                            { label: 'acres', value: 'acres' },
                            { label: 'sqft', value: 'sqft' }
                        ]}
                        value={selectedItem.areaUnit}
                        handleChange={(e) => {
                            if(rows.length>=1)
                            {
                                let check = rows.every(obj => obj["areaUnit"] !== e.target.value)
                                if(check){
                                        
                                    let changeUnit = rows.map((item)=>{
                                        return {...item,area:'',areaUnit:e.target.value}
                                    })
                                    setRows(changeUnit)
                                    handleOpen();
                                    setSelectedItem((prev) => ({ ...prev, areaUnit: e.target.value }))
                                   
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
                        error={localError?.["area"] || errors?.["unitsPlan.planList[0].area"]}
                        handleChange={(e) => setSelectedItem((prev) => ({ ...prev, area: e.target.value }))}
                    />

                   
                    <NewInputFieldStructure
                        label="Base Selling Price (Per Unit)"
                        variant="outlined"
                        isEdit={isEdit}
                        name="bsp"
                        error={localError?.["bsp"] || errors?.["unitsPlan.planList[0].bsp"]}
                        value={selectedItem.bsp}
                        handleChange={(e) => setSelectedItem((prev) => ({ ...prev, bsp: e.target.value }))}
                    />

                    <NewInputFieldStructure
                        label="Total Units"
                        variant="outlined"
                        isEdit={isEdit}
                        name="totalUnits"
                        value={selectedItem.totalUnits}
                        error={localError?.["totalUnits"] || errors?.["unitsPlan.planList[0].totalUnits"]}
                        handleChange={(e) => setSelectedItem((prev) => ({ ...prev, totalUnits: e.target.value }))}
                    />

                    <NewSelectTextFieldStructure
                        label="Applicable Year"
                        name="applicableYear"
                        error={localError?.["applicableYear"] || errors?.["unitsPlan.planList[0].applicableYear"]}
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
                        error={localError?.["applicableMonth"] || errors?.["unitsPlan.planList[0].applicableMonth"]}
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
                            {isEditItem? 'Edit' : 'Add'}
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
                                        {row.name ? <TableCell align="left">{row.name}</TableCell>:''}
                                        {row.area ? <TableCell align="left">{row.area}</TableCell>:<TableCell><InfoIcon sx={{fontSize:18,cursor:"pointer",color:'red'}}/></TableCell>}
                                        {row.areaUnit ? <TableCell align="left">{row.areaUnit?row.areaUnit:" "}</TableCell>:''}
                                        {row.bsp ? <TableCell align="left">{row.bsp}</TableCell> : ''}
                                        {row.applicableYear ? <TableCell align="left">{row.applicableYear}</TableCell>: ''}
                                        {row.applicableMonth ? <TableCell align="left">{row.applicableMonth}</TableCell>:''}
                                        {row.propertyType ? <TableCell align="left">
                                            <IconButton onClick={() => {
                                                setSelectedItem(row)
                                                setIsEditItem(true)
                                                setEditItem(index)
                                            }}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell> : ''}
                                        {row.propertyType ? <TableCell align="left">
                                            <IconButton onClick={() => deleteFloorPlan(index)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>: ''}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
         <Fade in={open}>
         <Box sx={style}>
         <Typography id="transition-modal-title" variant="h6" component="h2">
             Editing Area unit leads to re enter all the selected entries in the table below
            </Typography>
        </Box>
         </Fade>
          </Modal>
            </Card>
        </Grid>
    );
}

export default FloorPlanCard;

