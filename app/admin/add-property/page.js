"use client";

import { Box, Button, Container, Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
import { listOfTabsInAddProperty } from "utills/Constants";
import NavTab from "Components/Admin/Property/NavTab";
import throttle from "lodash/throttle";
import { makeStyles, withStyles } from "@mui/styles";
import LocationCard from "Components/Admin/Property/SubComponents/LocationCard";
import ProjectCard from "Components/Admin/Property/SubComponents/ProjectCard";
import BankCard from "Components/Admin/Property/SubComponents/BankCard";
import {
  Schema,
  projectName,
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
import { CreateProperty } from "api/Property.api";
import CustomAdminBreadScrumbs from "Components/CommonLayouts/CustomAdminBreadScrumbs";

const tabHeight = 116;

const useStyles = makeStyles((theme) => ({
  demo2: {
    backgroundColor: "#fff",
    position: "sticky",
    top: 54,
    left: 0,
    right: 0,
    zIndex: 100,
    [theme.breakpoints?.up("sm")]: {
      top: 64,
    },
    marginBottom: "16px",
  },
}));

const noop = () => {};

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
  const [activeState, setActiveState] = React.useState(null);
  const { openSnackbar } = useSnackbar();

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

  React.useEffect(
    () => () => {
      clearTimeout(unsetClickedRef.current);
    },
    []
  );

  const classes = useStyles();

  const [isEdit, setIsEdit] = useState(true);
  const [errors, setErrors] = useState({});
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
    },
    layout: {
      numberOfBuildings: "",
      layoutType: [],
      maxFloors: "",
      minFloors: "",
      totalUnits: "",
      areaUnit: "",
      area: "",
      greenArea: "",
      unitDensity: "",
      unitDensityScore: "",
      greenDensity: "",
      greenDensityScore: "",
      constructionQuality: 0,
      interiorQuality: 0,
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
          areaValue: "",
          totalUnits: "",
          bsp: "",
          applicableMonth: "",
          applicableYear: "",
        },
      ],
    },

    amenitiesData: {
      Basic: {
        Gym: {
          isApplicable: false,
          rating: 0,
        },
        Yoga: {
          isApplicable: false,
          rating: 0,
        },
        "Swimming pool": {
          isApplicable: false,
          rating: 0,
        },
        Club: {
          isApplicable: false,
          rating: 0,
        },
        "Fitness center": {
          isApplicable: false,
          rating: 0,
        },
        SPA: {
          isApplicable: false,
          rating: 0,
        },
      },
      Expected: {
        Pool: {
          isApplicable: false,
          rating: 0,
        },
        Yoga: {
          isApplicable: false,
          rating: 0,
        },
        "Party hall": {
          isApplicable: false,
          rating: 0,
        },
        "Indoor games": {
          isApplicable: false,
          rating: 0,
        },
        Spa: {
          isApplicable: false,
          rating: 0,
        },
        Clubhouse: {
          isApplicable: false,
          rating: 0,
        },
        Jacuzzi: {
          isApplicable: false,
          rating: 0,
        },
        Theatre: {
          isApplicable: false,
          rating: 0,
        },
        "Barbeque Lawn": {
          isApplicable: false,
          rating: 0,
        },
        "Jogging track": {
          isApplicable: false,
          rating: 0,
        },
        "Covered Sitting": {
          isApplicable: false,
          rating: 0,
        },
        Garden: {
          isApplicable: false,
          rating: 0,
        },
        "Wi-fi": {
          isApplicable: false,
          rating: 0,
        },
      },
      Desired: {
        Theatre: {
          isApplicable: false,
          rating: 0,
        },
        "Barbeque Lawn": {
          isApplicable: false,
          rating: 0,
        },
        "Jogging track": {
          isApplicable: false,
          rating: 0,
        },
        "Covered Sitting": {
          isApplicable: false,
          rating: 0,
        },
        Garden: {
          isApplicable: false,
          rating: 0,
        },
        Yoga: {
          isApplicable: false,
          rating: 0,
        },
        SPA: {
          isApplicable: false,
          rating: 0,
        },
        "Swimming pool": {
          isApplicable: false,
          rating: 0,
        },
        Club: {
          isApplicable: false,
          rating: 0,
        },
      },
      Unique: {
        Library: {
          isApplicable: false,
          rating: 0,
        },
        "Kids play area": {
          isApplicable: false,
          rating: 0,
        },
        "Back up": {
          isApplicable: false,
          rating: 0,
        },
        "Wi-fi": {
          isApplicable: false,
          rating: 0,
        },
        "Gas line": {
          isApplicable: false,
          rating: 0,
        },
        "Shopping mart": {
          isApplicable: false,
          rating: 0,
        },
      },
    },
    location: {
      state: "Andhra",
      city: "",
      sector: "",
      area: "",
      pinCode: "",
      googleMapLink: "",
      longitude: "",
      latitude: "",
      assesment: {
        "Pick up / delivery": {
          isApplicable: false,
          rating: 0,
        },
        School: {
          isApplicable: false,
          rating: 0,
        },
        Hospital: {
          isApplicable: false,
          rating: 0,
        },
        Mall: {
          isApplicable: false,
          rating: 0,
        },
        "Super market": {
          isApplicable: false,
          rating: 0,
        },
        Restaurants: {
          isApplicable: false,
          rating: 0,
        },
        Railway: {
          isApplicable: false,
          rating: 0,
        },
        Metro: {
          isApplicable: false,
          rating: 0,
        },
        "Bus stand": {
          isApplicable: false,
          rating: 0,
        },
        Highway: {
          isApplicable: false,
          rating: 0,
        },
        Offices: {
          isApplicable: false,
          rating: 0,
        },
        Hotels: {
          isApplicable: false,
          rating: 0,
        },
        Clubs: {
          isApplicable: false,
          rating: 0,
        },
        Noise: {
          isApplicable: false,
          rating: 0,
        },
        Safety: {
          isApplicable: false,
          rating: 0,
        },
        "Bus stops": {
          isApplicable: false,
          rating: 0,
        },
        "Train station": {
          isApplicable: false,
          rating: 0,
        },
        "Metro station": {
          isApplicable: false,
          rating: 0,
        },
        University: {
          isApplicable: false,
          rating: 0,
        },
        Parks: {
          isApplicable: false,
          rating: 0,
        },
      },
    },
    valueForMoney: {
      appTillNow: 0,
      expectedFurtherApp: 0,
      forEndUse: 0,
    },
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
        ConstructionProgress: 0,
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
        constructionQuality: 0,
        interiorQuality: 0,
      },
    },
    marketing: {
      tagLine: "",
      description: "",
    },
  });

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
    } else if (firstKeyName === "unitsPlan") {
      setForm({ ...form, ["unitsPlan"]: { ...unitsPlanValue } });
    } else if (score === true) {
      let totalRating = 70;
      let totalScored;
      if (form.overallAssessment.rated?.[secondKeyName] > 0) {
        let difference =
          form.overallAssessment.rated?.[secondKeyName] -
          parseInt(e.target.value);
          let compare =  form.overallAssessment.rated?.[secondKeyName] <
          parseInt(e.target.value);
        if (compare) {
          totalScored =
            form.overallAssessment.scoredRating + Math.abs(difference);
        } else {
          totalScored =
            form.overallAssessment.scoredRating - Math.abs(difference);
        }
      } else {
        totalScored =
          form.overallAssessment.scoredRating + parseInt(e.target.value);
      }

      let calc = (totalScored / totalRating) * 100;

      setForm({
        ...form,
        [firstKeyName]: {
          ...form[firstKeyName],
          [secondKeyName]: e.target.value,
        },
        overallAssessment: {
          ...form.overallAssessment,
          score: Math.floor(calc),
          scoredRating: totalScored,
          rated: {
            ...form.overallAssessment.rated,
            [secondKeyName]: parseInt(e.target.value),
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
          } else {
            updatedForm[firstKeyName][secondKeyName][autoFillField] = {
              ...updatedForm[firstKeyName][secondKeyName][autoFillField],
              isApplicable: e.target.checked,
            };
          }
          return updatedForm;
        });
      } else {
        console.log("innn");
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
    const { error } = Schema.validate(form, { abortEarly: false });
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
  };

  const validateForm = () => {
    const { error } = Schema.validate(form, { abortEarly: false });
    let store = ["constructionQuality", "interiorQuality", "rating"];

    error?.details.map((item) => {
      if (store.includes(item.context.key)) {
        openSnackbar(
          `Ratings needs to be provided for ${item.context.label}`,
          "error"
        );
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
    } else {
      // Validation passed
      CreateProperty({ ...form });
    }

    return true;
  };

  return (
    <>
      <nav className={classes.demo2}>
        <CustomAdminBreadScrumbs text="Add Property" />
        <NavTab
          value={activeState}
          handleChange={handleClick}
          list={itemsServer}
        />
      </nav>

      <Container>
        <div className="container">
          <Grid container spacing={2} sx={{ flex: 1, overflow: "auto" }}>
            <ProjectCard
              errors={errors}
              form={form}
              handleChange={handleChange}
              isEdit={isEdit}
            />
            <RegulatoryCard
              errors={errors}
              form={form}
              handleChange={handleChange}
              isEdit={isEdit}
            />
            <LandscapeCard
              errors={errors}
              form={form}
              handleChange={handleChange}
              isEdit={isEdit}
            />
            <FloorPlanCard
              errors={errors}
              form={form}
              handleChange={handleChange}
              isEdit={isEdit}
            />
            <FacilitiesCard
              errors={errors}
              form={form}
              isEdit={isEdit}
              handleChange={handleChange}
            />
            <LocationCard
              errors={errors}
              form={form}
              handleChange={handleChange}
              isEdit={isEdit}
            />
            {/* <ResalePriceCard isEdit={isEdit} />
                        <BuilderPriceCard isEdit={isEdit} /> */}
            <InvestmentCard
              errors={errors}
              form={form}
              handleChange={handleChange}
              isEdit={isEdit}
            />
            <PropertyConsultantsCard
              isEdit={isEdit}
              form={form}
              handleChange={handleChange}
            />
            <OverallAssessmentCard isEdit={isEdit} form={form} />
            {/* <BankCard isEdit={isEdit} /> */}
            <MarketingCard
              errors={errors}
              form={form}
              handleChange={handleChange}
              isEdit={isEdit}
            />
            <Grid item xs={12} sx={{ textAlign: "end" }}>
              <Button onClick={validateForm} variant="contained">
                Save
              </Button>
              <Button sx={{ marginLeft: "10px" }} variant="contained">
                Publish
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
}

export default AddProperty;
