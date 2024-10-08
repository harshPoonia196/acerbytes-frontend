import Joi from "joi";

const overviewSchema = Joi.object({
  builder: Joi.string().required(),
  builderScore: Joi.string().allow(""),
  projectName: Joi.string().required(),
  projectCategory: Joi.string().required(),
  projectType: Joi.array()
    .min(1)
    .items(
      Joi.object({
        label: Joi.string().required(),
        value: Joi.string().required(),
      })
    )
    .required(),
  phase: Joi.string().allow("").optional(),
  launchYear: Joi.number().allow(""),
  completionYear: Joi.number().when('launchYear', {
    is: Joi.exist(),
    then: Joi.number()
      .greater(Joi.ref('launchYear'))
      .allow(Joi.ref('launchYear'))
      .message('Completion year must be greater than or equal to launch year')
  }),
  status: Joi.string().required(),
  constructionProgress: Joi.string().when("status", {
    is: "under construction",
    then: Joi.string().required(),
    otherwise: Joi.string().allow("").optional(),
  }),
  sectionScore: Joi.number().allow(null,""),
  pointsGained:Joi.number().allow(null,"")
});

export const unitsPlanSchemaWithLayout = Joi.object({
  propertyType: Joi.string().required(),
  propertyLayout: Joi.string().required(),
  name: Joi.string().required(),
  areaUnit: Joi.string().required(),
  totalUnits: Joi.number().required(),
  priceUnit:Joi.string().allow(""),
  area: Joi.number().required(),
  bsp: Joi.number().required(),
  totalPrice:Joi.number().allow(null,""),
  applicableMonth: Joi.string().required(),
  width:Joi.number().optional().allow(null,""),
  length:Joi.number().optional().allow(null,""),
  applicableYear: Joi.string().required(),
});
export const unitsPlanSchemaWithoutLayout = Joi.object({
  propertyType: Joi.string().required(),
  propertyLayout: Joi.string().optional().allow(""),
  name: Joi.string().required(),
  areaUnit: Joi.string().required(),
  totalUnits: Joi.number().required(),
  priceUnit:Joi.string().required(),
  area: Joi.number().required(),
  bsp: Joi.number().required(),
  totalPrice:Joi.number().allow(null,""),
  width:Joi.number().required(),
  length:Joi.number().required(),
  applicableMonth: Joi.string().required(),
  applicableYear: Joi.string().required(),
});
export const reraSchema = Joi.object({
  reraApproved: Joi.string().valid('Yes').required(),
  reraNumber: Joi.string().pattern(/^[a-zA-Z0-9!@#$%^&*()-_+=<>?/\\:;'"[]{},.|]*$/).required(),
})
const layoutSchema = Joi.object({
  numberOfBuildings: Joi.number()
    .custom((value, helpers) => {
      const projectType = helpers.state.ancestors[1].overview.projectType;
      const isFlatSelected = projectType.some(
        (option) => option.label === "Lands"
      );
      if (isFlatSelected) {
        return helpers.error("layout.numberOfBuildings.custom");
      }

      return value;
    })
    .when(Joi.ref("...overview.projectCategory"), {
      is: Joi.string().valid("Commercial").required(),
      then: Joi.number().allow("").optional(),
        otherwise: Joi.number().required(),
    }),
    // .when(Joi.ref("...overview.projectType"), {
    //   is: Joi.array()
    //     .items(
    //       Joi.object({
    //          label: Joi.string().valid("Land","Shop","Restaurant").required(),
    //         value: Joi.string().valid("Land","Shop","Restaurant").required(),
    //       })
    //     )
    //     .required(),
    //   then: Joi.number().allow("").optional(),
    //   otherwise: Joi.number().required(),
    // }),

  layoutType: Joi.array()
  .custom((value, helpers) => {
    const projectType = helpers.state.ancestors[1].overview.projectType;
    const isFlatSelected = projectType.some(
      (option) => option.label === "Lands"
    );
    if (isFlatSelected) {
      return helpers.error("layout.numberOfBuildings.custom");
    }

    return value;
  })
  // .when('...overview.projectType', {
  //   is: Joi.array().items(Joi.object({
  //     name: "Land",
  //     value: "Land"
  //   })).required(),
  //   then: Joi.array().allow(),
  //   otherwise: Joi.array().min(1).items(Joi.object()).required(),
  // })
  .when(Joi.ref("...overview.projectCategory"), {
    is: Joi.string().valid("Commercial").required(),
    then: Joi.array().allow(),
      otherwise: Joi.array().min(1).items(Joi.object()).required(),
  }),
  // .when(Joi.ref("...overview.projectType"), {
  //   is: Joi.array()
  //     .items(
  //       Joi.object({
  //         label: Joi.string().valid("Land","Shop","Restaurant").required(),
  //         value: Joi.string().valid("Land","Shop","Restaurant").required(),
  //       })
  //     )
  //     .required(),
  //   then: Joi.array().allow(),
  //   otherwise: Joi.array().min(1).items(Joi.object()).required(),
  // }),
  // layoutType: Joi.array().when(Joi.ref("...overview.projectCategory"), {
  //   is: Joi.string().valid("Commercial"),
  //   then: Joi.array().allow(),
  //   otherwise: Joi.array().min(1).items(Joi.object()).required(),
  // }),


  // maxFloors: Joi.number().max(34).required(),
  // minFloors: Joi.number().min(24).required(),
  maxFloors: Joi.number()
  .custom((value, helpers) => {
    const projectType = helpers.state.ancestors[1].overview.projectType;
    const isFlatSelected = projectType.some(
      (option) => option.label === "Lands"
    );
    if (isFlatSelected) {
      return helpers.error("layout.numberOfBuildings.custom");
    }

    return value;
  })
  .when(Joi.ref("...overview.projectCategory"), {
    is: Joi.string().valid("Commercial").required(),
    then: Joi.number().allow(""),
    otherwise:  Joi.number().required().min(0).precision(2)
  }),
  // .when(Joi.ref("...overview.projectType"), {
  //   is: Joi.array()
  //     .items(
  //       Joi.object({
  //         label: Joi.string().valid("Land","Shop","Restaurant").required(),
  //         value: Joi.string().valid("Land","Shop","Restaurant").required(),
  //       })
  //     )
  //     .required(),
  //   then: Joi.number().allow(""),
  //   otherwise:  Joi.number().required().min(0).precision(2)
  // }),
  minFloors: Joi.number()
  .custom((value, helpers) => {
    const projectType = helpers.state.ancestors[1].overview.projectType;
    const isFlatSelected = projectType.some(
      (option) => option.label === "Lands"
    );
    if (isFlatSelected) {
      return helpers.error("layout.numberOfBuildings.custom");
    }

    return value;
  })
  .when(Joi.ref("...overview.projectCategory"), {
    is: Joi.string().valid("Commercial").required(),
    then: Joi.number().allow(""),
    otherwise: Joi.number().required().less(Joi.ref('maxFloors')).precision(2),
  }),
  // .when(Joi.ref("...overview.projectType"), {
  //   is: Joi.array()
  //     .items(
  //       Joi.object({
  //         label: Joi.string().valid("Land","Shop","Restaurant").required(),
  //         value: Joi.string().valid("Land","Shop","Restaurant").required(),
  //       })
  //     )
  //     .required(),
  //   then: Joi.number().allow(""),
  //   otherwise: Joi.number().required().less(Joi.ref('maxFloors')).precision(2),
  // }),
    //   "numberOfBuildings",
  //   "layoutType",
  //  "floors",
  //  "greenArea", 
  //  "greenDensity",
  //  "unitsPlan"
  unitDensityScore: Joi.string().allow("").optional(),
  totalUnits: Joi.number().required(),
  greenDensityScore: Joi.string().allow("").optional(),
  area: Joi.number().required(),
  areaUnit: Joi.string().required(),
  areaInSqft:Joi.number().required().allow(0),
  greenArea: Joi.number()
  .custom((value, helpers) => {
    const projectType = helpers.state.ancestors[1].overview.projectType;
    const isFlatSelected = projectType.some(
      (option) => option.label === "Lands"
    );
    if (isFlatSelected) {
      return helpers.error("layout.numberOfBuildings.custom");
    }

    return value;
  })
  .when(Joi.ref("...overview.projectCategory"), {
    is: Joi.string().valid("Commercial").required(),
    then: Joi.number().allow(""),
    otherwise: Joi.number().allow("").optional(),
  }),
  // .when(Joi.ref("...overview.projectType"), {
  //   is: Joi.array()
  //     .items(
  //       Joi.object({
  //         label: Joi.string().valid("Land","Shop","Restaurant").required(),
  //         value: Joi.string().valid("Land","Shop","Restaurant").required(),
  //       })
  //     )
  //     .required(),
  //   then: Joi.number().allow(""),
  //   otherwise:  Joi.number().allow("").optional(),
  // }), 
  greenDensity: Joi.number()
  .custom((value, helpers) => {
    const projectType = helpers.state.ancestors[1].overview.projectType;
    const isFlatSelected = projectType.some(
      (option) => option.label === "Lands"
    );
    if (isFlatSelected) {
      return helpers.error("layout.numberOfBuildings.custom");
    }

    return value;
  })
  .when(Joi.ref("...overview.projectCategory"), {
    is: Joi.string().valid("Commercial").required(),
    then: Joi.number().allow(""),
    otherwise: Joi.when("greenArea", {
      is: Joi.string().not("").required(),
      then: Joi.number().required(),
      otherwise: Joi.number().optional(),
    }),
  }),
  // .when(Joi.ref("...overview.projectType"), {
  //   is: Joi.array()
  //     .items(
  //       Joi.object({
  //         label: Joi.string().valid("Land","Shop","Restaurant").required(),
  //         value: Joi.string().valid("Land","Shop","Restaurant").required(),
  //       })
  //     )
  //     .required(),
  //   then: Joi.number().allow(""),
  //   otherwise:  Joi.when("greenArea", {
  //     is: Joi.string().not("").required(),
  //     then: Joi.number().required(),
  //     otherwise: Joi.number().optional(),
  //   }),
  // }),


  // greenArea: Joi.number().allow("").optional(),
  unitDensity: Joi.number().required(),

  // greenDensity: Joi.when("greenArea", {
  //   is: Joi.string().not("").required(),
  //   then: Joi.number().required(),
  //   otherwise: Joi.number().optional(),
  // }),
  constructionQuality: Joi.number().required().min(1),
  interiorQuality: Joi.number().required().min(1),
  sectionScore: Joi.number().allow(null,""),
  pointsGained:Joi.number().allow(null,"")
});

export const Schema = Joi.object({
  property_id: Joi.string().optional().allow(""),
  overview: overviewSchema,
  regulatoryClearance: Joi.object().keys({
    reraApproved: Joi.string().required(),
    reraNumber: Joi.string().when("reraApproved", {
      is: "Yes",
      then: Joi.string().required(),
      otherwise: Joi.string().pattern(/^[a-zA-Z0-9!@#$%^&*()-_+=<>?/\\:;'"[]{},.|]*$/).allow(""),
    }),
    cc: Joi.string().required(),
    oc: Joi.string().required(),
    authorityRegistration: Joi.string().required(),
    governmentLoan: Joi.string().required(),
    privateBankLoan: Joi.string().required(),
    fresh: Joi.string().required(),
    resale: Joi.string().required(),
    sectionScore: Joi.number().allow(""),
    pointsGained:Joi.number().allow(null,"")
  }),

  layout: layoutSchema,
  // unitsPlan: Joi.array().items(
  //   Joi.object().keys({
  //     propertyType: Joi.string().required(),
  //     propertyLayout: Joi.string().required(),
  //     name: Joi.string().required(),
  //     areaUnit: Joi.string().required(),
  //     area: Joi.string().required(),
  //     bsp: Joi.string().required(),
  //     applicableMonth: Joi.string().required(),
  //     applicableYear: Joi.string().required(),
  //   })
  unitsPlan: Joi.object({
    averagePrice: Joi.number().allow(null,""),
    minPriceRange: Joi.number().allow(null,""),
    maxPriceRange: Joi.number().allow(null,""),
    totalAreaSqft:Joi.number().allow(null,""),
    uniqueLayouts: Joi.array().items(Joi.string()),
    planList: Joi.array()
      .items(
        Joi.object({
          propertyType: Joi.string().optional().allow(""),
          propertyLayout: Joi.string().optional().allow(""),
          name: Joi.string().optional().allow(""),
          priceUnit:Joi.string().allow(""),
          areaUnit: Joi.string().optional().allow(""),
          width:Joi.number().optional().allow(null,""),
          length:Joi.number().optional().allow(null,""),
          totalPrice:Joi.number().allow(null,""),
          totalUnits: Joi.number().optional().allow(""),
          area: Joi.number().required(),
          bsp: Joi.number().optional().allow(""),
          applicableMonth: Joi.string().optional().allow(""),
          applicableYear: Joi.string().optional().allow(""),
        })
      ),
  }).optional(),

  amenitiesData: Joi.object().keys({
    sectionScore:Joi.number().allow(""),
    pointsGained:Joi.number().allow(null,""),
    Basic: Joi.object().pattern(
      /./,
      Joi.object().keys({
        isApplicable: Joi.boolean().required(),
        rating: Joi.number().when("isApplicable", {
          is: true,
          then: Joi.number().not(0).required(),
          otherwise: Joi.number().allow(0).required(),
        }),
      })
    ),
    Expected: Joi.object().pattern(
      /./,
      Joi.object().keys({
        isApplicable: Joi.boolean().required(),
        rating: Joi.number().when("isApplicable", {
          is: true,
          then: Joi.number().not(0).required(),
          otherwise: Joi.number().allow(0).required(),
        }),
      })
    ),
    Desired: Joi.object().pattern(
      /./,
      Joi.object().keys({
        isApplicable: Joi.boolean().required(),
        rating: Joi.number().when("isApplicable", {
          is: true,
          then: Joi.number().not(0).required(),
          otherwise: Joi.number().allow(0).required(),
        }),
      })
    ),
    Unique: Joi.object().pattern(
      /./,
      Joi.object().keys({
        isApplicable: Joi.boolean().required(),
        rating: Joi.number().when("isApplicable", {
          is: true,
          then: Joi.number().not(0).required(),
          otherwise: Joi.number().allow(0).required(),
        }),
      })
    ),
  }),
  location: Joi.object().keys({
    state: Joi.string().required(),
    city: Joi.string().required(),
    sector: Joi.string().required(),
    area: Joi.string().required(),
    pinCode: Joi.number().required(),
    googleMapLink: Joi.string().required(),
    longitude: Joi.number().required(),
    latitude: Joi.number().required(),
    sectionScore: Joi.number().allow(null,""),
    pointsGained:Joi.number().allow(null,""),
    assessment: Joi.object().pattern(
      /./,
      Joi.object().keys({
        isApplicable: Joi.boolean().required(),
        rating: Joi.when("isApplicable", {
          is: true,
          then: Joi.number().not(0).required(),
          otherwise: Joi.number().optional().default(0),
        }),
      })
    ),
  }),
  valueForMoney: Joi.object()
    .keys({
      appTillNow: Joi.number().required().min(1),
      expectedFurtherApp: Joi.number().not(0).required(),
      forEndUse: Joi.number().not(0).required(),
      sectionScore: Joi.number().allow(""),
      pointsGained:Joi.number().allow(null,"")
    })
    .required(),
  consultants: Joi.array()
    .items
    // Joi.object().keys({
    //   id: Joi.string().required(),
    //   name: Joi.string().required(),
    //   profilePic: Joi.string().required(),
    //   rating: Joi.number().required(),
    //   ratingTag: Joi.string().required(),
    //   clientsServed: Joi.number().required(),
    //   number: Joi.string().required(),
    // })
    (),
  isActiveAd: Joi.boolean(),
  isFav:Joi.boolean(),
  // consultants: Joi.array().items(
  //   Joi.object().keys({
  //     id: Joi.string().required(),
  //     name: Joi.string().required(),
  //     profilePic: Joi.string().required(),
  //     rating: Joi.number().required(),
  //     ratingTag: Joi.string().required(),
  //     clientsServed: Joi.number().required(),
  //     number: Joi.string().required(),
  //   })
  // ),
  // ],
  overallAssessment: Joi.object().keys({
    score: Joi.number().allow(0),
    scoredRating: Joi.number().allow(0),
    rated: Joi.object().keys({
      builder: Joi.number().allow(0),
      builderScore: Joi.number().allow(0),
      constructionProgress: Joi.number().allow(0),
      unitDensityScore: Joi.number().allow(0),
      reraApproved: Joi.number().allow(0),
      cc: Joi.number().allow(0),
      oc: Joi.number().allow(0),
      appTillNow: Joi.number().allow(0),
      expectedFurtherApp: Joi.number().allow(0),
      forEndUse: Joi.number().allow(0),
      authorityRegisteration: Joi.number().allow(0),
      governmentBankLoan: Joi.number().allow(0),
      privateBankLoan: Joi.number().allow(0),
      resale: Joi.number().allow(0),
      governmentLoan: Joi.number().allow(0),
      authorityRegistration: Joi.number().allow(0),
      fresh: Joi.number().allow(0),
      area: Joi.number().allow(0),
      unitsDensity: Joi.number().allow(0),
      greenDensity: Joi.number().allow(0),
      unitsDensityScore: Joi.number().allow(0),
      greenDensityScore: Joi.number().allow(0),
      constructionQuality: Joi.number().allow(0),
      interiorQuality: Joi.number().allow(0),
    }),
  }),
  published:Joi.boolean(),
  publishedAt:Joi.date(),
  createdAt:Joi.date(),
  modifiedAt:Joi.date(),
  tag: Joi.string().optional().allow(""),
  marketing: Joi.object().keys({
    image: Joi.string().required(),
    tagLine: Joi.string().required(),
    description: Joi.string().required(),
    metaDescription: Joi.string().optional().allow(""),
  }),
});
