import React, { useEffect, useState } from "react";
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
import {
  transformDocuments,
  formatNumber,
  monthList,
} from "utills/CommonFunction";
import { getAllOptions } from "api/Property.api";
import InfoIcon from "@mui/icons-material/Info";
import { useSnackbar } from "utills/SnackbarContext";

import EditIcon from "@mui/icons-material/Edit";
// import { monthList } from "Components/Constants/index"
import { unitsPlanSchemaWithoutLayout,unitsPlanSchemaWithLayout } from "Components/Admin/Property/Validation/PropertyValidation";
import DeleteIcon from "@mui/icons-material/Delete";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import NewUnitAreaInputField from "Components/CommonLayouts/NewUnitAreaInputField";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import { TroubleshootSharp } from "@mui/icons-material";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";

function FloorPlanCard({
  isEdit,
  form,
  editForm,
  handleChange,
  errors,
  hide,
  handleUnitsPlan,
}) {
  const { projectType } = form.overview;
  const { layoutType } = form.layout;
  const { unitsPlan } = form;

  const [unitType, setUnitType] = useState();
  const [unit, setUnit] = useState();
  const [localError, setLocalError] = useState();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editItem, setEditItem] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [totalPriceCalc,setTotalPriceCalc]=useState(0);
  const handleClose = () => setOpen(false);
  const [selectedItem, setSelectedItem] = useState({
    propertyType: "",
    propertyLayout: "",
    name: "",
    area: "",
    totalUnits: "",
    totalPrice:"",
    priceUnit:"Crore",
    areaUnit: "Sqft",
    bsp: "",
    applicableYear: "",
    applicableMonth: "",
  });
  const [isEditItem, setIsEditItem] = useState(false);

  const { openSnackbar } = useSnackbar();

  const showToaterMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  useEffect(() => {
    setUnit(layoutType);
    getAllOptionDataList()
    setUnitType(projectType);
    const updatedPlanList = unitsPlan.planList.filter((plan) => {
      // Check if all fields in the plan object are empty
      return plan.areaUnit !== "";
      //   return Object.values(plan).every((value) => value !== "");
    });
    setRows([...updatedPlanList]);
  }, []);
  useEffect(() => {
    delete unitsPlan._id;
    const updatedPlanList = unitsPlan.planList?.filter((plan) => {
      // Check if all fields in the plan object are empty
      return plan.areaUnit !== "";
      // return Object.values(plan).every((value) => value !== "");
    });
    setRows([...updatedPlanList]);
  }, [editForm]);


  const [selectOptions, setSelectOption] = useState({})
  const getAllOptionDataList = async () => {
    try {
      let res = await getAllOptions();
      if (res.status === 200) {
        let transform = transformDocuments(res.data.data)
        setSelectOption({ ...transform })
      }
    } catch (error) {
      console.log(error, 'err')
      showToaterMessages(
        error?.response?.data?.message ||
        error?.message ||
        "Error fetching state list",
        "error"
      );
    }
    finally {
      setLoading(false);
    }
  };


  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const overallCalc = (rows, selectedItem, sum, edit = false) => {
    let valueArr = sum ? [...rows, selectedItem] : rows;
    if (rows.length <= 1 && sum === false) {
      return {
        uniqueLayouts: [],
        maxPriceRange: 0,
        minPriceRange: 0,
        averagePrice: 0,
      };
    } else if (edit) {
      let getSum = 0;
      rows.map((one) => {
        getSum += parseInt(one.totalPrice);
      });
      let averagePriceSum = getSum / rows.length;
      const totalPriceValues = rows
        .map((item) => parseFloat(item.totalPrice))
        .filter((value) => !isNaN(value));
      const minPriceRange = Math.min(...totalPriceValues);
      const maxPriceRange = Math.max(...totalPriceValues);
      const uniquePropertyLayoutsSet = new Set(
        rows.map((item) =>{ 
        if(item.propertyLayout!==""){
          return item.propertyLayout
        }
        else {
          return null
        }
    }).filter((layout) => layout !== null)
      );
      const uniqueLayouts = Array.from(uniquePropertyLayoutsSet);
      return {
        uniqueLayouts,
        maxPriceRange,
        minPriceRange,
        averagePrice: averagePriceSum,
      };
    } else {
      let getSum = 0;
      rows.map((one) => {
        getSum += parseInt(one.totalPrice);
      });
      let averagePriceSum =
        (getSum + parseInt(selectedItem.totalPrice)) / (rows.length + 1);
      let averagePriceDecrease =
        (getSum - parseInt(selectedItem.totalPrice)) / (rows.length + 1);
      const totalPriceValues = valueArr
        .map((item) => parseFloat(item.totalPrice))
        .filter((value) => !isNaN(value));
      const minPriceRange = Math.min(...totalPriceValues);
      const maxPriceRange = Math.max(...totalPriceValues);
      const uniquePropertyLayoutsSet = new Set(
        valueArr.map((item) =>{ 
          if(item.propertyLayout!==""){
            return item.propertyLayout
          }
          else {
            return null
          }
      }).filter((layout) => layout !== null)
      );
      const uniqueLayouts = Array.from(uniquePropertyLayoutsSet);

      return {
        uniqueLayouts,
        maxPriceRange,
        minPriceRange,
        averagePrice: sum ? averagePriceSum : averagePriceDecrease,
      };
    }
  };
  const addFloorPlan = () => {

    let validationSchema = ["shop","land","restaurant"].includes(selectedItem.propertyType.toLocaleLowerCase()) ? unitsPlanSchemaWithoutLayout : unitsPlanSchemaWithLayout
    const { error } = validationSchema?.validate(selectedItem, {
      abortEarly: false,
    });


    if (
      !error
    ) {

      let calculation = overallCalc(rows, selectedItem, true);
      setRows((prevRows) => [...prevRows, selectedItem]);
      setSelectedItem({
        propertyType: "",
        propertyLayout: "",
        name: "",
        area: "",
        areaUnit: "",
        width:"",
        length:"",
        totalUnits: "",
        totalPrice:"",
        priceUnit:"Crore",
        bsp: "",
        applicableYear: "",
        applicableMonth: "",
      });
      handleUnitsPlan({ ...calculation, planList: [...rows, selectedItem] });
    } 
    else {
     
        console.log("🚀 ~ validateForm ~ error:", error.details)
        const validationErrors = {};
        error.details.forEach((detail) => {
          validationErrors[detail?.context?.label] = detail?.message;
        });
        // Handle validation errors, e.g., display error messages
        setLocalError(validationErrors);
        return false;
    }
  };


  const handleCalculation=(e,fieldName)=>{

if(fieldName==='length'){
  setSelectedItem((prev) => ({ ...prev, length: e.target.value }))
}
else if(fieldName==='width'){
  setSelectedItem((prev) => ({ ...prev, width: e.target.value, area:prev.length * e.target.value }))
}

  }

  const editFloorPlan = () => {
    if (editItem >= 0) {
      let arr = [
        ...rows.slice(0, editItem),
        selectedItem,
        ...rows.slice(editItem + 1),
      ];
      setRows((prevRows) => [...arr]);
      let calculation = overallCalc(arr, selectedItem, true, true);
      handleUnitsPlan({
        ...calculation,
        planList: [
          ...arr,
        ],
      });
      setSelectedItem({
        propertyType: "",
        propertyLayout: "",
        name: "",
        area: "",
        width:'',
        length:'',
        totalUnits: "",
        totalPrice:'',
        priceUnit:"Crore",
        areaUnit: "Acres",
        bsp: "",
        applicableYear: "",
        applicableMonth: "",
      });
      setIsEditItem(false);
      setEditItem(false);
    }
  };

  const deleteFloorPlan = (index) => {
    let selectedItem = rows.filter((_, i) => i === index);
    let remainingItems = rows.filter((_, i) => i !== index);
    let calculation = overallCalc(remainingItems, selectedItem[0], false);
    //   handleChange(undefined,"unitsPlan",undefined,undefined,undefined,undefined,undefined,undefined,{...calculation,planList:[...remainingItems]})
    handleUnitsPlan({ ...calculation, planList: [...remainingItems] });
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

        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={2}
            columns={18}
          >
            <NewSelectTextFieldStructure
              label="Unit type"
              isEdit={isEdit}
              list={projectType}
              name="propertyType"
              error={
                localError?.["propertyType"] ||
                errors?.["unitsPlan.planList[0].propertyType"]
              }
              value={selectedItem.propertyType}
              handleChange={(e) =>
                setSelectedItem((prev) => ({
                  ...prev,
                  propertyType: e.target.value,
                }))
              }
            />
            { !["shop","land","restaurant"].includes(selectedItem.propertyType.toLocaleLowerCase())?
             <NewSelectTextFieldStructure
              label="Unit"
              isEdit={isEdit}
              name="propertyLayout"
              list={layoutType}
              error={
                localError?.["propertyLayout"] ||
                errors?.["unitsPlan.planList[0].propertyLayout"]
              }
              value={selectedItem.propertyLayout}
              handleChange={(e) =>
                setSelectedItem((prev) => ({
                  ...prev,
                  propertyLayout: e.target.value,
                }))
              }
            />
            :
            <>
              <NewInputFieldStructure
            label="Length"
            variant="outlined"
            isEdit={isEdit}
            list={layoutType}
            name="length"
            value={selectedItem.length}
            error={
              localError?.["length"] ||
              errors?.["unitsPlan.planList[0].length"]
            }
            handleChange={
             (e)=> handleCalculation(e,'length')
              // (e) =>
              // setSelectedItem((prev) => ({ ...prev, length: e.target.value }))
            }
          />
            <NewInputFieldStructure
            label="Width"
            variant="outlined"
            isEdit={isEdit}
            list={layoutType}
            name="width"
            value={selectedItem.width}
            error={
              localError?.["width"] ||
              errors?.["unitsPlan.planList[0].width"]
            }
            handleChange={(e) =>
              handleCalculation(e,"width")
            }
          />
            </>
          
            
            }
            <NewInputFieldStructure
              label="Name #"
              variant="outlined"
              isEdit={isEdit}
              name="name"
              error={
                localError?.["name"] || errors?.["unitsPlan.planList[0].name"]
              }
              value={selectedItem.name}
              handleChange={(e) =>
                setSelectedItem((prev) => ({ ...prev, name: e.target.value }))
              }
            />

            <NewSelectTextFieldStructure
              label="Area Unit"
              name="areaUnit"
              infoText="Changing the unit leads to re enter the plan. The old entries will be removed"
              showInfo={true}
              defaultValue={"Acres"}
              error={
                localError?.["areaUnit"] ||
                errors?.["unitsPlan.planList[0].areaUnit"]
              }
              isEdit={isEdit}
              list={
                selectOptions.areaUnit?.map((item) => {
                  return {
                    label: item,
                    value: item,
                  };
                }) ||
                [
                  { label: "Acres", value: "acres" },
                  { label: "Sqft", value: "sqft" },
                ]}
              value={selectedItem.areaUnit}
              handleChange={(e) => {
                if (rows.length >= 1) {
                  let check = rows.every(
                    (obj) => obj["areaUnit"] !== e.target.value
                  );
                  if (check) {
                    let changeUnit = rows.map((item) => {
                      return { ...item, area: "", areaUnit: e.target.value };
                    });
                    setRows(changeUnit);
                    handleOpen();
                    setSelectedItem((prev) => ({
                      ...prev,
                      areaUnit: e.target.value,
                    }));
                  } else {
                    setSelectedItem((prev) => ({
                      ...prev,
                      areaUnit: e.target.value,
                    }));
                  }
                } else {
                  setSelectedItem((prev) => ({
                    ...prev,
                    areaUnit: e.target.value,
                  }));
                }
              }}
            />

            <NewInputFieldStructure
              label={`Area (Per unit)`}
              variant="outlined"
              isEdit={isEdit}
              type={"number"}
              name="area"
              disabled={["shop","land","restaurant"].includes(selectedItem.propertyType.toLocaleLowerCase())}
              value={selectedItem.area}
              error={
                localError?.["area"] || errors?.["unitsPlan.planList[0].area"]
              }
              handleChange={(e) =>
                setSelectedItem((prev) => ({ ...prev, area: e.target.value }))
              }
            />

            <NewInputFieldStructure
              label = {`Base Selling Price  (Per ${selectedItem.areaUnit})`}
              variant="outlined"
              type={"number"}
              isEdit={isEdit}
              name="bsp"
              error={localError?.["bsp"] || errors?.["unitsPlan.planList[0].bsp"]}
              value={selectedItem.bsp}
              handleChange={(e) =>{
                
                setSelectedItem((prev) => ({ ...prev, bsp: e.target.value }))
              }}
            />


<NewInputFieldStructure
              label="Total Units"
              variant="outlined"
              isEdit={isEdit}
              type={"number"}
              name="totalUnits"
              value={selectedItem.totalUnits}
              error={
                localError?.["totalUnits"] ||
                errors?.["unitsPlan.planList[0].totalUnits"]
              }
              handleChange={(e) =>{
                let totalPriceCalc = e.target.value*selectedItem.area*selectedItem.bsp
                
                setSelectedItem((prev) => ({
                  ...prev,
                  totalUnits: e.target.value,
                  totalPrice:totalPriceCalc,
                  priceUnit:formatNumber(totalPriceCalc)
                }))
              }}
            />



       <NewInputFieldStructure
            label="Total Price"
            variant="outlined"
            isEdit={isEdit}
            list={layoutType}
            disabled={true}
            name="length"
            value={selectedItem.totalPrice}
            error={
              localError?.["propertyLayout"] ||
              errors?.["unitsPlan.planList[0].propertyLayout"]
            }
            // handleChange={
            //  (e)=> handleCalculation(e,'length')
            //   // (e) =>
            //   // setSelectedItem((prev) => ({ ...prev, length: e.target.value }))
            // }
          />    

            <NewSelectTextFieldStructure
              label="Applicable Year"
              name="applicableYear"
              error={
                localError?.["applicableYear"] ||
                errors?.["unitsPlan.planList[0].applicableYear"]
              }
              isEdit={isEdit}
              list={

                selectOptions.launch?.map((item) => {
                  return {
                    label: item,
                    value: item,
                  };
                })


              }
              value={selectedItem.applicableYear}
              handleChange={(e) =>
                setSelectedItem((prev) => ({
                  ...prev,
                  applicableYear: e.target.value,
                }))
              }
            />
            <NewSelectTextFieldStructure
              label="Applicable Month"
              name="applicableMonth"
              error={
                localError?.["applicableMonth"] ||
                errors?.["unitsPlan.planList[0].applicableMonth"]
              }
              isEdit={isEdit}
              list={monthList}
              value={selectedItem.applicableMonth}
              handleChange={(e) =>
                setSelectedItem((prev) => ({
                  ...prev,
                  applicableMonth: e.target.value,
                }))
              }
            />
            <Grid item xs={18} sx={{ textAlign: "end", mt: 1 }}>
              <CustomButton
                variant="contained"
                onClick={isEditItem ? editFloorPlan : addFloorPlan}

                ButtonText={isEditItem ? "Edit" : "Add"}
              />
            </Grid>
          </Grid>
        </Box>
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Editing Area unit leads to re enter all the selected entries in
                the table below
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </Card>
      <TableContainer sx={{ mt: 2 }} component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell >Property Type</TableCell>
              <TableCell align="left" >Property Layout</TableCell>
              <TableCell align="left" >Name</TableCell>
              <TableCell align="left" >Area</TableCell>
              <TableCell align="left" >Area Unit</TableCell>
              <TableCell align="left" >Base Selling Price</TableCell>
              <TableCell align="left" >Total Price</TableCell>
              <TableCell align="left" >Applicable Year</TableCell>
              <TableCell align="left" >Applicable Month</TableCell>
              <TableCell align="left" >Edit</TableCell>
              <TableCell align="left" >Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, index) => (
              <TableRow
                key={row.name + index}
              >
                {row.propertyType && (
                  <TableCell >
                    {row.propertyType}
                  </TableCell>
                )}
                {row.propertyLayout ? (
                  <TableCell align="left">{row.propertyLayout}</TableCell>
                ):"-"}
                {row.name ? (
                  <TableCell align="left">{row.name}</TableCell>
                ) : (
                  "-"
                )}
                {row.area !== "" ? (
                  <TableCell align="left">{row.area}</TableCell>
                ) : (
                  <TableCell>
                    <InfoIcon
                      sx={{ fontSize: 18, cursor: "pointer", color: "red" }}
                    />
                  </TableCell>
                )}
                {row.areaUnit ? (
                  <TableCell align="left">
                    {row.areaUnit ? row.areaUnit : " "}
                  </TableCell>
                ) : (
                  "-"
                )}
                {row.bsp ? (
                  <TableCell align="left">{row.bsp}</TableCell>
                ) : (
                  "-"
                )}
                  {row.totalPrice ? (
                  <TableCell align="center">{row.totalPrice}</TableCell>
                ) : (
                  "-"
                )}
                {row.applicableYear ? (
                  <TableCell align="left">{row.applicableYear}</TableCell>
                ) : (
                  "-"
                )}
                {row.applicableMonth ? (
                  <TableCell align="left">{row.applicableMonth}</TableCell>
                ) : (
                  "-"
                )}
                {row.propertyType ? (
                  <TableCell align="left" sx={{ py: 0 }}>
                    <IconButton
                      onClick={() => {
                        setSelectedItem(row);
                        setIsEditItem(true);
                        setEditItem(index);
                      }}
                    >
                      <EditIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </TableCell>
                ) : (
                  "-"
                )}
                {row.propertyType ? (
                  <TableCell align="left" sx={{ py: 0 }}>
                    <IconButton onClick={() => deleteFloorPlan(index)}>
                      <DeleteIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </TableCell>
                ) : (
                  "-"
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default React.memo(FloorPlanCard);
