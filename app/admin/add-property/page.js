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
import { getAllBrokers } from "api/Broker.api";

import { makeStyles, withStyles } from "@mui/styles";
import LocationCard from "Components/Admin/Property/SubComponents/LocationCard";
import ProjectCard from "Components/Admin/Property/SubComponents/ProjectCard";
import BankCard from "Components/Admin/Property/SubComponents/BankCard";
import { getAllOptions, getCities } from "api/Property.api";

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
import { capitalLizeName } from "utills/CommonFunction";

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
  const [cities, setCities] = useState([])
  const routerNavigation = useRouter();
  const [editPage, setEditPage] = useState(false);
  const [brokerList, setBrokerList] = useState([]);
  const [amentiesStarsScore, setAmentiesStarScore] = useState([]);
  const [amentiesStars, setAmentiesStar] = useState([]);
  const [locationStars, setLocationStars] = useState([]);
  const [totalRating, setTotalRating] = useState(80)
  const [locationStarsScore, setLocationStarsScore] = useState([]);
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


  const countLocationAssessmentItems = (data) => {
    const items = [];

    Object.entries(data.location.assessment).forEach(([name, item]) => {
      if (item.rating > 0 && item.isApplicable) {
        items.push({ name, rating: item.rating });
      }
    });

    return items;
  };

  // Function to count items with ratings > 0 and isApplicable true in amenities data
  const countAmenitiesDataItems = (data) => {
    const items = [];

    Object.values(data.amenitiesData).forEach(section => {
      Object.entries(section).forEach(([name, item]) => {
        if (item.rating > 0 && item.isApplicable) {
          items.push({ name, rating: item.rating });
        }
      });
    });

    return items;
  };




  let getProp = async () => {
    try {
      let res = await detailsProperty(detailsPropertyId);
      if (res.status === 200) {
        let data = removeIds(res.data?.data);
        delete data.__v;
        handleUIHide(data.overview.projectType, "overview", "projectType")
        setEditForm(true);



        let countLocationItems = countLocationAssessmentItems(data)
        let AmentiesCount = countAmenitiesDataItems(data)
        let updateTotalCount = 0
        if (AmentiesCount.length > 0) {
          let count = AmentiesCount.reduce((accumulator, currentItem) => accumulator + currentItem.rating, 0);
          let names = AmentiesCount.map(item => item.name)
          updateTotalCount += (AmentiesCount.length * 5)
          // setTotalRating(totalRating+count)
          setAmentiesStarScore([...amentiesStarsScore, ...names])
        }
        if (countLocationItems.length > 0) {
          let count = countLocationItems.reduce((accumulator, currentItem) => accumulator + currentItem.rating, 0);
          let names = countLocationItems.map(item => item.name)

          //  setTotalRating(totalRating+count)
          updateTotalCount += (countLocationItems.length * 5)
          setLocationStarsScore([...locationStarsScore, ...names])
        }
        setTotalRating(totalRating + updateTotalCount)
        setForm({ ...data });
      }
    }
    catch (error) {
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
  const brokersList = async (rowsPerPage, page, search) => {
    try {
      const response = await getAllBrokers();
      if (response.status == 200) {
        const { success, data, message } = response.data;
        if (success) {
          let getValue = data.data.map((i) => {

            let u = {
              fullName: i.fullName.replace(/\b\w/g, (match) => match.toUpperCase()),
              type: "consultant",
              phone: i.phone,
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

  const getCitiesList = async () => {
    try {
      let res = await getCities();
      if (res.status == 200) {
        delete res.data.data[0]._id
        setCities(res.data.data[0])
      }
    }
    catch (error) {
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


  }

  const getAllOptionDataList = async () => {
    try {
      let res = await getAllOptions();
      if (res.status === 200) {
        setLoading(true)
        let transform = transformDocuments(res.data.data)
        setSelectOption({ ...transform })
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

        transform.amenities.map((item) => {
          transform[item.toLowerCase()].map((thing) => {
            amenities[item][thing] = {
              isApplicable: false,
              rating: 0
            }

          })
        })

        const sumItems = (obj, excludedFields) => {
          let sum = 0;
          for (let key in obj) {
            if (!excludedFields.includes(key) && typeof obj[key] === 'object') {
              sum += Object.keys(obj[key]).length;
            }
          }
          return sum;
        };

        let amentiesSatrCount = sumItems({ sectionScore: '', pointsGained: 0, ...amenities }, ['sectionScore', 'pointsGained'])

        setForm((prevForm) => ({
          ...prevForm,
          location: {
            ...prevForm.location,
            assessment: temp,

          },
          amenitiesData: { sectionScore: 0, pointsGained: 0, ...amenities }
        }));
        // setSelectOption({ ...temp })
        setLoading(false)
      }
    } catch (error) {
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
    else {
      getAllOptionDataList()
    }
    getCitiesList();
    brokersList();


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
      sectionScore: 0,
      pointsGained: 0
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
      sectionScore: 0,
      pointsGained: 0
    },
    layout: {
      numberOfBuildings: 0,
      layoutType: [],
      maxFloors: "",
      minFloors: "",
      totalUnits: "",
      areaUnit: "Acres",
      area: "",
      areaInSqft:0,
      greenArea: "",
      unitDensity: "",
      unitDensityScore: "",
      greenDensity: "",
      greenDensityScore: "",
      constructionQuality: 0,
      interiorQuality: 0,
      sectionScore: 0,
      pointsGained: 0
    },
    unitsPlan: {
      averagePrice: 0,
      minPriceRange: 0,
      maxPriceRange: 0,
      uniqueLayouts: [],
      totalAreaSqft: 0,
      totalPrice: 0,
      planList: [
        // {
        //   propertyType: "",
        //   propertyLayout: "",
        //   name: "",
        //   areaUnit: "",
        //   totalUnits: "",
        //   area: "",
        //   bsp: "",
        //   applicableMonth: "",
        //   applicableYear: "",
        // },
      ],
    },

    amenitiesData: {
    },
    location: {
      state: "",
      city: "",
      sector: "",
      sectionScore: 0,
      pointsGained: 0,
      area: "",
      pinCode: "",
      googleMapLink: "",
      longitude: "",
      latitude: "",
      assessment: {
      },
    },
    valueForMoney: {
      appTillNow: 0,
      expectedFurtherApp: 0,
      forEndUse: 0,
      pointsGained: 0,
      sectionScore: 0
    },
    consultants: [],
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
        appTillNow: 0,
        expectedFurtherApp: 0,
        forEndUse: 0,
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
      image: "",
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
  const [hide, setHide] = useState([])

  const scoreChange = async (e, firstKeyName, secondKeyName) => {

    let moduleScore = moduleScoreCalc(e, firstKeyName, secondKeyName)
    // totalRating=totalRating
    // let totalRating = form.overview.status ==="underconstruction"? 75:80;
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
          incomingValue = 0;
          total = totalRating - 5
          setTotalRating(total)
          break;
        case "don't know":
          incomingValue = 0;
          total = totalRating - 5
          setTotalRating(total)
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
    }

    else {
      totalScored =
        form.overallAssessment.scoredRating + parseInt(incomingValue);
    }

    let calc = (totalScored / totalRating) * 100;
    setForm({
      ...form,
      [firstKeyName]: {
        ...form[firstKeyName],
        [secondKeyName]: e.target.value,
        ["sectionScore"]: moduleScore.calc,
        ["pointsGained"]: moduleScore.totalScored
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




  const moduleScoreCalc = (e, firstKeyName, secondKeyName, seperateCalc, thirdKeyName) => {
    let totalRatingModule;
    let totalScored;
    switch (firstKeyName.toLowerCase()) {
      case "overview":
        totalRatingModule = form.overview.status.toLowerCase().replace(/\s/g, '') === "underconstruction" ? 10 : 5;
        break;
      case "regulatoryclearance":
        totalRatingModule = 40;
        break;
      case "layout":
        totalRatingModule = 20;
        break;
      case "location":
        totalRatingModule = locationStars.length * 5;
        break;
      case "valueformoney":
        totalRatingModule = 15;
        break;
      case "amenitiesdata":
        totalRatingModule = +amentiesStars.length * 5;
        break;
      default:
        totalRatingModule = 10;
    }


    function chechAlpahbeValues(value) {
      let returnValue = 0
      switch (value.toLowerCase()) {
        case "yes":
          returnValue = 5;
          break;
        case "no":
          returnValue = 0;
          break;
        case "dont know":
          returnValue = 0;
          break;
        case "don't know":
          returnValue = 0;
          break;
        case "on time":
          returnValue = 5;
          break;
        case "delay":
          returnValue = 0;
          break;
        default:
          returnValue = 0;
      }
      return returnValue
    }
    function isNotAlphabet(char) {
      return !/[a-zA-Z]/.test(char);
    }
    let incomingValue;
    if (isNotAlphabet(e.target.value)) {
      incomingValue = e.target.value;
    } else {

      let val = chechAlpahbeValues(e.target.value)
      incomingValue = val

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
    }

    else if (secondKeyName === "assessment" || firstKeyName === "amenitiesData") {

      let difference =
        +form?.[firstKeyName]?.[secondKeyName]?.[e.target.name].rating - parseInt(incomingValue);
      let compare =
        form?.[firstKeyName]?.[secondKeyName]?.[e.target.name].rating < parseInt(incomingValue);
      if (compare) {
        totalScored =
          +form?.[firstKeyName]?.pointsGained + Math.abs(difference);
      } else {
        totalScored =
          +form?.[firstKeyName]?.pointsGained - Math.abs(difference);
      }
    }

    else if (firstKeyName === "regulatoryClearance") {
      let difference =
        chechAlpahbeValues(form?.[firstKeyName]?.[secondKeyName]) - parseInt(incomingValue);
      let compare =
        chechAlpahbeValues(form?.[firstKeyName]?.[secondKeyName]) < parseInt(incomingValue);
      if (compare) {
        totalScored =
          +form?.[firstKeyName]?.pointsGained + Math.abs(difference);
      } else {
        totalScored =
          +form?.[firstKeyName]?.pointsGained - Math.abs(difference);
      }
    
    }

    else {

      let difference =
        +form?.[firstKeyName]?.[secondKeyName] - parseInt(incomingValue);
      let compare =
        form?.[firstKeyName]?.[secondKeyName] < parseInt(incomingValue);
      if (compare) {
        totalScored =
          +form?.[firstKeyName]?.pointsGained + Math.abs(difference);
      } else {
        totalScored =
          +form?.[firstKeyName]?.pointsGained - Math.abs(difference);
      }
    }
    // else {
    //   totalScored =
    //     form.overallAssessment.scoredRating + parseInt(incomingValue);
    // }

    let calc = (totalScored / totalRatingModule) * 10;
    if (seperateCalc) {
      setForm({
        ...form,
        [firstKeyName]: {
          ...form[firstKeyName],
          [secondKeyName]: e.target.value,
          ["sectionScore"]: calc,
          ["pointsGained"]: totalScored
        }
      });
    }

    return { calc, totalScored }

  }

  const handleUIHide = (e, firstKeyName, secondKeyName) => {
    if (form?.[firstKeyName][secondKeyName].some(item => item.value.toLowerCase() !== 'land' && form?.[firstKeyName].projectCategory.toLowerCase() !== "commercial")) {
      setHide([])
    }
    else if (form?.[firstKeyName].projectCategory.toLowerCase() === "commercial") {
      setHide([
        "numberOfBuildings",
        "layoutType",
        "floors",
        "greenArea",
        "greenDensity",
      ])
    }
    else {
      let lastValue = e[e.length - 1]?.value.toLowerCase()
      let value = lastValue?.replace(/\s/g, '')
      switch (value) {
        case "restaurant":
          setHide([
            "numberOfBuildings",
            "layoutType",
            "floors",
            "greenArea",
            "greenDensity",
          ])
          break;
        case "shop":
          setHide([
            "numberOfBuildings",
            "layoutType",
            "floors",
            "greenArea",
            "greenDensity",
          ])
          break;
        case "foodcourt":
          setHide([
            "numberOfBuildings",
            "layoutType",
            "floors",
            "greenArea",
            "greenDensity",
          ])
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

  }

  const handleCategoryHide = (e) => {
    if (e.target.value.toLowerCase() === "commercial") {
      setHide([
        "numberOfBuildings",
        "layoutType",
        "floors",
        "greenArea",
        "greenDensityScore",
        "greenDensity",
      ])
    }
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
      let total = totalRating
      // let totalRating = form.overview.status ==="underconstruction"? 75:80;
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
            total = totalRating - 5
            setTotalRating(total)
            break;
          case "don't know":
            incomingValue = 0;
            total = totalRating - 5
            setTotalRating(total)
            break;
          case "on time":
            incomingValue = 5;
            break;
          case "delay":
            incomingValue = 0;
            total = totalRating - 5
            setTotalRating(total)
            break;
          default:
            incomingValue = 0;
        }
      }

      if (firstKeyName === "location" || firstKeyName === "amenitiesData") {
        if (form.overallAssessment.rated?.[firstKeyName].length > 0) {
          let difference =
            form.overallAssessment.rated?.[firstKeyName]?.[secondKeyName] -
            parseInt(incomingValue);
          let compare =
            form.overallAssessment.rated?.[firstKeyName]?.[secondKeyName] <
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
      }
else if(firstKeyName === "regulatoryClearance" && form?.[firstKeyName]?.[secondKeyName].toLowerCase()===`don't know` && e.target.value.toLowerCase()!==`don't know`){
  total = totalRating + 5
  setTotalRating(total)

  if(form.overallAssessment.rated?.[secondKeyName] > 0){
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
  }
  else{
    totalScored =
    form.overallAssessment.scoredRating + parseInt(incomingValue);
  }
}

      else if (form.overallAssessment.rated?.[secondKeyName] > 0) {
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

      // if (e.target.value.toLowerCase() === "dont know" || e.target.value.toLowerCase() === "don't know") {
      //   totalScored -= 5
      // }
      let calc = (totalScored / total) * 100;

      setForm({
        ...form,
        [firstKeyName]: {
          ...form[firstKeyName],
          [secondKeyName]: e.target.value,
          ["sectionScore"]: moduleScore.calc,
          ["pointsGained"]: moduleScore.totalScored
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
            if (firstKeyName === 'location' || firstKeyName === "amenitiesData") {
              let getCalc = amentieScoreCalc(e, firstKeyName, secondKeyName, autoFillField)

              let locationAssesment = moduleScoreCalc(e, firstKeyName, secondKeyName)

              updatedForm[firstKeyName]["sectionScore"] = locationAssesment.calc
              updatedForm[firstKeyName]["pointsGained"] = locationAssesment.totalScored
              updatedForm[firstKeyName][secondKeyName][autoFillField] = {
                ...updatedForm[firstKeyName][secondKeyName][autoFillField],
                rating: e.target.value,
              };
              updatedForm["overallAssessment"] = {
                ...form.overallAssessment,
                score: Math.floor(getCalc.calc),
                scoredRating: getCalc.totalScored,
                // rated: {
                //   ...form.overallAssessment.rated,
                //   [secondKeyName]: parseInt(incomingValue),
                // },
              }
            }
            else {
              let locationAssesment = moduleScoreCalc(e, firstKeyName, secondKeyName)

              updatedForm[firstKeyName]["sectionScore"] = locationAssesment.calc
              updatedForm[firstKeyName]["pointsGained"] = locationAssesment.totalScored
              updatedForm[firstKeyName][secondKeyName][autoFillField] = {
                ...updatedForm[firstKeyName][secondKeyName][autoFillField],
                rating: e.target.value,
              };
            }



          } else {
            if (secondKeyName === "assessment" && (!locationStars.includes(autoFillField))) {
              setLocationStars([...locationStars, autoFillField])
            }
            else if (firstKeyName === "amenitiesData" && (!amentiesStars.includes(autoFillField))) {
              setAmentiesStar([...amentiesStars, autoFillField])
            }

            updatedForm[firstKeyName][secondKeyName][autoFillField] = {
              ...updatedForm[firstKeyName][secondKeyName][autoFillField],
              isApplicable: e.target.checked,
            };
          }
          return updatedForm;
        });
      }
      else if (firstKeyName === "marketing" && secondKeyName === "image") {
        setForm({
          ...form, marketing: { ...form.marketing, image: e }
        })
      }
      else if (firstKeyName === "layout" && secondKeyName === "area") {
        const sqftPerAcre = 43560
        let totalArea = +e.target.value * sqftPerAcre
        console.log(e,totalArea,'area')
        setForm({
          ...form, layout: { ...form.layout, area: e.target.value,areaInSqft:totalArea }
        })
      }
      else {
        let value = e?.target
          ? thirdKeyName === "checked"
            ? e.target.checked
            : e.target.value
          : e;
        if (secondKeyName === "maxFloors" || secondKeyName === "minFloors") {
          value = +value


        }
        if (secondKeyName === "projectCategory" && form?.[firstKeyName][secondKeyName].toLowerCase() !== e.target.value.toLowerCase()) {
          setForm((prev) => ({
            ...prev,
            [firstKeyName]: { ...form?.[firstKeyName], projectCategory: e.target.value, projectType: [] }
          }))
          handleCategoryHide(e)
        }
        if ((firstKeyName === "location" && (secondKeyName === 'city' || secondKeyName === 'area' || secondKeyName === 'sector')) ||
          (firstKeyName === 'overview' && (secondKeyName === 'projectName' || secondKeyName === 'phase'))) {
          value = capitalLizeName(value)
        }

        setForm((prev) => ({
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

    if (firstKeyName === "overview" && secondKeyName === "projectType") {
      let hideValue = handleUIHide(e, firstKeyName, secondKeyName)
    }
    if (firstKeyName === "overview" && secondKeyName === "status" && e.target.value.toLowerCase() === "underconstruction") {
      let total = totalRating + 5
      setTotalRating(total)
    }
  
  };

  let amentieScoreCalc = (e, firstKeyName, secondKeyName, autoFillField) => {
    // let totalRating = form.overview.status ==="underconstruction"? 75:80;
    let total = totalRating
    let totalScored;
    let checkField = firstKeyName === "location" ? locationStarsScore : amentiesStarsScore
    const findItemByKey = (array, searchKey) => {
      return array.find(item => Object.keys(item)[0] === searchKey);
    };
    const foundItem = findItemByKey(checkField, autoFillField);
    if (foundItem) {
      let difference =
        foundItem?.[autoFillField] -
        parseInt(e.target.value);
      let compare =
        foundItem?.[autoFillField] <
        parseInt(e.target.value);
      if (compare) {
        totalScored =
          form.overallAssessment.scoredRating + Math.abs(difference);
      } else {
        totalScored =
          form.overallAssessment.scoredRating - Math.abs(difference);
      }
    }
    else {
      let fieldName = autoFillField
      if (firstKeyName === "amenitiesData") {

        setAmentiesStarScore([...amentiesStarsScore, { [fieldName]: e.target.value }])
      }
      else {
        setLocationStarsScore([...locationStarsScore, { [fieldName]: e.target.value }])
      }
      total = totalRating + 5
      setTotalRating(total)
      totalScored =
        form.overallAssessment.scoredRating + parseInt(e.target.value)
    }
    let calc = (totalScored / total) * 100;

    return { calc, totalScored }
  }

  const validateForm = (publish) => {
    const { error } = Schema?.validate(form, { abortEarly: false });
console.log(totalRating,'totalss')

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
        switch (label.toLowerCase()) {
          case "constructionquality":
            label = "Construction Quality";
            break;
          case "interiorquality":
            label = "Interior Quality";
            break;

          case "apptillnow":
            label = "Appreciation till now";
            break;
          case "expectedFurtherApp":
            label = "Expected further appreciation";
            break;
          case "forenduse":
            label = "For End Use";
            break;
          default:
            label;
        }
        openSnackbar(`Ratings needs to be provided for ${label}`, "error");
      }
      else if (item.context.key === "image") {
        openSnackbar(`Image needs to be uploaded for the property`, "error");
      }
    });
    console.log(form, "formmmm", error, "errrr");
    console.log(totalRating,'totalss')

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
            openSnackbar(`Please check the RERA Approval`, "error");
          }
        }
        else {
          CreateProperty({ ...form })
            .then((res) => {
              openSnackbar(`Property added successfully`, "success");
              routerNavigation.push(`/admin/property-list`);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }


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

        {isLoading === false && <Grid container spacing={2} sx={{ flex: 1, overflow: "auto" }}>
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
          {!hide.includes("unitsPlan")
            && <FloorPlanCard
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
            cities={cities}
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
            scoreChange={scoreChange}
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
          <OverallAssessmentCard hide={hide} isEdit={isEdit} form={form} />
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
