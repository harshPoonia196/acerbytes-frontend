"use client";

import { Box, Button, Card, Container, Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
import { listOfTabsInAddProperty } from "utills/Constants";
import NavTab from "Components/Admin/Property/NavTab";
import throttle from "lodash/throttle";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getBrokersList } from "api/Admin.api";
import { getBrokers } from "api/UserProfile.api";
import { makeStyles, withStyles } from "@mui/styles";
import LocationCard from "Components/Admin/Property/SubComponents/LocationCard";
import ProjectCard from "Components/Admin/Property/SubComponents/ProjectCard";
import BankCard from "Components/Admin/Property/SubComponents/BankCard";
import { getAllOptions, getAllProperty } from "api/Property.api";

import {
  Schema,
  projectName,
  reraSchema,
} from "Components/Admin/Property/Validation/PropertyValidation";
import FacilitiesCard from "Components/Admin/Property/SubComponents/FacilitiesCard";
import LandscapeCard from "Components/Admin/Property/SubComponents/LandscapeCard";
import FloorPlanCard from "Components/Admin/Property/SubComponents/FloorPlanCard";
import RegulatoryCard from "Components/Admin/Property/SubComponents/RegulatoryCard";
import BuilderPriceCard from "Components/Admin/Property/SubComponents/BuilderPriceCard";
import ResalePriceCard from "Components/Admin/Property/SubComponents/ResalePriceCard";
import InvestmentCard from "Components/Admin/Property/SubComponents/InvestmentCard";
import MarketingCard from "Components/Admin/Property/SubComponents/MarketingCard";
import { useSnackbar } from "utills/SnackbarContext";
import PropertyConsultantsCard from "Components/Admin/Property/SubComponents/PropertyConsultantsCard";
import OverallAssessmentCard from "Components/Admin/Property/SubComponents/OverallAssessmentCard";
import { CreateProperty, EditProperty } from "api/Property.api";
import CustomAdminBreadScrumbs from "Components/CommonLayouts/CustomAdminBreadScrumbs";
import { detailsProperty } from "api/Property.api";
import colors from "styles/theme/colors";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";

const tabHeight = 116;

const useStyles = makeStyles((theme) => ({
  demo2: {
    backgroundColor: colors.WHITE,
    position: "sticky",
    top: 54,
    left: 0,
    right: 0,
    zIndex: 100,
    [theme.breakpoints?.up("sm")]: {
      top: 64,
    },
    mb: "1rem",
  },
}));

const noop = () => { };


function useThrottledOnScroll(callback, delay) {
  const throttledCallback = React.useMemo(
    () => (callback ? throttle(callback, delay) : noop),
    [callback, delay]
  );

  React.useEffect(() => {
    if (throttledCallback === noop) return undefined;

    window.addEventListener("scroll", throttledCallback);
    return () => {
      window.removeEventListener("scroll", throttledCallback);
      throttledCallback.cancel();
    };
  }, [throttledCallback]);
}

