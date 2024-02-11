import Joi from 'joi';


const overviewSchema = 
Joi.object({
  builder: Joi.string().required(),
  projectName: Joi.string().required(),
  projectCategory: Joi.string().required(),
  projectType: Joi.array().min(1).items(Joi.object({
    label: Joi.string().required(),
    value: Joi.string().required(),
  })).required(),
  phase: Joi.string().allow('').optional(),
  launchYear: Joi.string().allow(''),
  completionYear: Joi.string().min(1).required(),
  status: Joi.string().required(),
  constructionProgress: Joi.string().when('status', {
    is: "under construction",
    then:Joi.string().required(),
    otherwise: Joi.string().allow('').optional(),
  }),
});

export const unitPlanSchema = Joi.object({
  propertyType: Joi.string().required(),
  propertyLayout: Joi.string().required(),
  name: Joi.string().required(),
  areaUnit: Joi.string().required(),
  totalUnits:Joi.string().required(),
  area: Joi.string().required(),
  bsp: Joi.string().required(),
  applicableMonth: Joi.string().required(),
  applicableYear: Joi.string().required(),
})

const layoutSchema =
 Joi.object({
  numberOfBuildings: Joi.number()
  .custom((value, helpers) => {
    console.log(helpers.state.ancestors[1].overview,'helllppers')
    const projectType = helpers.state.ancestors[1].overview.projectType;
    const isFlatSelected = projectType.some(option => option.label === 'Land');
    if (isFlatSelected) {
      return helpers.error('layout.numberOfBuildings.custom');
    }

    return value;
  })
  .when(Joi.ref('...overview.projectType'), {
    is: Joi.array().items(
      Joi.object({
        label: Joi.string().valid('Land').required(),
        value: Joi.string().valid('Land').required(),
      })
    ).required(),
    then: Joi.number().allow('').optional(),
    otherwise: Joi.number().required(),
  }),
  layoutType: Joi.array()
  .when(Joi.ref('...overview.projectCategory'), {
    is: 
      Joi.string().valid('Commercial')
    ,
    then: Joi.array().allow(),
    otherwise: Joi.array().min(1).items(
      Joi.object()
    ).required(),
  }),
  maxFloors: Joi.number().max(34).required(),
  minFloors: Joi.number().min(24).required(),
  totalUnits: Joi.number().required(),
  area: Joi.string().required(),
  areaUnit: Joi.string().required(),
  greenArea: Joi.string().allow('').optional(),
  unitDensity: Joi.number().required(),
  greenDensity: Joi.when('greenArea', {
    is: Joi.string().not('').required(),
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
  constructionQuality: Joi.number().required().min(1),
  interiorQuality: Joi.number().required().min(1),
});


export const Schema = 
Joi.object({
    overview: 
    overviewSchema,
    regulatoryClearance: Joi.object().keys({
      reraApproved: Joi.string().required(),
      reraNumber: Joi.string().when('reraApproved', {
        is: "Yes",
        then: Joi.string().required(),
        otherwise: Joi.string().allow('').optional(),
      }),
      cc: Joi.string().required(),
      oc: Joi.string().required(),
      authorityRegistration: Joi.string().required(),
      governmentLoan: Joi.string().required(),
      privateBankLoan: Joi.string().required(),
      fresh: Joi.string().required(),
      resale: Joi.string().required(),
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
    unitsPlan:Joi.object({
      averagePrice: Joi.number().allow(''),
      minPriceRange: Joi.number().allow(''),
      maxPriceRange: Joi.number().allow(''),
      uniqueLayouts: Joi.array().items(Joi.string()),
      planList: Joi.array().min(1).items(
        Joi.object({
          propertyType: Joi.string().required(),
          propertyLayout: Joi.string().required(),
          name: Joi.string().required(),
          areaUnit: Joi.string().required(),
          totalUnits:Joi.string().required(),
          area: Joi.string().required(),
          bsp: Joi.string().required(),
          applicableMonth: Joi.string().required(),
          applicableYear: Joi.string().required(),
        })
      ),
    }),
    
    amenitiesData: Joi.object().keys({
      Basic: Joi.object().pattern(/./, Joi.object().keys({
        isApplicable: Joi.boolean().required(),
        rating:  Joi.number().when('isApplicable', {
          is: true,
          then: Joi.number().not(0).required(),
          otherwise: Joi.number().allow(0).required(),
        })
      })),
      Expected: Joi.object().pattern(/./, Joi.object().keys({
        isApplicable: Joi.boolean().required(),
        rating:  Joi.number().when('isApplicable', {
          is: true,
          then: Joi.number().not(0).required(),
          otherwise: Joi.number().allow(0).required(),
        })
      })),
      Desired: Joi.object().pattern(/./, Joi.object().keys({
        isApplicable: Joi.boolean().required(),
        rating:  Joi.number().when('isApplicable', {
          is: true,
          then: Joi.number().not(0).required(),
          otherwise: Joi.number().allow(0).required(),
        })
      })),
      Unique: Joi.object().pattern(/./, Joi.object().keys({
        isApplicable: Joi.boolean().required(),
        rating:  Joi.number().when('isApplicable', {
          is: true,
          then: Joi.number().not(0).required(),
          otherwise: Joi.number().allow(0).required(),
        })
      })),
    }),
    location: Joi.object().keys({
      state: Joi.string().required(),
      city: Joi.string().required(),
      sector: Joi.string().required(),
      area: Joi.string().required(),
      pinCode: Joi.string().required(),
      googleMapLink: Joi.string().required(),
      longitude: Joi.string().required(),
      latitude: Joi.string().required(),
      assesment: Joi.object().pattern(/./, Joi.object().keys({
    isApplicable: Joi.boolean().required(),
    rating: Joi.when('isApplicable', {
        is: true,
        then: Joi.number().not(0).required(),
        otherwise: Joi.number().optional().default(0),
    }),
})),
    }),
    valueForMoney: Joi.object().keys({
      appTillNow: Joi.number().required().min(1),
      expectedFurtherApp: Joi.number().not(0).required(),
      forEndUse: Joi.number().not(0).required(),
    }).required(),
    consultants: Joi.array().items(
      // Joi.object().keys({
      //   id: Joi.string().required(),
      //   name: Joi.string().required(),
      //   profilePic: Joi.string().required(),
      //   rating: Joi.number().required(),
      //   ratingTag: Joi.string().required(),
      //   clientsServed: Joi.number().required(),
      //   number: Joi.string().required(),
      // })
    ),
    isActiveAd:Joi.boolean(),
    marketing: Joi.object().keys({
      tagLine: Joi.string().required(),
      description: Joi.string().required(),
    }),
  })