function AddProperty() {
  const router = useSearchParams();
  const routerNavigation = useRouter();
  const [editPage, setEditPage] = useState(false);
  const [brokerList, setBrokerList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [activeState, setActiveState] = React.useState(null);
  const detailsPropertyId = router.get("id");

  let itemsServer = listOfTabsInAddProperty.map((tab) => {
    const hash = tab.value;
    return {
      text: tab.label,
      hash: hash,
      node: document.getElementById(hash),
    };
  });

  const itemsClientRef = React.useRef([]);
  React.useEffect(() => {
    itemsClientRef.current = itemsServer;
  }, [itemsServer]);

  const clickedRef = React.useRef(false);
  const unsetClickedRef = React.useRef(null);
  const findActiveIndex = React.useCallback(() => {
    // set default if activeState is null
    if (activeState === null) setActiveState(itemsServer[0].hash);

    // Don't set the active index based on scroll if a link was just clicked
    if (clickedRef.current) return;

    let active;
    for (let i = itemsClientRef.current.length - 1; i >= 0; i -= 1) {
      // No hash if we're near the top of the page
      if (document.documentElement.scrollTop < 0) {
        active = { hash: null };
        break;
      }

      const item = itemsClientRef.current[i];

      if (
        item.node &&
        item.node.offsetTop <
        document.documentElement.scrollTop +
        document.documentElement.clientHeight / 8 +
        tabHeight
      ) {
        active = item;
        break;
      }
    }

    if (active && activeState !== active.hash) {
      setActiveState(active.hash);
    }
  }, [activeState, itemsServer]);

  useThrottledOnScroll(itemsServer.length > 0 ? findActiveIndex : null, 166);

  const handleClick = (hash) => () => {
    // Used to disable findActiveIndex if the  scrolls due to a clickpage
    clickedRef.current = true;
    unsetClickedRef.current = setTimeout(() => {
      clickedRef.current = false;
    }, 1000);

    if (activeState !== hash) {
      setActiveState(hash);

      if (window)
        window.scrollTo({
          top:
            document.getElementById(hash)?.getBoundingClientRect().top +
            window.pageYOffset -
            tabHeight,
          behavior: "smooth",
        });
    }
  };
  function removeIds(obj) {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        // Recursively call removeIds for nested objects
        obj[key] = removeIds(obj[key]);
      } else if (key === "_id") {
        // Remove the _id field
        delete obj[key];
      }
    }
    return obj;
  }

  let getProp = async () => {
    try {
      let res = await detailsProperty(detailsPropertyId);
      if (res.status === 200) {
        let data = removeIds(res.data?.data);
        delete data.__v;
        setEditForm(true);
        setForm({ ...data });
      }
    } catch (error) {
      console.log("see", error);
    }
  };
  const brokersList = async (rowsPerPage, page, search) => {
    try {
      const response = await getBrokers();
      if (response.status == 200) {
        const { success, data, message } = response.data;
        if (success) {
          let getValue = data.data.map((i) => {
            let u = {
              fullName: i.fullName.replace(/\b\w/g, (match) => match.toUpperCase()),
              type: "consultant",
              rating: i.rating,
              id: i._id,
            };
            return u;
          });
            setBrokerList([...getValue]);
          // setBrokerList([...data.data]);
          //   return data;
        } else {
          console.log("error");
          // openSnackbar(message, "error");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const { openSnackbar } = useSnackbar();
  const showToaterMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  const getAllOptionDataList = async () => {
    try {
      let res = await getAllOptions();
      if (res.status === 200) {
        let transform = transformDocuments(res.data.data)
        let temp={}
        transform["assesment"].map((thing) => {
          temp[thing] = {
              isApplicable: false,
              rating: 0
          }

      })

      const amenities = transform.amenities.reduce((acc, item) => {
        acc[item] = {};
        return acc;
      }, {});

      transform.amenities.map((item)=>{
        transform[item.toLowerCase()].map((thing) => {
          amenities[item][thing] = {
                isApplicable: false,
                rating: 0
            }

        })
      })  

      setForm((prevForm) => ({
        ...prevForm,
        location: {
          ...prevForm.location,
          assessment: temp,
          
        },
        amenitiesData:{sectionScore:'',...amenities}
      }));
        // setSelectOption({ ...temp })
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
  React.useEffect(() => {
    if (detailsPropertyId) {
      getProp();
      setEditPage(true);
    }
    getAllOptionDataList()
    brokersList();

// console.log(form)

    return () => {
      clearTimeout(unsetClickedRef.current);
    };
  }, []);



  const classes = useStyles();

  const [isEdit, setIsEdit] = useState(true);
  const [errors, setErrors] = useState({});
  const [editForm, setEditForm] = useState(false);
  const [form, setForm] = useState({
    overview: {
      builder: "",
      builderScore: "",
      projectName: "",
      projectCategory: "",
      projectType: [],
      phase: "",
      launchYear: "",
      completionYear: "",
      status: "",
      constructionProgress: "",
      sectionScore: ''
    },
    regulatoryClearance: {
      reraApproved: "",
      reraNumber: "",
      cc: "",
      oc: "",
      authorityRegistration: "",
      governmentLoan: "",
      privateBankLoan: "",
      fresh: "",
      resale: "",
      sectionScore: ''
    },
    layout: {
      numberOfBuildings: "",
      layoutType: [],
      maxFloors: "",
      minFloors: "",
      totalUnits: "",
      areaUnit: "Acres",
      area: "",
      greenArea: "",
      unitDensity: "",
      unitDensityScore: "",
      greenDensity: "",
      greenDensityScore: "",
      constructionQuality: 0,
      interiorQuality: 0,
      sectionScore: ''
    },
    unitsPlan: {
      averagePrice: "",
      minPriceRange: "",
      maxPriceRange: "",
      uniqueLayouts: [],
      planList: [
        {
          propertyType: "",
          propertyLayout: "",
          name: "",
          areaUnit: "",
          totalUnits: "",
          area: "",
          bsp: "",
          applicableMonth: "",
          applicableYear: "",
        },
      ],
    },

    amenitiesData: {
      // sectionScore:"",
      // Basic: {
      //   Gym: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Yoga: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Swimming pool": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Club: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Fitness center": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   SPA: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      // },
      // Expected: {
      //   Pool: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Yoga: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Party hall": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Indoor games": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Spa: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Clubhouse: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Jacuzzi: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Theatre: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Barbeque Lawn": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Jogging track": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Covered Sitting": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Garden: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Wi-fi": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      // },
      // Desired: {
      //   Theatre: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Barbeque Lawn": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Jogging track": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Covered Sitting": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Garden: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Yoga: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   SPA: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Swimming pool": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Club: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      // },
      // Unique: {
      //   Library: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Kids play area": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Back up": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Wi-fi": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Gas line": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Shopping mart": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      // },
    },
    location: {
      state: "",
      city: "",
      sector: "",
      sectionScore:"",
      area: "",
      pinCode: "",
      googleMapLink: "",
      longitude: "",
      latitude: "",
      assessment: {
      //   "Pick up / delivery": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   School: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Hospital: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Mall: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Super market": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Restaurants: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Railway: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Metro: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Bus stand": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Highway: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Offices: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Hotels: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Clubs: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Noise: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Safety: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Bus stops": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Train station": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   "Metro station": {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   University: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      //   Parks: {
      //     isApplicable: false,
      //     rating: 0,
      //   },
      },
    },
    valueForMoney: {
      appTillNow: 0,
      expectedFurtherApp: 0,
      forEndUse: 0,
      sectionScore:""
    },
    consultants: [],
    // consultants: [
    //     {
    //         id: "",
    //         name: "",
    //         profilePic: "",
    //         rating: 0,
    //         ratingTag: "",
    //         clientsServed: 0,
    //         number: ""
    //     }
    // ],
    overallAssessment: {
      score: 0,
      scoredRating: 0,
      rated: {
        builder: 0,
        constructionProgress: 0,
        reraApproved: 0,
        cc: 0,
        oc: 0,
        authorityRegisteration: 0,
        governmentBankLoan: 0,
        privateBankLoan: 0,
        resale: 0,
        area: 0,
        unitsDensity: 0,
        greenDensity: 0,
        unitsDensityScore: 0,
        greenDensityScore: 0,
        constructionQuality: 0,
        interiorQuality: 0,
      },
    },
    published: false,
    marketing: {
      tagLine: "",
      description: "",
    },
  });


  const handleUnitsPlan = async (unitsPlanValue) => {
    setForm({ ...form, ["unitsPlan"]: { ...unitsPlanValue } });
  };
  function transformDocuments(documents) {
    return documents.reduce((result, document) => {
      const { name, childSub } = document;
      let camelCaseName = name.replace(/[\s_-](\w)/g, (_, char) => char.toUpperCase())
      result[camelCaseName.charAt(0).toLowerCase() + camelCaseName.slice(1)] = childSub;
      // result[camelCaseName] = childSub;
      return result;
    }, {});
  }
  const [selectOptions, setSelectOption] = useState({})
const [hide,setHide]=useState([])

  const scoreChange = async (e, firstKeyName, secondKeyName) => {

    let moduleScore = moduleScoreCalc(e, firstKeyName, secondKeyName)
    let totalRating = 70;
    let totalScored;

    function isNotAlphabet(char) {
      return !/[a-zA-Z]/.test(char);
    }
    let incomingValue;
    if (isNotAlphabet(e.target.value)) {
      incomingValue = e.target.value;
    } else {
      switch (e.target.value.toLowerCase()) {
        case "yes":
          incomingValue = 5;
          break;
        case "no":
          incomingValue = 4;
          break;
        case "dont know":
          incomingValue = 3;
          break;
        case "don't know":
          incomingValue = 3;
          break;
        case "on time":
          incomingValue = 5;
          break;
        case "delay":
          incomingValue = 3;
          break;
        default:
          incomingValue = 0;
      }
    }

    if (form.overallAssessment.rated?.[secondKeyName] > 0) {
      let difference =
        form.overallAssessment.rated?.[secondKeyName] - parseInt(incomingValue);
      let compare =
        form.overallAssessment.rated?.[secondKeyName] < parseInt(incomingValue);
      if (compare) {
        totalScored =
          form.overallAssessment.scoredRating + Math.abs(difference);
      } else {
        totalScored =
          form.overallAssessment.scoredRating - Math.abs(difference);
      }
    } else {
      totalScored =
        form.overallAssessment.scoredRating + parseInt(incomingValue);
    }

    let calc = (totalScored / totalRating) * 100;

    setForm({
      ...form,
      [firstKeyName]: {
        ...form[firstKeyName],
        [secondKeyName]: e.target.value,
        ["sectionScore"]: moduleScore
      },
      overallAssessment: {
        ...form.overallAssessment,
        score: Math.floor(calc),
        scoredRating: totalScored,
        rated: {
          ...form.overallAssessment.rated,
          [secondKeyName]: parseInt(incomingValue),
        },
      },
    });
  };




  const moduleScoreCalc = (e, firstKeyName, secondKeyName,seperateCalc) => {
    let totalRating;
    let totalScored;

    switch (firstKeyName.toLowerCase()) {
      case "overview":
        totalRating = 10;
        break;
      case "regulatoryInfo":
        totalRating = 35;
        break;
      case "layout":
        totalRating = 20;
        break;
      case "location":
        totalRating = 100;
        break;
      case "valueForMoney" :
        totalRating = 15;
        break;
      default:
        totalRating = 10;
    }



    function isNotAlphabet(char) {
      return !/[a-zA-Z]/.test(char);
    }
    let incomingValue;
    if (isNotAlphabet(e.target.value)) {
      incomingValue = e.target.value;
    } else {
      switch (e.target.value.toLowerCase()) {
        case "yes":
          incomingValue = 5;
          break;
        case "no":
          incomingValue = 0;
          break;
        case "dont know":
          incomingValue = 0;
          break;
        case "don't know":
          incomingValue = 0;
          break;
        case "on time":
          incomingValue = 5;
          break;
        case "delay":
          incomingValue = 0;
          break;
        default:
          incomingValue = 0;
      }
    }

    if (form.overallAssessment.rated?.[secondKeyName] > 0) {
      let difference =
        form.overallAssessment.rated?.[secondKeyName] - parseInt(incomingValue);
      let compare =
        form.overallAssessment.rated?.[secondKeyName] < parseInt(incomingValue);
      if (compare) {
        totalScored =
          form.overallAssessment.scoredRating + Math.abs(difference);
      } else {
        totalScored =
          form.overallAssessment.scoredRating - Math.abs(difference);
      }
    } else {
      totalScored =
        form.overallAssessment.scoredRating + parseInt(incomingValue);
    }

    let calc = (totalScored / totalRating) * 100;

    if(seperateCalc){
      setForm({
        ...form,
        [firstKeyName]: {
          ...form[firstKeyName],
          [secondKeyName]: e.target.value,
          ["sectionScore"]: calc
        }
      });
    }
    
    return calc

  }

  const handleChange = async (
    e,
    firstKeyName,
    secondKeyName,
    thirdKeyName,
    autoFill,
    autoFillField,
    autoFillFieldValue,
    isRating,
    unitsPlanValue,
    score
  ) => {
    if (autoFill) {
      let innerObj = {
        [secondKeyName]: e.target.value,
        [autoFillField]: autoFillFieldValue,
      };
      setForm({
        ...form,
        [firstKeyName]: { ...form?.[firstKeyName], ...innerObj },
      });
    } else if (firstKeyName === "consultant") {
      setForm({ ...form, consultants: [...e] });
    } else if (firstKeyName === "unitsPlan") {
      setForm({ ...form, ["unitsPlan"]: { ...unitsPlanValue } });
    } else if (score === true) {

      let moduleScore = moduleScoreCalc(e, firstKeyName, secondKeyName)

      let totalRating = form.overview.status ==="underconstruction"? 70:65;
      let totalScored;

      function isNotAlphabet(char) {
        return !/[a-zA-Z]/.test(char);
      }
      let incomingValue;
      if (isNotAlphabet(e.target.value)) {
        incomingValue = e.target.value;
      } else {
        switch (e.target.value.toLowerCase()) {
          case "yes":
            incomingValue = 5;
            break;
          case "no":
            incomingValue = 0;
            break;
          case "dont know":
            incomingValue = 0;
            totalRating = totalRating-5
            break;
          case "don't know":
            incomingValue = 0;
            totalRating = totalRating-5
            break;
          case "on time":
            incomingValue = 5;
            break;
          case "delay":
            incomingValue = 0;
            break;
          default:
            incomingValue = 0;
        }
      }

      if (form.overallAssessment.rated?.[secondKeyName] > 0) {
        let difference =
          form.overallAssessment.rated?.[secondKeyName] -
          parseInt(incomingValue);
        let compare =
          form.overallAssessment.rated?.[secondKeyName] <
          parseInt(incomingValue);
        if (compare) {
          totalScored =
            form.overallAssessment.scoredRating + Math.abs(difference);
        } else {
          totalScored =
            form.overallAssessment.scoredRating - Math.abs(difference);
        }
      } else {
        totalScored =
          form.overallAssessment.scoredRating + parseInt(incomingValue);
      }

      let calc = (totalScored / totalRating) * 100;

      setForm({
        ...form,
        [firstKeyName]: {
          ...form[firstKeyName],
          [secondKeyName]: e.target.value,
          ["sectionScore"]: moduleScore
        },
        overallAssessment: {
          ...form.overallAssessment,
          score: Math.floor(calc),
          scoredRating: totalScored,
          rated: {
            ...form.overallAssessment.rated,
            [secondKeyName]: parseInt(incomingValue),
          },
        },
      });
    } else {
      if (thirdKeyName === "checked") {
        setForm((prevForm) => {
          const updatedForm = { ...prevForm };
          if (
            updatedForm[firstKeyName] &&
            updatedForm[firstKeyName][secondKeyName] &&
            isRating
          ) {
            updatedForm[firstKeyName][secondKeyName][autoFillField] = {
              ...updatedForm[firstKeyName][secondKeyName][autoFillField],
              rating: e.target.value,
            };
           let locationAssesment = moduleScoreCalc(e,firstKeyName,secondKeyName)
           updatedForm[firstKeyName]["sectionScore"] = locationAssesment
          } else {
            updatedForm[firstKeyName][secondKeyName][autoFillField] = {
              ...updatedForm[firstKeyName][secondKeyName][autoFillField],
              isApplicable: e.target.checked,
            };
          }
          return updatedForm;
        });
      } else {
        let value = e?.target
          ? thirdKeyName === "checked"
            ? e.target.checked
            : e.target.value
          : e;
        await setForm((prev) => ({
          ...prev,
          [firstKeyName]: !secondKeyName
            ? value
            : {
              ...prev?.[firstKeyName],
              [secondKeyName]: !thirdKeyName
                ? value
                : {
                  ...prev?.[firstKeyName]?.[secondKeyName],
                  [thirdKeyName]: value,
                },
            },
        }));
      }
    }

    if(firstKeyName==="overview" && secondKeyName==="projectType"){
      let lastValue = e[e.length - 1]?.value.toLowerCase()
      let value= lastValue?.replace(/\s/g, '')
      switch (value) {
        case "restaurant":
          setHide([ 
            "numberOfBuildings",
           "layoutType",
          "floors",
          "greenArea", 
          "greenDensity",
          "unitsPlan"]) 
          break;
        case "shop":
          setHide([ 
            "numberOfBuildings",
           "layoutType",
          "floors",
          "greenArea", 
          "greenDensity",
          "unitsPlan"]) 
          break;
        case "land":
          setHide([ 
            "numberOfBuildings",
           "layoutType",
          "floors",
          "unitsPlanUnit"]) 
          break;
        default:
        setHide([])
      }
    }

    // const { error } = Schema.validate(form, { abortEarly: false });
    // if (error) {
    //   // console.log("🚀 ~ validateForm ~ error:", error.details)
    //   const validationErrors = {};
    //   error.details.forEach((detail) => {
    //     validationErrors[detail?.context?.label] = detail?.message;
    //   });
    //   // Handle validation errors, e.g., display error messages
    //   setErrors(validationErrors);
    //   return false;
    // }
  };


  const validateForm = (publish) => {
    const { error } = Schema.validate(form, { abortEarly: false });
    let store = [
      "constructionQuality",
      "interiorQuality",
      "rating",
      "valueForMoney",
      "forEndUse",
      "appTillNow",
      "expectedFurtherApp",
    ];

    error?.details.map((item) => {
      if (store.includes(item.context.key)) {
        let getLabel = item.context.label.split(".");

        function convertToTitleCase(inputString) {
          let txt = inputString
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());
          return txt;
        }

        let label;
        if (item.context.key === "rating") {
          label = getLabel[getLabel.length - 2];
        } else if (
          item.context === "forEndUse" ||
          item.context === "appTillNow" ||
          item.context === "expectedFurtherApp"
        ) {
          label = convertToTitleCase(item.context);
        } else {
          label = item.context.key;
        }

        openSnackbar(`Ratings needs to be provided for ${label}`, "error");
      }
    });
    console.log(form, "formmmm", error, "errrr");

    if (error) {
      // console.log("🚀 ~ validateForm ~ error:", error.details)
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail?.context?.label] = detail?.message;
      });
      // Handle validation errors, e.g., display error messages
      setErrors(validationErrors);
      return false;

    }
    //     else if(publish && !error){
    //       const { publishError } = reraSchema.validate({reraApproved:form.regulatoryClearance.reraApproved,reraNumber:form.regulatoryClearance.reraNumber}, {
    //         abortEarly: false,
    //       });
    // if(!publishError){
    //   setForm({...form,published:true})

    // }
    //     }
    else {
      if (!editPage) {
        // Validation passed
        if (publish) {
          const { error } = reraSchema.validate({ reraApproved: form.regulatoryClearance.reraApproved, reraNumber: form.regulatoryClearance.reraNumber }, {
            abortEarly: false,
          });
          if (!error) {
            setForm({ ...form, published: true })
            CreateProperty({ ...form, published: true })
              .then((res) => {
                openSnackbar(`Property Published successfully`, "success");
                routerNavigation.push(`/admin/property-list`);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }
          else {
            openSnackbar(`Please check the rera criteria`, "error");
          }
        }
        CreateProperty({ ...form })
          .then((res) => {
            openSnackbar(`Property added successfully`, "success");
            routerNavigation.push(`/admin/property-list`);
          })
          .catch((error) => {
            console.error('Error:', error);
          });

      } else {

        if (publish) {
          const { error } = reraSchema.validate({ reraApproved: form.regulatoryClearance.reraApproved, reraNumber: form.regulatoryClearance.reraNumber }, {
            abortEarly: false,
          });
          if (!error) {
            setForm({ ...form, published: true })
            EditProperty(detailsPropertyId, { ...form, published: true })
              .then((res) => {
                openSnackbar(`Property Edited & Published successfully`, "success");
                routerNavigation.push(`/admin/property-list`);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }
          else {
            openSnackbar(`Please check the rera criteria`, "error");
          }
        }
        else {
          EditProperty(detailsPropertyId, { ...form })
            .then((res) => {
              openSnackbar(`Property edited successfully`, "success");
              routerNavigation.push(`/admin/property-list`);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }

      }
    }
    return true;
  };
  const handleNewObjChange = (e) => {
    setNewObj(e.target.value)
  }

  return (
    <>
      <nav className={classes.demo2}>
        <CustomAdminBreadScrumbs text={editPage ? "Edit Property" : "Add Property"} />
        <Card>
          <NavTab
            value={activeState}
            handleChange={handleClick}
            list={itemsServer}
          />
        </Card>
      </nav>

      <Container>

       { isLoading===false &&<Grid container spacing={2} sx={{ flex: 1, overflow: "auto" }}>
          <ProjectCard
            errors={errors}
            form={form}
            hide={hide}
            selectOptions={selectOptions}
            editPage={editPage}
            handleNewObjChange={handleNewObjChange}
            handleChange={handleChange}
            isEdit={isEdit}
          />
          <RegulatoryCard
            errors={errors}
            hide={hide}
            form={form}
            selectOptions={selectOptions}
            handleChange={handleChange}
            isEdit={isEdit}
          />
          <LandscapeCard
            errors={errors}
            hide={hide}
            form={form}
            scoreChange={scoreChange}
            selectOptions={selectOptions}
            handleChange={handleChange}
            isEdit={isEdit}
          />
          { !hide.includes("unitsPlan")&& <FloorPlanCard
            errors={errors}
            hide={hide}
            form={form}
            editForm={editForm}
            handleChange={handleChange}
            selectOptions={selectOptions}
            handleUnitsPlan={handleUnitsPlan}
            isEdit={isEdit}
          />}
          <FacilitiesCard
            errors={errors}
            hide={hide}
            form={form}
            isEdit={isEdit}
            selectOptions={selectOptions}
            handleChange={handleChange}
          />
          <LocationCard
            errors={errors}
            hide={hide}
            selectOptions={selectOptions}
            form={form}
            moduleScoreCalc={moduleScoreCalc}
            handleChange={handleChange}
            isEdit={isEdit}
          />
          {/* <ResalePriceCard isEdit={isEdit} />
                        <BuilderPriceCard isEdit={isEdit} /> */}
          <InvestmentCard
            errors={errors}
            hide={hide}
            selectOptions={selectOptions}
            form={form}
            moduleScoreCalc={moduleScoreCalc}
            handleChange={handleChange}
            isEdit={isEdit}
          />
          {/* {JSON.stringify(brokerList)} */}
          <PropertyConsultantsCard
            isEdit={isEdit}
            form={form}
            hide={hide}
            list={brokerList}
            handleChange={handleChange}
          />
          <OverallAssessmentCard  hide={hide} isEdit={isEdit} form={form} />
          {/* <BankCard isEdit={isEdit} /> */}
          <MarketingCard
            errors={errors}
            hide={hide}
            form={form}
            handleChange={handleChange}
            isEdit={isEdit}
          />
          <Grid item xs={12} sx={{ textAlign: "end" }}>
            <CustomButton onClick={() => validateForm(false)} variant="contained"
              ButtonText={editPage ? "Update" : "Save"} />
            <CustomButton onClick={() => validateForm(true)} ButtonText={"Publish"} sx={{ marginLeft: "10px" }} variant="contained" />
          </Grid>
        </Grid>}
      </Container>
    </>
  );
}

export default AddProperty;
